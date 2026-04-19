'use client';
import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

export default function DivePage() {
  // --- 1. GAME STATE ---
  const [trashItems, setTrashItems] = useState([]);
  const [verifiedIds, setVerifiedIds] = useState([]); // Tracks which items are cleared
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- 2. THE SCROLL ENGINE ---
  const { scrollY } = useScroll();
  
  // 1 pixel of scroll = 1 meter of depth
  const [currentDepth, setCurrentDepth] = useState(0);

  // Dynamic Background: Maps exact depth to ocean zone colors
  const bgColor = useTransform(
    scrollY,
    [0, 500, 2000, 6000, 11000], 
    ['#0077b6', '#023e8a', '#03045e', '#000814', '#000000']
  );

  useEffect(() => {
    return scrollY.onChange((v) => setCurrentDepth(Math.round(v)));
  }, [scrollY]);

  // --- 3. API INTEGRATION ---
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/trash');
        const data = await res.json();
        // Sort items by depth so they appear in order
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
  // Find the first item the user hasn't verified yet
  const nextLockedItem = trashItems.find(item => !verifiedIds.includes(item.id));
  
  // Set the bottom of the page just below the locked item.
  // If no locked items exist, open the trench all the way to 11,000m!
  const maxPageHeight = nextLockedItem 
    ? nextLockedItem.required_unlock_depth + 600 // +600px gives them room to see the card
    : 11000; 

  // --- 5. GAME LOGIC ---
  const handleVerify = (id) => {
    setVerifiedIds(prev => [...prev, id]); // Unlock the next zone
    setScore(prev => prev + 100);
    alert(`Verification successful! The trench opens deeper...`);
  };

  // Calculate current zone text based on depth
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
      height: `${maxPageHeight}px`, // THIS IS THE LOCK
      fontFamily: 'monospace', 
      position: 'relative',
      overflow: 'hidden' // Prevents horizontal scroll issues
    }}>
      
      {/* --- FIXED HUD --- */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '20px', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', 
        backgroundColor: 'rgba(0, 8, 20, 0.8)', backdropFilter: 'blur(10px)'
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
      <div style={{ position: 'absolute', top: '150px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', textShadow: '0 0 10px #00d4ff', color: '#fff' }}>BEGIN DESCENT</h1>
        <p style={{ color: '#bde0fe' }}>Scroll down to locate marine pollutants.</p>
        {loading && <p>SCANNING SEABED...</p>}
      </div>
        
      {/* --- ABSOLUTE POSITIONED TRASH CARDS --- */}
      {/* This places each card at its exact depth physically on the page */}
      {trashItems.map((item) => {
        const isVerified = verifiedIds.includes(item.id);
        const isLocked = nextLockedItem && nextLockedItem.id === item.id;

        return (
          <div key={item.id} style={{ 
            position: 'absolute',
            top: `${item.required_unlock_depth}px`, // Placed exactly at its required depth
            left: '50%',
            transform: 'translateX(-50%)',
            border: `1px solid ${isVerified ? '#00ffaa' : '#00d4ff'}`, 
            padding: '25px', 
            width: '90%', 
            maxWidth: '600px', 
            backgroundColor: isVerified ? 'rgba(0, 255, 170, 0.05)' : 'rgba(0, 212, 255, 0.05)', 
            boxShadow: `0 0 20px ${isVerified ? 'rgba(0, 255, 170, 0.2)' : 'rgba(0, 212, 255, 0.1)'}`,
            opacity: currentDepth > item.required_unlock_depth - 800 ? 1 : 0, // Fades in as you approach
            transition: 'opacity 0.5s ease'
          }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: isVerified ? '#00ffaa' : '#fff' }}>
              {isVerified ? `[CLEARED] ${item.item_name}` : item.item_name}
            </h3>
            <p style={{ color: '#bde0fe', marginBottom: '20px', lineHeight: '1.5' }}>{item.impact_fact}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: isVerified ? '#00ffaa' : '#00d4ff' }}>
                FOUND AT: {item.required_unlock_depth}m
              </span>
              
              {!isVerified && isLocked && (
                <button 
                  onClick={() => handleVerify(item.id)}
                  style={{ 
                    padding: '10px 20px', backgroundColor: '#00d4ff', color: '#000814', 
                    border: 'none', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px'
                  }}
                >
                  SCAN & VERIFY
                </button>
              )}
            </div>
          </div>
        );
      })}
    </motion.main>
  );
}