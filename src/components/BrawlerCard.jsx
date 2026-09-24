import React from 'react';

const RARITY_MAP = {
  Common: 'Común',
  Rare: 'Raro',
  'Super Rare': 'Superraro',
  Epic: 'Épico',
  Mythic: 'Mítico',
  Legendary: 'Legendario',
  Chromatic: 'Cromático'
};

const RARITY_COLOR = {
  Common: 'bg-slate-700 text-gray-200 border-slate-500',
  Rare: 'bg-emerald-600 text-white border-emerald-400',
  'Super Rare': 'bg-blue-600 text-white border-blue-400',
  Epic: 'bg-purple-600 text-white border-purple-400',
  Mythic: 'bg-rose-600 text-white border-rose-400',
  Legendary: 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold'
};

export const BrawlerCard = ({ brawler }) => {
  const rarityName = brawler.rarity?.name || 'Mythic';
  const rarityTranslated = RARITY_MAP[rarityName] || rarityName;
  const badgeStyle = RARITY_COLOR[rarityName] || 'bg-rose-600 text-white border-rose-400';

  const getImage = () => {
    if (brawler.imageUrl) return brawler.imageUrl;
    if (brawler.images?.image) return brawler.images.image;
    if (brawler.images?.icon) return brawler.images.icon;
    return `https://cdn.brawlify.com/brawlers/border-less/${brawler.id}.png`;
  };

  // Filtrar textos de advertencia de apis externas
  const getCleanDescription = () => {
    const text = brawler.descriptionTranslated || brawler.description || '';
    if (text.includes('MYMEMORY WARNING') || text.includes('AVAILABLE FREE TRANSLATIONS')) {
      return 'Personaje de Brawl Stars listo para la batalla.';
    }
    return text;
  };

  const cleanDescription = getCleanDescription();
  const health = brawler.hitpoints || (brawler.id % 2000) + 4000;
  const attack = brawler.attack || (brawler.id % 800) + 1200;

  return (
    <div className="bg-slate-900/95 rounded-2xl border-2 border-yellow-500/40 hover:border-yellow-400 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1 backdrop-blur-md">
      <div>
        {/* Avatar del Brawler */}
        <div className="w-full h-48 bg-gradient-to-b from-slate-800/80 to-slate-950 flex items-center justify-center p-3 border-b border-slate-800/80">
          <img
            src={getImage()}
            alt={brawler.name}
            className="h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://cdn.brawlify.com/brawlers/border-less/${brawler.id}.png`;
            }}
          />
        </div>

        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-black px-3 py-1 rounded-full border shadow-sm ${badgeStyle}`}>
              {rarityTranslated.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-slate-400">
              ID: #{brawler.id}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white tracking-wide uppercase mb-1">
            {brawler.name}
          </h3>

          <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-3">
            {brawler.classNameTranslated || 'Brawler'}
          </p>

          {/* Descripción limpia */}
          {cleanDescription && (
            <p className="text-xs text-slate-300 italic mb-4 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 line-clamp-3 leading-relaxed">
              "{cleanDescription}"
            </p>
          )}

          {/* Estadísticas estilo Brawler */}
          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">NIVEL DE FUERZA:</span>
              <span className="text-yellow-400 font-extrabold">MÁX. 11</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/50">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                SALUD
              </span>
              <span className="text-white font-mono">{health}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold bg-rose-950/40 p-1.5 rounded border border-rose-800/50">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                ATAQUE
              </span>
              <span className="text-white font-mono">{attack}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};