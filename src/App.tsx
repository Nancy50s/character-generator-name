import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dices, 
  User, 
  Shield, 
  Sword, 
  ScrollText, 
  Sparkles, 
  RefreshCw, 
  Download,
  Share2,
  ChevronRight,
  Zap,
  Brain,
  Heart,
  Eye,
  Activity,
  Dumbbell
} from 'lucide-react';
import { Character, CharacterGenre } from './types';
import { generateLocalCharacter } from './services/localGenerator';

const GENRES: CharacterGenre[] = ['Fantasy', 'Sci-Fi', 'Cyberpunk', 'Modern', 'Horror'];

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [genre, setGenre] = useState<CharacterGenre>('Fantasy');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate a small delay for "forging" feel
      await new Promise(resolve => setTimeout(resolve, 800));
      const newChar = generateLocalCharacter(genre);
      setCharacter(newChar);
    } catch (err) {
      setError("Failed to forge character. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const StatItem = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Icon size={12} className="text-emerald-500" />
          <span>{label}</span>
        </div>
        <span className="text-zinc-100">{value}</span>
      </div>
      <div className="stat-bar-bg">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(value / 20) * 100}%` }}
          className="stat-bar-fill"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-2 tracking-tight">
            Character <span className="text-emerald-500">Forge</span>
          </h1>
          <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
            Deterministic Entity Manifestation System
          </p>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                genre === g 
                  ? 'bg-emerald-500 text-black font-bold' 
                  : 'hover:bg-white/5 text-zinc-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls & Initial State */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="scanline" />
            <h2 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <Dices size={20} className="text-emerald-500" />
              Forge Parameters
            </h2>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Initialize the neural engine to manifest a unique entity from the {genre} dimension.
            </p>
            
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={20} />
              ) : (
                <>
                  <Sparkles size={20} />
                  GENERATE CHARACTER
                </>
              )}
            </button>

            {error && (
              <p className="mt-4 text-red-400 text-xs font-mono text-center">{error}</p>
            )}
          </div>

          {character && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 space-y-6"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 border-b border-white/10 pb-2">
                Ability Scores
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <StatItem label="Strength" value={character.stats.strength} icon={Dumbbell} />
                <StatItem label="Dexterity" value={character.stats.dexterity} icon={Zap} />
                <StatItem label="Constitution" value={character.stats.constitution} icon={Activity} />
                <StatItem label="Intelligence" value={character.stats.intelligence} icon={Brain} />
                <StatItem label="Wisdom" value={character.stats.wisdom} icon={Eye} />
                <StatItem label="Charisma" value={character.stats.charisma} icon={Heart} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Character Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!character && !loading ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl text-zinc-600"
              >
                <User size={64} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="font-mono text-xs uppercase tracking-widest">Awaiting Manifestation</p>
              </motion.div>
            ) : loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl"
              >
                <div className="relative">
                  <RefreshCw size={48} className="animate-spin text-emerald-500 opacity-50" />
                  <div className="absolute inset-0 blur-xl bg-emerald-500/20 animate-pulse" />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-emerald-500 animate-pulse">
                  Forging Reality...
                </p>
              </motion.div>
            ) : character && (
              <motion.div 
                key="character"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <div className="aspect-square rounded-3xl overflow-hidden glass relative">
                      {generatingImage ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                          <RefreshCw className="animate-spin text-emerald-500 mb-2" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500">Rendering Portrait</span>
                        </div>
                      ) : character.imageUrl ? (
                        <img 
                          src={character.imageUrl} 
                          alt={character.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <User size={80} />
                        </div>
                      )}
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
                    </div>
                    
                    {/* Floating Badges */}
                    <div className="absolute -top-3 -right-3 bg-emerald-500 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                      {character.alignment}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h2 className="text-5xl font-serif italic leading-tight mb-2">
                        {character.name}
                      </h2>
                      <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm uppercase tracking-widest">
                        <span>{character.race}</span>
                        <ChevronRight size={14} />
                        <span>{character.class}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ScrollText size={18} className="text-zinc-500 mt-1 shrink-0" />
                        <p className="text-zinc-400 text-sm leading-relaxed italic">
                          "{character.personality}"
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Sword size={18} className="text-zinc-500 mt-1 shrink-0" />
                        <div className="flex flex-wrap gap-2">
                          {character.equipment.map((item, i) => (
                            <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-wider">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backstory */}
                <div className="glass rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ScrollText size={120} />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                    <ScrollText size={14} />
                    Historical Archives
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-300 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:mr-3 first-letter:float-left first-letter:text-emerald-500">
                      {character.backstory}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <button className="p-3 glass hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 glass hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white">
                    <Download size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
        <div className="flex items-center gap-2">
          <Shield size={12} />
          <span>Neural Forge Protocol v2.4.0</span>
        </div>
        <div className="flex gap-8">
          <span>Latency: 24ms</span>
          <span>Uptime: 99.9%</span>
          <span>Seed: {Math.floor(Math.random() * 1000000)}</span>
        </div>
      </footer>
    </div>
  );
}
