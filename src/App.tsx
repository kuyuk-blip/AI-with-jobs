import React, { useState, useEffect } from 'react';
import { Workline, CHAPTER_LIST } from './components/Workline';
import { OccupationToken } from './components/OccupationToken';
import { Chapter0WhichChangesMore } from './components/chapters/Chapter0WhichChangesMore';
import { Chapter1FourFutures } from './components/chapters/Chapter1FourFutures';
import { Chapter2CognitiveReach } from './components/chapters/Chapter2CognitiveReach';
import { Chapter3ThreeLenses } from './components/chapters/Chapter3ThreeLenses';
import { Chapter4PossibleVsActual } from './components/chapters/Chapter4PossibleVsActual';
import { Chapter5RealWorkday } from './components/chapters/Chapter5RealWorkday';
import { Chapter6FasterThenWhat } from './components/chapters/Chapter6FasterThenWhat';
import { Chapter7CareerLadder } from './components/chapters/Chapter7CareerLadder';
import { Chapter8NewAdvantage } from './components/chapters/Chapter8NewAdvantage';
import { Chapter9IndiaLens } from './components/chapters/Chapter9IndiaLens';
import { Chapter10YourProfession } from './components/chapters/Chapter10YourProfession';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { MethodologyModal } from './components/MethodologyModal';
import { occupations271, Occupation271 } from './data/occupations271';
import { calculatedKeyFindings } from './data/researchData';
import { Compass, ShieldCheck, Database, BookOpen, Sparkles, ArrowDown } from 'lucide-react';

export const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('ch00_which_changes');
  const [activeOccupation, setActiveOccupation] = useState<Occupation271>(() => {
    return (
      occupations271.find((o) => o.soc_code === '27-1024') || // Graphic designers
      occupations271[0]
    );
  });
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);

  // Track active chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const chapterElements = CHAPTER_LIST.map((ch) => ({
        id: ch.id,
        el: document.getElementById(ch.id)
      }));

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el && item.el.offsetTop - 240 <= scrollY) {
          setActiveChapter(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEvidence = (claimOrSourceId?: string) => {
    setSelectedClaimId(claimOrSourceId || null);
    setEvidenceDrawerOpen(true);
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapter(chapterId);
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInChapter10 = (occ: Occupation271) => {
    setActiveOccupation(occ);
    handleSelectChapter('ch10_your_profession');
  };

  return (
    <div className="min-h-screen bg-[#061329] text-[#f7faeb] flex flex-col font-sans selection:bg-[#1e5bb4] selection:text-[#f7faeb]">
      {/* Editorial Workline Navigation (Desktop Left Spine + Mobile Progress Knot + Story Map) */}
      <Workline
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onOpenEvidence={handleOpenEvidence}
        onOpenMethodology={() => setMethodologyModalOpen(true)}
      />

      {/* Persistent Floating Occupation Token */}
      <OccupationToken
        occupation={activeOccupation}
        onOpenInChapter10={handleOpenInChapter10}
        onSelectAnother={() => handleSelectChapter('ch10_your_profession')}
      />

      {/* Main Container - Padded for left Desktop Workline */}
      <div className="md:pl-12 flex flex-col min-h-screen">
        {/* HERO EDITORIAL SECTION */}
        <section className="pt-16 pb-20 sm:pb-24 border-b border-[#153258] relative overflow-hidden bg-[#081a36]/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
            {/* Observatory Badge */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#d7e63b]" />
                <span>THE WORK OBSERVATORY · LIVING ATLAS ACROSS 271 PROFESSIONS</span>
              </div>

              {/* Title & Subtitle matching prompt verbatim */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-[#f7faeb] leading-[1.06]">
                HOW AI IS CHANGING WORK
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-[#9bb2cf] font-medium">
                Jobs, Skills, Pay & Career Paths Across 271 Occupations
              </p>
            </div>

            {/* Hero Explainer matching prompt verbatim */}
            <blockquote className="border-l-3 border-[#d7e63b] pl-4 sm:pl-6 py-1 max-w-3xl">
              <p className="text-base sm:text-xl font-serif italic text-[#f7faeb] leading-relaxed">
                “From designers and teachers to nurses, accountants, writers and engineers: see what AI can touch, what people are actually using it for, and why exposure does not automatically mean job loss.”
              </p>
            </blockquote>

            {/* The 271-Particle Living Constellation Preview Strip */}
            <div className="p-4 sm:p-5 bg-[#0b1f3c] rounded-2xl border border-[#173864] shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#9bb2cf] gap-2">
                <span className="flex items-center gap-1.5 text-[#f7faeb] font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#d7e63b] animate-ping" />
                  <span>The 271 Occupation Particles Atlas</span>
                </span>
                <span>Dataset median exposure: 37% · Baseline US growth: +3.1%</span>
              </div>

              {/* Particle representation */}
              <div className="h-10 w-full overflow-hidden flex items-center gap-1 py-1 px-1 bg-[#061329] rounded-xl border border-[#142e53]">
                {occupations271.slice(0, 72).map((occ, idx) => (
                  <button
                    key={occ.soc_code}
                    onClick={() => {
                      setActiveOccupation(occ);
                      handleSelectChapter('ch01_four_futures');
                    }}
                    title={`${occ.occupation_title} (${(occ.ai_exposure_llm_human * 100).toFixed(0)}% exposure)`}
                    className="flex-1 h-full rounded-xs transition-all hover:scale-125 cursor-pointer"
                    style={{
                      backgroundColor:
                        activeOccupation.soc_code === occ.soc_code
                          ? '#d7e63b'
                          : occ.ai_exposure_level === 'High'
                          ? '#1e5bb4'
                          : occ.ai_exposure_level === 'Medium'
                          ? '#d7e63b'
                          : '#6dc361',
                      opacity: activeOccupation.soc_code === occ.soc_code ? 1 : 0.65
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#9bb2cf]">
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1.5 text-[#f7faeb]">
                    <span className="w-2 h-2 rounded-full bg-[#1e5bb4]" /> High Exposure (72)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#f7faeb]">
                    <span className="w-2 h-2 rounded-full bg-[#d7e63b]" /> Medium Exposure (94)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#f7faeb]">
                    <span className="w-2 h-2 rounded-full bg-[#6dc361]" /> Low Exposure (105)
                  </span>
                </div>

                <button
                  onClick={() => handleSelectChapter('ch00_which_changes')}
                  className="font-mono text-xs text-[#d7e63b] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Begin Chapter 0</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* THE 11 EDITORIAL CHAPTERS */}
        <main className="flex-1">
          {/* Chapter 0: WHICH JOB CHANGES MORE? */}
          <Chapter0WhichChangesMore
            onOpenEvidence={handleOpenEvidence}
            onSelectOccupation={setActiveOccupation}
          />

          {/* Chapter 1: 271 JOBS. FOUR DIFFERENT FUTURES. */}
          <Chapter1FourFutures
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 2: WHAT KIND OF WORK DOES AI REACH FIRST? */}
          <Chapter2CognitiveReach
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 3: ONE JOB. THREE AI LENSES. */}
          <Chapter3ThreeLenses
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />

          {/* Chapter 4: POSSIBLE ≠ ACTUAL. */}
          <Chapter4PossibleVsActual onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 5: AI IN A REAL WORKDAY. */}
          <Chapter5RealWorkday onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 6: FASTER. THEN WHAT? */}
          <Chapter6FasterThenWhat onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 7: THE CAREER LADDER MOVES. */}
          <Chapter7CareerLadder onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 8: WHAT BECOMES MORE VALUABLE? */}
          <Chapter8NewAdvantage onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 9: INDIA: SAME TECHNOLOGY, DIFFERENT STARTING POINT. */}
          <Chapter9IndiaLens onOpenEvidence={handleOpenEvidence} />

          {/* Chapter 10: YOUR PROFESSION. */}
          <Chapter10YourProfession
            activeOccupation={activeOccupation}
            onSelectOccupation={setActiveOccupation}
            onOpenEvidence={handleOpenEvidence}
          />
        </main>

        {/* EDITORIAL REPOSITORY FOOTER */}
        <footer className="bg-[#040e1e] text-[#9bb2cf] py-16 border-t border-[#122847]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#122847]">
              <div>
                <span className="font-serif font-bold text-[#f7faeb] text-xl tracking-tight block">
                  THE WORK OBSERVATORY
                </span>
                <p className="text-xs text-[#9bb2cf] mt-1 max-w-lg leading-relaxed">
                  An open data-storytelling website synthesized from 271 occupation profiles, macroeconomic surveys, and verified field experiments. No synthetic quotes, no sponsored hype.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenEvidence()}
                  className="px-3.5 py-2 rounded-lg bg-[#091f3d] hover:bg-[#0e2c56] border border-[#173966] text-[#f7faeb] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d7e63b]" />
                  <span>Evidence Vault</span>
                </button>
                <button
                  onClick={() => setMethodologyModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#091f3d] hover:bg-[#0e2c56] border border-[#173966] text-[#f7faeb] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#1e5bb4]" />
                  <span>Data Audit & Methods</span>
                </button>
              </div>
            </div>

            {/* Sourced Research Registries */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d7e63b] block">
                Primary Research & Methodological Sources
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs text-[#9bb2cf]">
                <div>• International Labour Organization (ILO)</div>
                <div>• NBER / Stanford DEL (Brynjolfsson et al.)</div>
                <div>• Humlum & Meyer (Denmark NBER)</div>
                <div>• OECD Employment Outlook 2026</div>
                <div>• PwC AI Jobs Barometer 2026</div>
                <div>• World Economic Forum (WEF 2025)</div>
                <div>• International Monetary Fund (IMF)</div>
                <div>• World Bank WDR 2026</div>
                <div>• US Bureau of Labor Statistics (BLS)</div>
                <div>• O*NET Cognitive Taxonomy</div>
              </div>
            </div>

            <div className="text-[11px] text-[#5e7c9f] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#122847]">
              <span>© 2026 The Work Observatory. Built strictly for empirical education.</span>
              <span>All claims cited with direct external URLs, methodologies, and limitations.</span>
            </div>
          </div>
        </footer>

        {/* EVIDENCE PEEL DRAWER & METHODOLOGY MODAL */}
        <EvidenceDrawer
          isOpen={evidenceDrawerOpen}
          onClose={() => setEvidenceDrawerOpen(false)}
          selectedId={selectedClaimId}
          onSelectId={(id) => setSelectedClaimId(id)}
        />

        <MethodologyModal
          isOpen={methodologyModalOpen}
          onClose={() => setMethodologyModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
