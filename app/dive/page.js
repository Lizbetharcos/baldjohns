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

  // --- 2. GLOBAL STYLING ---
  // Forces the browser body to stay dark to prevent white gaps
  useEffect(() => {
    document.body.style.backgroundColor = '#000814';
    document.body.style.margin = '0';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  // --- 3. THE SCROLL ENGINE ---
  const { scrollY } = useScroll();
  const [currentDepth, setCurrentDepth] = useState(0);

  // Gradient transition throughout the whole descent
  const bgColor = useTransform(
    scrollY,
    [0, 1500, 4000, 8000, 12000], 
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

  // --- 5. THE STRICT SCROLL LOCK ---
  const nextLockedItem = trashItems.find(item => !verifiedIds.includes(item.id));
  const lockedIndex = trashItems.findIndex(item => !verifiedIds.includes(item.id));
  
  // The height is limited to exactly where the current target card sits.
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
        <h1 style={{ fontSize: '3.5rem', textShadow: '0 0 15px #00d4ff', color: '#fff' }}>BEGIN DESCENT</h1>
        <p style={{ color: '#bde0fe' }}>Locate and verify pollutants to dive deeper.</p>
      </motion.div>
        
      {/* --- TRASH CARDS --- */}
      {trashItems.map((item, index) => {
        const isVerified = verifiedIds.includes(item.id);
        const isCurrentTarget = nextLockedItem && nextLockedItem.id === item.id;

        // PHYSICAL LOCK: Don't render cards that are beyond our current progress
        if (!isVerified && !isCurrentTarget && index > lockedIndex) return null;

        return (
          <motion.div 
            key={item.id}
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
              boxShadow: `0 0 30px ${isVerified ? 'rgba(0, 255, 170, 0.2)' : 'rgba(0, 212, 255, 0.1)'}`,
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
                style={{ 
                  width: '100%', 
                  height: '250px', 
                  objectFit: 'contain', 
                  mixBlendMode: 'screen', 
                  marginBottom: '20px',
                  filter: 'brightness(1.1)'
                }} 
              />
            )}

            {/* DESCRIPTION SECTION (Always Visible) */}
            <div style={{ borderTop: '1px solid rgba(0,212,255,0.1)', paddingTop: '20px', marginBottom: '20px' }}>
              <p style={{ color: '#bde0fe', fontSize: '1.05rem', lineHeight: '1.6', textAlign: 'center' }}>
                {item.impact_fact}
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: isVerified ? '#00ffaa' : '#00d4ff' }}>
                SONAR DEPTH: {item.required_unlock_depth}m
              </span>

              {isCurrentTarget && (
                <button 
                  onClick={() => handleVerify(item.id)}
                  style={{ 
                    padding: '12px 28px', 
                    backgroundColor: '#00d4ff', 
                    color: '#000', 
                    fontWeight: 'bold', 
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  SCAN & VERIFY
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.main>
  );
}