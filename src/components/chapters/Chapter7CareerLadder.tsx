import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { TrendingDown, AlertTriangle, ArrowUpRight, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface Chapter7Props {
  onOpenEvidence: (id: string) => void;
}

const LADDER_RUNGS = [
  {
    level: 1,
    title: 'Basic / Mechanical Tasks',
    subtitle: 'Boilerplate, data entry, initial research drafts',
    aiStatus: 'automated',
    desc: 'Historically the entry gate for recent graduates. AI now handles 60–80% of routine formatting and synthesis.',
    tag: 'Absorbed by AI'
  },
  {
    level: 2,
    title: 'Repetition & Muscle Memory',
    subtitle: 'Running hundreds of routine iterations',
    aiStatus: 'automated',
    desc: 'The essential apprenticeship phase where junior professionals learn by doing repetitive grunt work.',
    tag: 'Compressed'
  },
  {
    level: 3,
    title: 'Mentorship & Feedback Loops',
    subtitle: 'Senior partner redlines, peer critique',
    aiStatus: 'at_risk',
    desc: 'When seniors review machine drafts instead of junior drafts, the vital coaching conversation disappears.',
    tag: 'Frayed Connection'
  },
  {
    level: 4,
    title: 'Tacit Pattern Recognition',
    subtitle: 'Intuitive mental maps of edge cases',
    aiStatus: 'human_target',
    desc: 'Recognizing subtle red flags that algorithms miss. Cannot be memorized; only acquired through immersion.',
    tag: 'Accelerated Expectation'
  },
  {
    level: 5,
    title: 'Discretionary Judgement',
    subtitle: 'Contextual trade-offs, ethics, taste',
    aiStatus: 'human_target',
    desc: 'Knowing when standard practices must be broken for client safety or strategic differentiation.',
    tag: 'Premium Human Skill'
  },
  {
    level: 6,
    title: 'Fiduciary Responsibility & Liability',
    subtitle: 'Signing the audit, carrying legal liability',
    aiStatus: 'human_target',
    desc: 'The human takes personal and legal accountability. Machines cannot be sued, disbarred, or incarcerated.',
    tag: 'Irreplaceable Core'
  }
];

export const Chapter7CareerLadder: React.FC<Chapter7Props> = ({ onOpenEvidence }) => {
  const [selectedRung, setSelectedRung] = useState<number>(1);

  const rung = LADDER_RUNGS.find((r) => r.level === selectedRung) || LADDER_RUNGS[0];

  return (
    <article id="ch07_career_ladder" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">07</span>
            <span>THE CAREER LADDER MOVES.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            If beginner tasks get automated, how do beginners build judgement?
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            The traditional apprenticeship ladder is breaking. When algorithms absorb routine entry-level duties, junior professionals are expected to perform senior-level discretionary reasoning on day one.
          </p>
        </header>

        {/* Two Pivotal Empirical Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PwC 2026 Junior Skills Compression */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#6dc361] uppercase">
                Job Posting Analysis
              </span>
              <EvidenceBadge id="C013" onClick={onOpenEvidence} labelOverride="PwC · Junior Role Requirements" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              PwC 2026: 7× Senior Skill Requirement in Entry Roles
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Analysis of millions of job openings indicates that entry-level roles in AI-exposed fields are <strong>7 times more likely</strong> to demand traditionally senior skills — such as executive communication, client advisory, and independent risk evaluation.
            </p>
          </div>

          {/* Stanford / ADP Payroll Youth Employment Gap */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#f59e0b] uppercase">
                Early-Career Hiring Signal
              </span>
              <EvidenceBadge id="C014" onClick={onOpenEvidence} labelOverride="Stanford · ADP Youth Employment" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              Stanford 2026: -19% Young Worker Signal
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Evaluating ADP payroll microdata revealed that workers aged 22–25 in high AI-exposure professions experienced a <strong>19% relative employment drop</strong> compared to peers in non-exposed sectors during initial GenAI expansion.
            </p>
          </div>
        </div>

        {/* The 6-Rung Career Ladder Interactive Diagram */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#163560] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                Apprenticeship Architecture
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f7faeb] mt-0.5">
                The 6 Rungs of Professional Mastery
              </h3>
            </div>
            <span className="text-xs font-mono text-[#9bb2cf]">Click any rung to inspect</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* The Ladder Display */}
            <div className="lg:col-span-7 space-y-2">
              {LADDER_RUNGS.slice().reverse().map((item) => {
                const isSelected = selectedRung === item.level;
                const isLowerRung = item.level <= 2;
                return (
                  <button
                    key={item.level}
                    onClick={() => setSelectedRung(item.level)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0e274c] border-[#1e5bb4] ring-2 ring-[#1e5bb4]/40'
                        : isLowerRung
                        ? 'bg-[#081a36] border-[#163560] hover:bg-[#0c2548]'
                        : 'bg-[#081a36] border-[#163560] hover:bg-[#0c2548]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {item.level}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#f7faeb]">{item.title}</h4>
                        <span className="text-[11px] text-[#9bb2cf] block">{item.subtitle}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                        item.level <= 2
                          ? 'bg-[#2a1a0c] text-[#f59e0b] border-[#482e14]'
                          : item.level === 3
                          ? 'bg-[#132c4d] text-[#9bb2cf] border-[#1c4172]'
                          : 'bg-[#0c2a20] text-[#6dc361] border-[#144835]'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rung Detail Inspection Panel */}
            <div className="lg:col-span-5 p-5 bg-[#081a36] rounded-xl border border-[#163560] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9bb2cf]">
                <span>Rung {rung.level} of 6</span>
                <span>•</span>
                <span className="text-[#d7e63b] font-semibold">{rung.tag}</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-[#f7faeb]">
                {rung.title}
              </h4>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">{rung.desc}</p>

              <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53] text-xs text-[#9bb2cf]">
                <span className="font-bold text-[#f7faeb] block mb-1">Career Impact:</span>
                {rung.level <= 2 && (
                  <p>When software produces first drafts in seconds, entry-level workers lose the hundreds of repetitions that intuitively wired previous generations' brains for pattern recognition.</p>
                )}
                {rung.level === 3 && (
                  <p>Mentors no longer spend time reviewing syntax mistakes with juniors, weakening the informal apprenticeship pipeline that builds professional judgment.</p>
                )}
                {rung.level >= 4 && (
                  <p>Because mechanical grunt work is solved, employers evaluate early-career candidates strictly on their capacity for independent judgment, verified taste, and ethical clarity.</p>
                )}
              </div>
            </div>
          </div>

          {/* Mandatory Adjacent Caveat */}
          <div className="p-4 bg-[#081a36] rounded-xl border border-[#1b3d6d] flex items-start gap-3 text-xs text-[#9bb2cf]">
            <AlertTriangle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#f7faeb] block font-sans">
                Mandatory Economic Caveat (OECD 2026):
              </strong>
              <p className="text-[11px] text-[#9bb2cf] leading-relaxed">
                Youth employment headwinds began before generative AI. Rising interest rates, corporate hiring rationalization, and tech pullbacks all contribute to junior hiring difficulties. AI is an accelerant, but not proven as the sole driver.
              </p>
              <EvidenceBadge id="C015" onClick={onOpenEvidence} labelOverride="OECD · Youth Labor Headwinds" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
