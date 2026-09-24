import React, { useState } from 'react';

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

// Mapeo de proyectiles para Brawlers con ráfagas o múltiples perdigones
const BRAWLER_PROJECTILES = {
  shelly: { count: 5, label: 'perdigones' },
  bull: { count: 5, label: 'perdigones' },
  colt: { count: 6, label: 'balas' },
  darryl: { count: 12, label: 'balas' },
  '8-bit': { count: 6, label: 'rayos' },
  rico: { count: 5, label: 'balas' },
  'el primo': { count: 4, label: 'puñetazos' },
  pam: { count: 9, label: 'tuercas' },
  leon: { count: 4, label: 'shurikens' },
  crow: { count: 3, label: 'dagas' },
  tara: { count: 3, label: 'cartas' },
  gene: { count: 6, label: 'proyectiles' },
  bo: { count: 3, label: 'flechas' },
  tick: { count: 3, label: 'minas' },
  spike: { count: 6, label: 'espinas' },
  max: { count: 4, label: 'disparos' },
  carl: { count: 2, label: 'boomerangs' },
  amber: { count: 40, label: 'llamas' },
  pearl: { count: 6, label: 'galletas' }
};

// Imagen de respaldo asegurada para evitar bucles de errores 404
const FALLBACK_IMAGE = 'https://cdn.brawlify.com/brawlers/border-less/16000000.png';

export const BrawlerCard = ({ brawler }) => {
  // Estado para el Nivel de Fuerza (Nivel 11 Máximo por defecto)
  const [powerLevel, setPowerLevel] = useState(11);

  const rarityName = brawler.rarity?.name || 'Mythic';
  const rarityTranslated = RARITY_MAP[rarityName] || rarityName;
  const badgeStyle = RARITY_COLOR[rarityName] || 'bg-rose-600 text-white border-rose-400';

  // Obtención segura de imagen
  const getImage = () => {
    let url = brawler.imageUrl || brawler.images?.image || brawler.images?.icon;
    if (url) {
      return url.replace(/^http:\/\//, 'https://');
    }
    if (brawler.id) {
      return `https://cdn.brawlify.com/brawlers/border-less/${brawler.id}.png`;
    }
    return FALLBACK_IMAGE;
  };

  const getCleanDescription = () => {
    const text = brawler.descriptionTranslated || brawler.description || '';
    if (text.includes('MYMEMORY WARNING') || text.includes('AVAILABLE FREE TRANSLATIONS')) {
      return 'Personaje de Brawl Stars listo para la batalla.';
    }
    return text;
  };

  const cleanDescription = getCleanDescription();

  // --- CÁLCULOS DE SALUD Y DAÑO DINÁMICOS ---
  const baseHp = brawler.hitpoints || (brawler.id ? (brawler.id % 2000) + 2000 : 3000);
  const baseAttack = brawler.attack || (brawler.id ? (brawler.id % 400) + 300 : 500);

  // Fórmula de escalado de Brawl Stars (Nivel 1 = 100%, Nivel 11 = 200%)
  const multiplier = 1 + (powerLevel - 1) * 0.10;

  const currentHp = Math.round(baseHp * multiplier);
  const currentAttackPerHit = Math.round(baseAttack * multiplier);

  // Datos de proyectiles
  const nameKey = brawler.name?.toLowerCase().trim();
  const projectileConfig = BRAWLER_PROJECTILES[nameKey] || { count: 1, label: 'impacto' };
  const totalAttackDamage = currentAttackPerHit * projectileConfig.count;

  return (
    <div className="bg-slate-900/95 rounded-2xl border-2 border-yellow-500/40 hover:border-yellow-400 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1 backdrop-blur-md">
      <div>
        {/* Avatar del Brawler con manejo anti-bucle de errores 404 */}
        <div className="w-full h-48 bg-gradient-to-b from-slate-800/80 to-slate-950 flex items-center justify-center p-3 border-b border-slate-800/80">
          <img
            src={getImage()}
            alt={brawler.name}
            className="h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              // Si la imagen falla, desactiva más llamadas al evento y asigna la imagen genérica
              if (e.target.src !== FALLBACK_IMAGE) {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGE;
              }
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

          {/* Descripción */}
          {cleanDescription && (
            <p className="text-xs text-slate-300 italic mb-4 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 line-clamp-3 leading-relaxed">
              "{cleanDescription}"
            </p>
          )}

          {/* Sección de Estadísticas y Selector de Nivel */}
          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 space-y-2">
            {/* Selector interactivo de nivel */}
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">NIVEL DE FUERZA:</span>
              <select
                value={powerLevel}
                onChange={(e) => setPowerLevel(Number(e.target.value))}
                className="bg-slate-900 text-yellow-400 font-extrabold px-2 py-0.5 rounded border border-yellow-500/50 focus:outline-none cursor-pointer"
              >
                {[...Array(11)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    NIVEL {i + 1} {i + 1 === 1 ? '(BASE)' : i + 1 === 11 ? '(MÁX)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Salud */}
            <div className="flex items-center justify-between text-xs font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/50">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                SALUD
              </span>
              <span className="text-white font-mono">{currentHp}</span>
            </div>

            {/* Ataque */}
            <div className="flex flex-col bg-rose-950/40 p-2 rounded border border-rose-800/50">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  ATAQUE
                </span>
                <span className="text-white font-mono">{totalAttackDamage}</span>
              </div>

              {projectileConfig.count > 1 && (
                <div className="text-[10px] text-rose-300/80 text-right mt-0.5 font-mono">
                  ({projectileConfig.count}x {currentAttackPerHit} {projectileConfig.label})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};