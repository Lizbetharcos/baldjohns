'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    // 1. Upload to Vercel Blob
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });
    
    const newBlob = await response.json();
    
    // 2. Display the URL so you can copy it to Neon
    setUrl(newBlob.url);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <h2>Trench Admin: Asset Uploader</h2>
      <p>Upload trash images here to get the URL for the Neon Database.</p>
      
      <form onSubmit={handleUpload} style={{ marginTop: '20px' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Upload Asset</button>
      </form>

      {url && (
        <div style={{ marginTop: '30px', padding: '20px', background: '#fff', border: '1px solid #ccc' }}>
          <p><strong>Success! Copy this URL for Neon:</strong></p>
          <code style={{ wordBreak: 'break-all', color: '#0070f3' }}>{url}</code>
        </div>
      )}
    </div>
  );
}