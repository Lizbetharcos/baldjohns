'use client';
import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function DivePage() {
  // --- 1. GAME STATE ---
  const [trashItems, setTrashItems] = useState([]);
  const [verifiedIds, setVerifiedIds] = useState([]); 
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- 2. GLOBAL STYLING ---
  useEffect(() => {
    document.body.style.backgroundColor = '#000814';
    document.body.style.margin = '0';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  // --- 3. THE SCROLL ENGINE ---
  const { scrollY } = useScroll();
  const [currentDepth, setCurrentDepth] = useState(0);

  const bgColor = useTransform(
    scrollY,
    [0, 1500, 4000, 8000, 12000], 
    ['#0077b6', '#023e8a', '#03045e', '#000814', '#000000']
  );

  const introOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const rayOpacity = useTransform(scrollY, [0, 600], [0.5, 0]);

  useEffect(() => {
    // Fixed deprecation warning
    return scrollY.on("change", (v) => setCurrentDepth(Math.round(v)));
  }, [scrollY]);

  // --- 4. API INTEGRATION ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/trash');
        const data = await res.json();
        const sortedData = data.sort((a, b) => a.required_unlock_depth - b.required_unlock_depth);
        setTrashItems(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Sonar Failure:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- 5. THE STRICT SCROLL LOCK ---
  const nextLockedItem = trashItems.find(item => !verifiedIds.includes(item.id));
  const lockedIndex = trashItems.findIndex(item => !verifiedIds.includes(item.id));
  
  const dynamicHeight = nextLockedItem 
    ? (lockedIndex + 1) * 1200 + 800 
    : 15000; 

  // --- 6. GAME LOGIC ---
  const handleVerify = (id) => {
    setVerifiedIds(prev => [...prev, id]); 
    setScore(prev => prev + 100);
  };

  const getZoneName = (depth) => {
    if (depth < 200) return "SUNLIGHT ZONE";
    if (depth < 1000) return "TWILIGHT ZONE";
    if (depth < 4000) return "MIDNIGHT ZONE";
    if (depth < 6000) return "ABYSSAL ZONE";
    return "HADAL ZONE";
  };

  const isSwimmer = (name) => !['Staghorn Coral', 'Sea Cucumber', 'Abyssal Holothurian', 'Polychaete Worm'].includes(name);

  return (
    <motion.main style={{ 
      backgroundColor: bgColor, 
      color: '#00d4ff', 
      height: `${dynamicHeight}px`, 
      minHeight: '100vh',
      fontFamily: 'monospace', 
      position: 'relative',
      overflowX: 'hidden',
      transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)' 
    }}>
      
      {/* --- SCENIC: SUNLIGHT RAYS --- */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '600px',
        background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 40%, transparent 60%)',
        filter: 'blur(50px)',
        opacity: rayOpacity,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* --- SCENIC: BUBBLES --- */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${Math.random() * 100}vw` }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            position: 'fixed',
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* --- FIXED HUD --- */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', padding: '20px',
        backgroundColor: 'rgba(0, 8, 20, 0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <Link href="/" style={{ color: '#00d4ff', textDecoration: 'none', border: '1px solid #00d4ff', padding: '8px 20px' }}>
          ← ABORT DIVE
        </Link>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{currentDepth}m</h2>
          <p style={{ margin: 0, color: '#ff0055', fontSize: '0.8rem' }}>
            {getZoneName(currentDepth)} | SCORE: {score}
          </p>
        </div>
      </div>
      
      {/* --- SURFACE HEADER --- */}
      <motion.div style={{ position: 'absolute', top: '300px', width: '100%', textAlign: 'center', opacity: introOpacity }}>
        <h1 style={{ fontSize: '3.5rem', color: '#fff', textShadow: '0 0 15px #00d4ff' }}>BEGIN DESCENT</h1>
        <p style={{ color: '#bde0fe' }}>Locate and verify pollutants to dive deeper.</p>
      </motion.div>
        
      {/* --- TRASH & ANIMAL CARDS --- */}
      {trashItems.map((item, index) => {
        const isVerified = verifiedIds.includes(item.id);
        const isCurrentTarget = nextLockedItem && nextLockedItem.id === item.id;

        if (!isVerified && !isCurrentTarget && index > lockedIndex) return null;

        return (
          <div key={item.id}>
            <motion.div 
              style={{ 
                position: 'absolute',
                top: `${(index + 1) * 1200}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                border: `1px solid ${isVerified ? '#00ffaa' : '#00d4ff'}`, 
                padding: '35px', 
                width: '90%', 
                maxWidth: '550px', 
                backgroundColor: 'rgba(0, 10, 20, 0.98)',
                zIndex: 20,
                boxShadow: `0 0 40px ${isVerified ? 'rgba(0, 255, 170, 0.3)' : 'rgba(0, 212, 255, 0.1)'}`,
                opacity: currentDepth > (index * 1200) - 400 ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}
            >
              <h3 style={{ color: isVerified ? '#00ffaa' : '#fff', textAlign: 'center', fontSize: '1.6rem', marginBottom: '15px' }}>
                 {isVerified ? `[CLEARED] ${item.item_name}` : item.item_name}
              </h3>
              
              {item.image_url && (
                <img 
                  src={item.image_url} 
                  alt={item.item_name}
                  style={{ width: '100%', height: '250px', objectFit: 'contain', mixBlendMode: 'screen', marginBottom: '20px' }} 
                />
              )}

              <p style={{ color: '#bde0fe', fontSize: '1.05rem', lineHeight: '1.6', textAlign: 'center', borderTop: '1px solid rgba(0,212,255,0.1)', paddingTop: '20px' }}>
                {item.impact_fact}
              </p>
              
              {isCurrentTarget && (
                <button 
                  onClick={() => handleVerify(item.id)}
                  style={{ width: '100%', padding: '15px', marginTop: '15px', backgroundColor: '#00d4ff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  SCAN & VERIFY
                </button>
              )}
            </motion.div>

            {/* --- THE ANIMAL --- */}
            <AnimatePresence>
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    // SCALE LOGIC: Massive animals get a size boost
                    scale: ['Sperm Whale', 'Sunken Cargo Container'].includes(item.animal_name) ? 2.5 : 1,
                    x: isSwimmer(item.animal_name) 
                      ? ['-35vw', '135vw'] 
                      : (index % 2 === 0 ? ['-1vw', '1vw', '-1vw'] : ['1vw', '-1vw', '1vw']),
                    y: [0, -25, 10, -15, 0] 
                  }}
                  transition={{
                    x: { 
                      // LARGE ANIMALS MOVE SLOWER
                      duration: isSwimmer(item.animal_name) 
                        ? (item.animal_name === 'Sperm Whale' ? 45 : Math.random() * 10 + 20) 
                        : Math.random() * 4 + 4, 
                      repeat: Infinity, 
                      ease: "linear" 
                    },
                    y: { 
                      duration: Math.random() * 3 + 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    },
                    opacity: { duration: 1.2 }
                  }}
                  style={{
                    position: 'absolute',
                    top: `${(index + 1) * 1200 + 150}px`,
                    left: isSwimmer(item.animal_name) ? '0' : (index % 2 === 0 ? '5%' : 'auto'),
                    right: isSwimmer(item.animal_name) ? 'auto' : (index % 2 !== 0 ? '5%' : 'auto'),
                    width: '250px',
                    textAlign: 'center',
                    zIndex: 5, // SITS BEHIND CARDS
                    pointerEvents: 'none',
                  }}
                >
                  <img 
                    src={item.animal_image_url} 
                    alt={item.animal_name} 
                    style={{ 
                      width: '100%', 
                      filter: 'drop-shadow(0 0 10px rgba(0, 255, 170, 0.2))',
                      transform: isSwimmer(item.animal_name) ? 'scaleX(-1)' : 'none'
                    }}
                  />
                  <p style={{ 
                    color: '#00ffaa', 
                    fontSize: '0.75rem', 
                    marginTop: '10px', 
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    padding: '4px', 
                    borderRadius: '4px',
                    transform: ['Sperm Whale', 'Sunken Cargo Container'].includes(item.animal_name) ? 'scale(0.5)' : 'none'
                  }}>
                    {item.animal_name}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.main>
  );
}