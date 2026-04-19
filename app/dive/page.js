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

  // --- 3. DYNAMIC GRADIENT ---
  // This maps the actual scroll position to the background color for a constant gradient effect
  const bgColor = useTransform(
    scrollY,
    [0, 1000, 4000, 8000, 12000], 
    ['#0077b6', '#023e8a', '#03045e', '#000814', '#000000']
  );

  const introOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    return scrollY.onChange((v) => setCurrentDepth(Math.round(v)));
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

  // --- 5. THE SCROLL LOCK (CRITICAL) ---
  const nextLockedItem = trashItems.find(item => !verifiedIds.includes(item.id));
  const lockedIndex = trashItems.findIndex(item => !verifiedIds.includes(item.id));
  
  // If we find a locked item, we limit the height to exactly that item's depth + 1000px
  // This prevents the user from scrolling further down until 'handleVerify' is called.
  const dynamicHeight = nextLockedItem 
    ? (lockedIndex + 1) * 1200 + 400 
    : 15000; 

  // --- 6. GAME LOGIC ---
  const handleVerify = (id) => {
    setVerifiedIds(prev => [...prev, id]); 
    setScore(prev => prev + 100);
    // When this state updates, the component re-renders, dynamicHeight increases, 
    // and the user can suddenly scroll further.
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
      height: `${dynamicHeight}px`, // This creates the physical "Wall"
      fontFamily: 'monospace', 
      position: 'relative',
      transition: 'height 0.8s ease-out' // Smoothly "opens" the trench when verified
    }}>
      
      {/* --- FIXED HUD --- */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', padding: '20px',
        backgroundColor: 'rgba(0, 8, 20, 0.9)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <Link href="/" style={{ color: '#00d4ff', textDecoration: 'none', border: '1px solid #00d4ff', padding: '8px 20px' }}>
          ← ABORT DIVE
        </Link>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0 }}>{currentDepth}m</h2>
          <p style={{ margin: 0, color: '#ff0055', fontSize: '0.8rem' }}>{getZoneName(currentDepth)} | SCORE: {score}</p>
        </div>
      </div>
      
      {/* --- SURFACE HEADER --- */}
      <motion.div style={{ position: 'absolute', top: '300px', width: '100%', textAlign: 'center', opacity: introOpacity }}>
        <h1 style={{ fontSize: '3rem', color: '#fff' }}>BEGIN DESCENT</h1>
        <p>Locate and verify pollutants to dive deeper.</p>
      </motion.div>
        
      {/* --- TRASH CARDS --- */}
      {trashItems.map((item, index) => {
        const isVerified = verifiedIds.includes(item.id);
        const isCurrentTarget = nextLockedItem && nextLockedItem.id === item.id;

        return (
          <motion.div 
            key={item.id}
            whileHover={isCurrentTarget || isVerified ? "hover" : ""}
            style={{ 
              position: 'absolute',
              top: `${(index + 1) * 1200}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              border: `1px solid ${isVerified ? '#00ffaa' : '#00d4ff'}`, 
              padding: '30px', 
              width: '90%', 
              maxWidth: '500px', 
              backgroundColor: 'rgba(0, 10, 20, 0.95)',
              zIndex: 20,
              opacity: currentDepth > (index * 1200) - 600 ? 1 : 0.1, // Fade in
              filter: isVerified || isCurrentTarget ? 'none' : 'grayscale(1) blur(2px)'
            }}
          >
            <h3 style={{ color: isVerified ? '#00ffaa' : '#fff', textAlign: 'center' }}>
               {isVerified ? `[CLEARED] ${item.item_name}` : item.item_name}
            </h3>
            
            {item.image_url && (
              <img 
                src={item.image_url} 
                style={{ width: '100%', height: '200px', objectFit: 'contain', mixBlendMode: 'screen', margin: '20px 0' }} 
              />
            )}

            <motion.div
              variants={{ initial: { height: 0, opacity: 0 }, hover: { height: 'auto', opacity: 1 } }}
              initial="initial"
              style={{ overflow: 'hidden' }}
            >
              <p style={{ color: '#bde0fe', fontSize: '0.9rem' }}>{item.impact_fact}</p>
            </motion.div>
            
            {isCurrentTarget && (
              <button 
                onClick={() => handleVerify(item.id)}
                style={{ width: '100%', padding: '15px', marginTop: '10px', backgroundColor: '#00d4ff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                SCAN & VERIFY
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.main>
  );
}