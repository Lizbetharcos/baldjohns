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