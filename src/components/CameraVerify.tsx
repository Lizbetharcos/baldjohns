"use client";
import { useRef, useState, useEffect } from 'react';

export default function CameraVerify() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 1. Initialize the camera stream
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Uses back camera on mobile
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();
  }, []);

  const captureAndVerify = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    // 2. Capture the current frame
    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 640, 480);
    const base64Image = canvasRef.current.toDataURL('image/png');

    // 3. Send to your working /api/verify route
    setIsVerifying(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, trashId: 'plastic_bottle' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Verification failed", err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-lg mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-black w-full aspect-square shadow-2xl border-4 border-slate-800">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
        
        {/* Scanning Animation Overlay */}
        {isVerifying && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_cyan] animate-bounce" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
          </div>
        )}
      </div>

      <button 
        onClick={captureAndVerify}
        disabled={isVerifying}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all active:scale-95 disabled:bg-slate-400"
      >
        {isVerifying ? "AI ANALYZING..." : "VERIFY TRASH"}
      </button>

      {/* Result Card */}
      {result && (
        <div className={`w-full p-4 rounded-xl border-2 transition-all ${result.verified ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white'}`}>
          <h3 className="font-bold text-slate-800">AI Verdict:</h3>
          <p className="text-sm text-slate-600">{result.verified ? "✅ Plastic Bottle Confirmed" : "❌ Item Not Recognized"}</p>
          <pre className="mt-2 text-[10px] bg-slate-100 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}