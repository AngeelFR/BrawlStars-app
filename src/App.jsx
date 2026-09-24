import React, { useState, useEffect, useMemo } from 'react';
import { fetchBrawlers } from './services/brawlStarsApi';
import { BrawlerCard } from './components/BrawlerCard';
import { LoadingState, ErrorState } from './components/FeedbackState';
import { Search, RefreshCw } from 'lucide-react';

export function App() {
  const [brawlers, setBrawlers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBrawlers();
      setBrawlers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrado optimizado para evitar re-renderizados innecesarios
  const filteredBrawlers = useMemo(() => {
    if (!Array.isArray(brawlers)) return [];
    return brawlers.filter((b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brawlers, searchTerm]);

  return (
    <div className="main-overlay flex flex-col justify-between">
      {/* Header Estilo Gamer */}
      <header className="bg-slate-950/90 border-b-4 border-red-400 py-6 px-4 shadow-2xl backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-yellow-400 tracking-wider uppercase text-center sm:text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Brawl Stars 
            </h1>
            <p className="text-sm text-gray-300 font-semibold text-center sm:text-left">
              Brawlers, Clases y Raridades
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 bg-yellow-400 text-slate-950 px-5 py-2.5 rounded-xl font-black uppercase text-sm hover:bg-yellow-300 transition-all disabled:opacity-50 shadow-lg active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6">
        {/* Buscador */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar Brawler..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border-2 border-yellow-400/50 rounded-xl focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400 transition-all shadow-xl"
          />
        </div>

        {loading && <LoadingState />}

        {error && <ErrorState message={error} onRetry={loadData} />}

        {!loading && !error && (
          <>
            {filteredBrawlers.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/80 rounded-2xl border border-slate-700 text-gray-300 font-bold max-w-md mx-auto">
                No se encontraron Brawlers con el nombre "{searchTerm}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrawlers.map((brawler) => (
                  <BrawlerCard key={brawler.id} brawler={brawler} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/90 border-t border-slate-800 py-4 text-center text-xs font-bold text-gray-400">
        Examen Parcial 1
      </footer>
    </div>
  );
}

export default App;