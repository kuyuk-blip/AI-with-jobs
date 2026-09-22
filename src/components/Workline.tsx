import React, { useState } from 'react';
import { Database, Compass, Layers, ShieldCheck, X, ChevronRight, Sparkles } from 'lucide-react';
import { occupations271 } from '../data/occupations271';

export interface ChapterMeta {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
  glyph: string;
  thesis: string;
}

export const CHAPTER_LIST: ChapterMeta[] = [
  { id: 'ch00_which_changes', num: 0, title: 'WHICH JOB CHANGES MORE?', shortTitle: 'Two Jobs', glyph: '⚖', thesis: 'Exposure is not the same as job loss or job growth.' },
  { id: 'ch01_four_futures', num: 1, title: '271 JOBS. FOUR DIFFERENT FUTURES.', shortTitle: 'Four Futures', glyph: '✦', thesis: 'r = -0.09 between exposure and growth: almost no simple relationship.' },
  { id: 'ch02_cognitive_reach', num: 2, title: 'WHAT KIND OF WORK DOES AI REACH FIRST?', shortTitle: 'Cognitive Fingerprint', glyph: '◈', thesis: 'Language models directly touch verbal and structured tasks first.' },
  { id: 'ch03_three_lenses', num: 3, title: 'ONE JOB. THREE AI LENSES.', shortTitle: 'Three Lenses', glyph: '◎', thesis: 'There is no single, monolithic AI-risk percentage.' },
  { id: 'ch04_possible_actual', num: 4, title: 'POSSIBLE ≠ ACTUAL.', shortTitle: 'Possible ≠ Actual', glyph: '⚑', thesis: 'Theoretical capability is constrained by real-world adoption friction.' },
  { id: 'ch05_real_workday', num: 5, title: 'AI IN A REAL WORKDAY.', shortTitle: 'Workday Timelines', glyph: '◷', thesis: 'How AI redistributes real tasks in teaching, medicine, design, and support.' },
  { id: 'ch06_faster_then_what', num: 6, title: 'FASTER. THEN WHAT?', shortTitle: 'Value Flow', glyph: '⚡', thesis: 'A faster worker does not automatically become a higher-paid worker.' },
  { id: 'ch07_career_ladder', num: 7, title: 'THE CAREER LADDER MOVES.', shortTitle: 'Career Ladder', glyph: '🪜', thesis: 'When AI absorbs beginner tasks, how do novices build expert judgement?' },
  { id: 'ch08_new_advantage', num: 8, title: 'WHAT BECOMES MORE VALUABLE?', shortTitle: 'Skill Constellation', glyph: '✸', thesis: 'Judgement, verification, domain expertise, and responsibility grow scarce.' },
  { id: 'ch09_india_lens', num: 9, title: 'INDIA: SAME TECHNOLOGY, DIFFERENT STARTING POINT.', shortTitle: 'India Macro Lens', glyph: '✺', thesis: '26% high exposure = 14% complementary + 12% displacement risk.' },
  { id: 'ch10_your_profession', num: 10, title: 'YOUR PROFESSION.', shortTitle: 'Atlas & Compare', glyph: '❖', thesis: 'Search 271 occupations, inspect work cards, and compare any two.' }
];

interface WorklineProps {
  activeChapter: string;
  onSelectChapter: (id: string) => void;
  onOpenEvidence: (id?: string) => void;
  onOpenMethodology: () => void;
}

export const Workline: React.FC<WorklineProps> = ({
  activeChapter,
  onSelectChapter,
  onOpenEvidence,
  onOpenMethodology
}) => {
  const [storyMapOpen, setStoryMapOpen] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const activeIndex = CHAPTER_LIST.findIndex((c) => c.id === activeChapter);
  const activeMeta = CHAPTER_LIST[activeIndex] || CHAPTER_LIST[0];

  const handleNavigate = (id: string) => {
    onSelectChapter(id);
    setStoryMapOpen(false);
  };

  return (
    <>
      {/* DESKTOP WORKLINE: Ultra-clean, authoritative vertical spine on the far-left edge */}
      <nav
        aria-label="Story Workline Navigation"
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-12 flex-col items-center justify-between py-6 z-40 bg-[#061329]/95 backdrop-blur-md border-r border-[#15315b] select-none shadow-[1px_0_16px_rgba(0,0,0,0.5)]"
      >
        {/* Top Observatory Mark / Story Map Trigger */}
        <button
          onClick={() => setStoryMapOpen(true)}
          title="Open Story Map (Atlas of 271 Professions)"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#d7e63b] hover:text-[#f7faeb] hover:bg-[#0e274c] transition-all group relative cursor-pointer border border-[#173763]"
        >
          <span className="font-mono text-xs font-bold tracking-tighter">WO</span>
          <span className="absolute left-10 ml-2 px-2.5 py-1 bg-[#0b1f3c] text-[#f7faeb] text-xs font-mono rounded shadow-lg border border-[#1b3d6d] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Atlas Map & Chapters
          </span>
        </button>

        {/* The Vertical Workline Wire */}
        <div className="relative flex flex-col items-center justify-center flex-1 py-6">
          {/* Subtle background rail line */}
          <div className="absolute w-[1.5px] top-4 bottom-4 bg-[#142e53]" />

          {/* Progress fill line */}
          <div
            className="absolute w-[2px] top-4 bg-[#1e5bb4] transition-all duration-300"
            style={{
              height: `${Math.max(4, (activeIndex / (CHAPTER_LIST.length - 1)) * 100)}%`
            }}
          />

          {/* Chapter Glyphs / Nodes */}
          <div className="relative flex flex-col items-center justify-between h-full py-2 z-10">
            {CHAPTER_LIST.map((chapter) => {
              const isActive = activeChapter === chapter.id;
              const isPast = CHAPTER_LIST.findIndex((c) => c.id === chapter.id) <= activeIndex;

              return (
                <div
                  key={chapter.id}
                  className="relative group my-0.5"
                  onMouseEnter={() => setHoveredChapter(chapter.id)}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  <button
                    onClick={() => handleNavigate(chapter.id)}
                    aria-label={`Jump to Chapter ${chapter.num}: ${chapter.title}`}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d7e63b] text-[#061329] ring-4 ring-[#d7e63b]/25 scale-110 font-bold'
                        : isPast
                        ? 'bg-[#0e274d] text-[#f7faeb] hover:bg-[#1e5bb4] hover:text-white'
                        : 'bg-[#061329] text-[#9bb2cf] border border-[#153258] hover:border-[#d7e63b] hover:text-[#f7faeb]'
                    }`}
                  >
                    {chapter.num}
                  </button>

                  {/* Flyout Hover Label */}
                  <div className="absolute left-9 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-3 py-1.5 bg-[#0b1f3c] text-[#f7faeb] text-xs font-sans rounded-md shadow-xl border border-[#1b3d6d] pointer-events-none whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
                    <span className="font-mono text-[#d7e63b] font-semibold">{chapter.num}</span>
                    <span className="font-medium text-[#f7faeb]">{chapter.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Utility Controls */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => onOpenEvidence()}
            title="Open Evidence Vault"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#9bb2cf] hover:text-[#f7faeb] hover:bg-[#0e274c] transition-colors relative group cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#d7e63b]" />
            <span className="absolute left-9 ml-2 px-2.5 py-1 bg-[#0b1f3c] text-[#f7faeb] text-xs font-mono rounded shadow-lg border border-[#1b3d6d] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Evidence Vault
            </span>
          </button>
          <button
            onClick={onOpenMethodology}
            title="Audit Methodology & Limitations"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#9bb2cf] hover:text-[#f7faeb] hover:bg-[#0e274c] transition-colors relative group cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[#1e5bb4]" />
            <span className="absolute left-9 ml-2 px-2.5 py-1 bg-[#0b1f3c] text-[#f7faeb] text-xs font-mono rounded shadow-lg border border-[#1b3d6d] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Audit Methodology
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE PROGRESS KNOT: Minimalist floating pill at the bottom */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setStoryMapOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2 bg-[#081b37]/95 text-[#f7faeb] text-xs font-mono rounded-full shadow-2xl border border-[#1c3f71] backdrop-blur active:scale-95 transition-transform"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#d7e63b] animate-pulse" />
          <span className="font-semibold text-[#d7e63b]">CH {activeMeta.num}</span>
          <span className="text-[#f7faeb] font-sans truncate max-w-[140px]">{activeMeta.shortTitle}</span>
          <span className="text-[10px] text-[#6dc361] font-mono ml-1">MAP ↗</span>
        </button>
      </div>

      {/* FULL-SCREEN STORY MAP / ATLAS OVERLAY */}
      {storyMapOpen && (
        <div className="fixed inset-0 z-50 bg-[#040d1c]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div className="bg-[#071731] text-[#f7faeb] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#1a3d6d] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#163560] flex items-center justify-between bg-[#0a1f3f]/80">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#d7e63b] uppercase font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Work Observatory • Story Map</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f7faeb] mt-1">
                  Living Atlas of 271 Occupations
                </h2>
                <p className="text-xs sm:text-sm text-[#9bb2cf] mt-0.5">
                  Follow the single, unbroken thread through empirical labour research.
                </p>
              </div>
              <button
                onClick={() => setStoryMapOpen(false)}
                className="w-9 h-9 rounded-full bg-[#0e284e] hover:bg-[#143666] flex items-center justify-center text-[#f7faeb] transition-colors cursor-pointer border border-[#1c3f71]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Particle preview bar (representing the 271 occupations) */}
            <div className="px-6 py-3 bg-[#081b37] border-b border-[#163560] flex items-center justify-between text-xs text-[#9bb2cf]">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#d7e63b]">271</span>
                <span>Active occupation particles in observatory</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1 text-[#f7faeb]">
                  <span className="w-2 h-2 rounded-full bg-[#1e5bb4]" /> High Exp
                </span>
                <span className="inline-flex items-center gap-1 text-[#f7faeb]">
                  <span className="w-2 h-2 rounded-full bg-[#d7e63b]" /> Med Exp
                </span>
                <span className="inline-flex items-center gap-1 text-[#f7faeb]">
                  <span className="w-2 h-2 rounded-full bg-[#6dc361]" /> Low Exp
                </span>
              </div>
            </div>

            {/* Chapter Atlas Grid */}
            <div className="p-6 overflow-y-auto space-y-2.5 flex-1 bg-[#061329]">
              {CHAPTER_LIST.map((c) => {
                const isActive = activeChapter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleNavigate(c.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all border flex items-start justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-[#0c264d] border-[#d7e63b] ring-2 ring-[#d7e63b]/25 shadow-lg'
                        : 'bg-[#081c38] hover:bg-[#0e274c] border-[#15325b] hover:border-[#1e5bb4]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                          isActive ? 'bg-[#d7e63b] text-[#061329]' : 'bg-[#0d2345] text-[#9bb2cf] border border-[#173763] group-hover:text-[#f7faeb]'
                        }`}
                      >
                        {c.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#9bb2cf] uppercase">
                            Chapter {c.num}
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#d7e63b] text-[#061329]">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-base text-[#f7faeb] group-hover:text-[#d7e63b] transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-xs text-[#9bb2cf] mt-0.5 max-w-xl">{c.thesis}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9bb2cf] group-hover:text-[#d7e63b] group-hover:translate-x-0.5 transition-all mt-2 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Modal Footer with quick links */}
            <div className="p-4 bg-[#071731] border-t border-[#163560] flex items-center justify-between text-xs text-[#9bb2cf]">
              <span className="font-mono text-[11px]">Strict empirical citations • Zero synthetic quotes</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setStoryMapOpen(false);
                    onOpenEvidence();
                  }}
                  className="font-mono text-[#d7e63b] hover:underline cursor-pointer"
                >
                  Evidence Vault ↗
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    setStoryMapOpen(false);
                    onOpenMethodology();
                  }}
                  className="font-mono text-[#6dc361] hover:underline cursor-pointer"
                >
                  Methodology & Caveats ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
