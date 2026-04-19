'use client';
import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

export default function DivePage() {
  // --- 1. GAME STATE ---
  const [trashItems, setTrashItems] = useState([]);
  const [verifiedIds, setVerifiedIds] = useState([]); 
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- 2. THE SCROLL ENGINE ---
  const { scrollY } = useScroll();
  const [currentDepth, setCurrentDepth] = useState(0);

  // Dynamic Background: Maps depth to ocean zone colors
  // Ends at solid black (#000000) for the Hadal zone
  const bgColor = useTransform(
    scrollY,
    [0, 500, 2000, 6000, 11000], 
    ['#0077b6', '#023e8a', '#03045e', '#000814', '#000000']
  );

  // Fades out the "Begin Descent" text as you scroll down
  const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    return scrollY.onChange((v) => setCurrentDepth(Math.round(v)));
  }, [scrollY]);

  // --- 3. API INTEGRATION ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/trash');
        const data = await res.json();
        // Sort items by depth to ensure progression is linear
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

  // --- 4. THE PROGRESSION LOCK ---
  const nextLockedItem = trashItems.find(item => !verifiedIds.includes(item.id));
  
  // Dynamic page height: grows as you unlock more items
  const maxPageHeight = nextLockedItem 
    ? (trashItems.indexOf(nextLockedItem) + 1) * 1200 + 800
    : 15000; 

  // --- 5. GAME LOGIC ---
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

  return (
    <motion.main style={{ 
      backgroundColor: bgColor, 
      color: '#00d4ff', 
      minHeight: `${maxPageHeight}px`, 
      fontFamily: 'monospace', 
      position: 'relative',
      transition: 'background-color 0.5s ease'
    }}>
      
      {/* --- FIXED HUD --- */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '20px', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', 
        backgroundColor: 'rgba(0, 8, 20, 0.95)', backdropFilter: 'blur(10px)'
      }}>
        <Link href="/" style={{ color: '#00d4ff', textDecoration: 'none', border: '1px solid #00d4ff', padding: '8px 20px' }}>
          ← ABORT DIVE
        </Link>
        
        <div style={{ display: 'flex', gap: '30px', textAlign: 'right' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#bde0fe' }}>DEPTH METER</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', textShadow: '0 0 10px #00d4ff' }}>{currentDepth}m</h2>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#ff0055' }}>{getZoneName(currentDepth)}</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>SCORE: {score}</h2>
          </div>
        </div>
      </div>
      
      {/* --- SURFACE HEADER --- */}
      <motion.div style={{ 
        position: 'absolute', top: '300px', width: '100%', textAlign: 'center',
        opacity: introOpacity, zIndex: 10
      }}>
        <h1 style={{ fontSize: '3.5rem', textShadow: '0 0 20px #00d4ff', color: '#fff' }}>BEGIN DESCENT</h1>
        <p style={{ color: '#bde0fe', fontSize: '1.2rem' }}>Scroll down to locate marine pollutants.</p>
        {loading && <p style={{marginTop: '20px'}}>INITIALIZING SONAR...</p>}
      </motion.div>
        
      {/* --- INTERACTIVE TRASH CARDS --- */}
      {trashItems.map((item, index) => {
        const isVerified = verifiedIds.includes(item.id);
        const isLocked = nextLockedItem && nextLockedItem.id === item.id;

        return (
          <motion.div 
            key={item.id}
            initial="initial"
            whileHover="hover"
            style={{ 
              position: 'absolute',
              top: `${(index + 1) * 1200}px`, // Spaced out significantly
              left: '50%',
              transform: 'translateX(-50%)',
              border: `1px solid ${isVerified ? '#00ffaa' : '#00d4ff'}`, 
              padding: '30px', 
              width: '90%', 
              maxWidth: '550px', 
              backgroundColor: 'rgba(0, 12, 24, 0.95)', 
              boxShadow: `0 0 30px ${isVerified ? 'rgba(0, 255, 170, 0.2)' : 'rgba(0, 212, 255, 0.1)'}`,
              opacity: currentDepth > (index * 1200) ? 1 : 0, 
              transition: 'opacity 0.8s ease',
              zIndex: 20,
              cursor: 'help'
            }}
          >
            <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', color: isVerified ? '#00ffaa' : '#fff', textAlign: 'center' }}>
              {isVerified ? `[CLEARED] ${item.item_name}` : item.item_name}
            </h3>
            
            {item.image_url && (
              <div style={{ backgroundColor: '#000', borderRadius: '8px', padding: '10px', marginBottom: '15px' }}>
                <img 
                  src={item.image_url} 
                  alt={item.item_name} 
                  style={{ 
                    width: '100%', 
                    height: '250px', 
                    objectFit: 'contain',
                    mixBlendMode: 'screen' // Fakes transparency for white backgrounds
                  }} 
                />
              </div>
            )}

            {/* HOVER REVEAL SECTION */}
            <motion.div
              variants={{
                initial: { height: 0, opacity: 0 },
                hover: { height: 'auto', opacity: 1 }
              }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ color: '#bde0fe', marginBottom: '20px', lineHeight: '1.6', fontSize: '1.05rem' }}>
                {item.impact_fact}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#00d4ff', marginBottom: '10px' }}>
                DETECTED AT: {item.required_unlock_depth} METERS
              </p>
            </motion.div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              {!isVerified && isLocked && (
                <button 
                  onClick={() => handleVerify(item.id)}
                  style={{ 
                    width: '100%', padding: '15px', backgroundColor: '#00d4ff', color: '#000814', 
                    border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'
                  }}
                >
                  SCAN & VERIFY ASSET
                </button>
              )}
              {!isVerified && !isLocked && !verifiedIds.includes(item.id) && (
                <span style={{ color: '#555' }}>[SONAR LOCK ACTIVE]</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.main>
  );
}