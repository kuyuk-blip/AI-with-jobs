import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Clock, HelpCircle, ArrowDown, RotateCcw, ShieldCheck } from 'lucide-react';

interface Chapter6Props {
  onOpenEvidence: (id: string) => void;
}

interface OutcomeBucket {
  id: string;
  name: string;
  reality: 'common' | 'rare' | 'corporate_capture';
  desc: string;
  empiricalNote: string;
}

const OUTCOMES: OutcomeBucket[] = [
  { id: 'volume', name: '1. Higher Volume / More Output', reality: 'common', desc: 'Doing 5 client proposals or 10 pull requests instead of 4.', empiricalNote: 'Common: Enterprise expectations rise to absorb higher baseline output.' },
  { id: 'quality', name: '2. Deeper Polish & Verification', reality: 'common', desc: 'Investing saved minutes into double-checking edge cases and fact-checking.', empiricalNote: 'Pew 2025: 29% report higher quality, vs 40% reporting higher speed.' },
  { id: 'admin', name: '3. Administrative Creep', reality: 'common', desc: 'More sync meetings, compliance forms, and internal Slack communications.', empiricalNote: 'Parkinson’s Law: Administrative overhead expands to fill freed capacity.' },
  { id: 'distraction', name: '4. Fragmented Context Switching', reality: 'common', desc: 'Rapid multitasking between AI tools, feeds, and disparate tabs.', empiricalNote: 'Qualitative field studies cite cognitive fatigue from supervising AI outputs.' },
  { id: 'learning', name: '5. Deep Learning & Mastery', reality: 'rare', desc: 'Spending freed hours studying foundational domain literature or codebases.', empiricalNote: 'Desired by workers, but frequently squeezed out by deadline compression.' },
  { id: 'less_hours', name: '6. Shorter Workweeks', reality: 'rare', desc: 'Working 32 hours instead of 40 for the same pay.', empiricalNote: 'NBER Denmark trial: 0% measurable change in total hours worked.' },
  { id: 'higher_wage', name: '7. Worker Wage Premium', reality: 'rare', desc: 'Receiving higher salary directly proportionate to AI speed gains.', empiricalNote: 'NBER Denmark: Null earnings effect (>2%) over two full years of adoption.' },
  { id: 'enterprise', name: '8. Enterprise Margin & Lower Prices', reality: 'corporate_capture', desc: 'Shareholders, firms, and clients capture the efficiency surplus.', empiricalNote: 'Economic surplus primarily flows to corporate profitability or price competition.' }
];

export const Chapter6FasterThenWhat: React.FC<Chapter6Props> = ({ onOpenEvidence }) => {
  const [allocatedTokens, setAllocatedTokens] = useState<Record<string, number>>({
    volume: 3,
    admin: 2,
    quality: 2,
    enterprise: 2,
    learning: 1,
    higher_wage: 0,
    less_hours: 0,
    distraction: 0
  });

  const totalAllocated = Object.values(allocatedTokens).reduce((a, b) => a + b, 0);
  const remainingTokens = 10 - totalAllocated;

  const handleAddToken = (id: string) => {
    if (remainingTokens <= 0) return;
    setAllocatedTokens((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveToken = (id: string) => {
    if ((allocatedTokens[id] || 0) <= 0) return;
    setAllocatedTokens((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const handleReset = () => {
    setAllocatedTokens({
      volume: 3,
      admin: 2,
      quality: 2,
      enterprise: 2,
      learning: 1,
      higher_wage: 0,
      less_hours: 0,
      distraction: 0
    });
  };

  return (
    <article id="ch06_faster_then_what" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">06</span>
            <span>FASTER. THEN WHAT?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            A faster worker does not automatically become a richer worker.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            If an assistant saves you two hours every workday, where does that time actually flow? We track the 8 realistic outcomes using nationwide administrative tax records and workplace surveys.
          </p>
        </header>

        {/* Two Empirical Anchor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Denmark NBER Study */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#f59e0b] uppercase">
                The Compensation Puzzle
              </span>
              <EvidenceBadge id="C011" onClick={onOpenEvidence} labelOverride="NBER · Denmark Administrative Study" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              Denmark NBER: Null Earnings Effect (&gt;2%)
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Economists tracked administrative payroll and tax records across thousands of Danish workers adopting ChatGPT. Over two full years, researchers found <strong>no statistically measurable effect on hourly wages or hours worked exceeding ±2%</strong>. Productivity gains were absorbed elsewhere.
            </p>
          </div>

          {/* Pew Quality vs Speed Study */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#6dc361] uppercase">
                Speed vs Polish
              </span>
              <EvidenceBadge id="C012" onClick={onOpenEvidence} labelOverride="Pew · Speed vs Quality" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              Pew Research: 40% Speed vs 29% Quality
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Surveys of American workers demonstrate that AI is primarily experienced as a velocity accelerator (40% report completing work faster), whereas only 29% report that the final work artifact is of higher qualitative caliber.
            </p>
          </div>
        </div>

        {/* Interactive Saved Time Flow Simulator */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#163560] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                Interactive Value Flow Simulator
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f7faeb] mt-0.5">
                Where does saved workday time actually go?
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#081a36] text-[#9bb2cf] border border-[#163560]">
                Unallocated: <strong className="text-[#d7e63b]">{remainingTokens}</strong> / 10 Tokens
              </span>
              <button
                onClick={handleReset}
                className="text-[#9bb2cf] hover:text-[#f7faeb] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Token Distribution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {OUTCOMES.map((bucket) => {
              const tokens = allocatedTokens[bucket.id] || 0;
              return (
                <div
                  key={bucket.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    tokens > 0 ? 'bg-[#0e274c] border-[#1e5bb4]' : 'bg-[#081a36] border-[#163560]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#f7faeb]">{bucket.name}</span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold border ${
                          bucket.reality === 'common'
                            ? 'bg-[#132c4d] text-[#9bb2cf] border-[#1c4172]'
                            : bucket.reality === 'rare'
                            ? 'bg-[#2a1a0c] text-[#f59e0b] border-[#482e14]'
                            : 'bg-[#0c2a20] text-[#6dc361] border-[#144835]'
                        }`}
                      >
                        {bucket.reality.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9bb2cf] leading-snug">{bucket.desc}</p>
                    <p className="text-[10px] text-[#7e9bbd] font-mono italic pt-1 border-t border-[#163560]">
                      {bucket.empiricalNote}
                    </p>
                  </div>

                  {/* Token Controls */}
                  <div className="pt-3 mt-3 border-t border-[#163560] flex items-center justify-between font-mono">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: tokens }).map((_, i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-[#d7e63b]" />
                      ))}
                      {tokens === 0 && <span className="text-[10px] text-[#5f7d9f]">0 tokens</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleRemoveToken(bucket.id)}
                        disabled={tokens <= 0}
                        className="w-5 h-5 rounded bg-[#142e53] hover:bg-[#1a3a68] text-[#f7faeb] disabled:opacity-30 text-xs flex items-center justify-center cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleAddToken(bucket.id)}
                        disabled={remainingTokens <= 0}
                        className="w-5 h-5 rounded bg-[#1e5bb4] hover:bg-[#256fdc] text-[#f7faeb] disabled:opacity-30 text-xs flex items-center justify-center cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#081a36] rounded-xl border border-[#1b3d6d] text-xs text-[#9bb2cf]">
            <strong className="text-[#f7faeb]">Key Economic Takeaway:</strong> In competitive markets, individual speed gains rarely translate into higher hourly wages. Instead, benchmarks calibrate upwards: client deliverables expand, turnaround times shrink, and the economic surplus is largely divided between enterprise operating margins and customer price cuts.
          </div>
        </div>
      </div>
    </article>
  );
};
