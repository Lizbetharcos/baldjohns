// Try this if @/ isn't working
import CameraVerify from '../components/CameraVerify';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-cyan-400">
            GUARDIAN VISION
          </h1>
          <p className="text-slate-400">
            Mariana Trench Pollution Verification Protocol
          </p>
        </header>

        {/* 1. This is where we drop the component */}
        <section className="bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-700">
          <CameraVerify />
        </section>

        {/* Footer info */}
        <footer className="text-xs text-slate-500 pt-8">
          <p>CPSC240 Systems Programming Integration</p>
          <p>Powered by Human Delta Vision AI</p>
        </footer>
        
      </div>
    </main>
  );
}