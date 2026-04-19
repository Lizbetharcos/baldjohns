import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#000814', 
      color: '#00d4ff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', textShadow: '0 0 10px #00d4ff' }}>MARIANA TRENCH CLEANUP</h1>
      <p style={{ maxWidth: '600px', lineHeight: '1.6', color: '#bde0fe' }}>
        A real-time deep-sea exploration and waste-management simulation. 
        Track pollutants, verify debris with AI, and restore the Sunlight Zone.
      </p>
      
      <div style={{ marginTop: '30px' }}>
        <Link href="/dive" style={{ 
          padding: '14px 35px', /* Made slightly larger for emphasis */
          border: '2px solid #00d4ff', 
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          textDecoration: 'none', 
          color: '#00d4ff',
          fontWeight: 'bold',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)',
          marginRight: '10px' /* <-- THIS ADDS THE EXTRA SPACE */
        }}>
          START DIVE
        </Link>

        <a href="/api/trash" style={{ 
          padding: '10px 20px', 
          border: '1px solid #00d4ff', 
          textDecoration: 'none', 
          color: '#00d4ff',
          marginRight: '10px'
        }}>View API Data</a>
        
        <a href="/admin" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#00d4ff', 
          textDecoration: 'none', 
          color: '#000814',
          fontWeight: 'bold'
        }}>Admin Portal</a>
      </div>
      
      <p style={{ marginTop: '50px', fontSize: '0.8rem', opacity: '0.5' }}>
        System Status: [ONLINE] | Location: CSUF FullyHacks 2026
      </p>
    </div>
  );
}