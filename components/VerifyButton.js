'use client';
import { useState, useRef } from 'react';

export default function VerifyButton({ itemId, onVerifySuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (response.ok) {
        onVerifySuccess(itemId);
      } else {
        alert("Scan failed. Check sonar signal!");
      }
    } catch (error) {
      console.error("Verification Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '15px' }}>
      {/* 'capture' tells mobile browsers to open the camera instead of the gallery */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={isUploading}
        style={{ 
          width: '100%', 
          padding: '15px', 
          backgroundColor: isUploading ? '#1a1a1a' : '#00d4ff', 
          color: isUploading ? '#00d4ff' : '#000', 
          fontWeight: 'bold', 
          border: isUploading ? '1px solid #00d4ff' : 'none', 
          cursor: isUploading ? 'not-allowed' : 'pointer',
          borderRadius: '4px'
        }}
      >
        {isUploading ? 'SCANNING ENVIRO...' : '📷 TAKE SCAN TO VERIFY'}
      </button>
    </div>
  );
}