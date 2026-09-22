import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Layers, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';

interface Chapter4Props {
  onOpenEvidence: (id: string) => void;
}

export const Chapter4PossibleVsActual: React.FC<Chapter4Props> = ({ onOpenEvidence }) => {
  const [activeTab, setActiveTab] = useState<'ilo' | 'anthropic' | 'microsoft'>('anthropic');

  return (
    <article id="ch04_possible_actual" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">04</span>
            <span>POSSIBLE ≠ ACTUAL.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            What an AI model can do in a test benchmark is rarely what happens in an office.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            Theoretical exposure calculations assume frictionless deployment. But real-world data from the International Labour Organization, Anthropic, and Microsoft show a massive gap between technical capability and everyday adoption.
          </p>
        </header>

        {/* Reality Gap Comparison Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: The Theoretical Capability Narrative */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#9bb2cf] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5f7d9f]" />
              <span>Benchmark Potential (Laboratory)</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              80% of US workers could see ≥10% tasks affected
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              OpenAI / UPenn benchmark study: 19% of US workers have at least 50% of their daily job duties theoretically touched by LLMs at current capability levels.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53] flex justify-between items-center text-[#9bb2cf]">
                <span>Theoretical task automation</span>
                <span className="font-bold text-[#f7faeb]">High</span>
              </div>
              <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53] flex justify-between items-center text-[#9bb2cf]">
                <span>Assumed deployment friction</span>
                <span className="font-bold text-[#f7faeb]">Zero</span>
              </div>
              <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53] flex justify-between items-center text-[#9bb2cf]">
                <span>Legal & HIPAA constraints</span>
                <span className="font-bold text-[#f7faeb]">Ignored</span>
              </div>
            </div>
          </div>

          {/* Right: The Observed Workplace Reality */}
          <div className="p-6 rounded-2xl bg-[#0b1f3c] border border-[#1e5bb4]/50 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#d7e63b] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d7e63b]" />
              <span>Observed Workplace Use (Empirical)</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
              Real adoption is selective, cautious, and collaborative
            </h3>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Global telemetry demonstrates that AI is primarily deployed to assist human workers with drafted summaries and code boilerplates, rather than wholesale role replacement.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="p-3 bg-[#061329] rounded-lg border border-[#1e5bb4]/30 flex justify-between items-center text-[#9bb2cf]">
                <span>Global workers in highest exposure tier</span>
                <span className="font-bold text-[#6dc361]">3.3% (ILO)</span>
              </div>
              <div className="p-3 bg-[#061329] rounded-lg border border-[#1e5bb4]/30 flex justify-between items-center text-[#9bb2cf]">
                <span>Enterprise usage: Augment vs Automate</span>
                <span className="font-bold text-[#d7e63b]">57% vs 43%</span>
              </div>
              <div className="p-3 bg-[#061329] rounded-lg border border-[#1e5bb4]/30 flex justify-between items-center text-[#9bb2cf]">
                <span>Friction: compliance, liability, training</span>
                <span className="font-bold text-[#1e5bb4]">Substantial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Three-Study Telemetry Switcher */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#163560] pb-4">
            <span className="text-xs font-mono text-[#9bb2cf] uppercase tracking-wider">
              Explore Empirical Workplace Telemetry:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('anthropic')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'anthropic'
                    ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0]'
                    : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
                }`}
              >
                Anthropic Index
              </button>
              <button
                onClick={() => setActiveTab('microsoft')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'microsoft'
                    ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0]'
                    : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
                }`}
              >
                Microsoft Copilot
              </button>
              <button
                onClick={() => setActiveTab('ilo')}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ilo'
                    ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0]'
                    : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
                }`}
              >
                ILO 2025 Global
              </button>
            </div>
          </div>

          {/* Anthropic Tab Content */}
          {activeTab === 'anthropic' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
                  Anthropic Economic Index: 36% of occupations show active task use
                </h4>
                <EvidenceBadge id="C004" onClick={onOpenEvidence} labelOverride="Anthropic · Economic Index" />
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Analyzing real enterprise conversations with Claude across occupations reveals that in 36% of SOC occupations, the model is actively invoked for ≥25% of core work tasks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[#f7faeb]">Augmentation (Co-Working)</span>
                    <span className="font-bold text-[#6dc361]">57%</span>
                  </div>
                  <div className="w-full bg-[#061329] h-2.5 rounded-full overflow-hidden border border-[#142e53]">
                    <div className="bg-[#6dc361] h-full rounded-full" style={{ width: '57%' }} />
                  </div>
                  <p className="text-[11px] text-[#9bb2cf]">
                    Human worker reviews, directs, iteratively refines, and retains final output ownership.
                  </p>
                </div>
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[#f7faeb]">Automation (Batch Execution)</span>
                    <span className="font-bold text-[#d7e63b]">43%</span>
                  </div>
                  <div className="w-full bg-[#061329] h-2.5 rounded-full overflow-hidden border border-[#142e53]">
                    <div className="bg-[#d7e63b] h-full rounded-full" style={{ width: '43%' }} />
                  </div>
                  <p className="text-[11px] text-[#9bb2cf]">
                    Standalone translation, syntactic linting, formula generation without manual sentence-by-sentence oversight.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Microsoft Tab Content */}
          {activeTab === 'microsoft' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
                  Microsoft Copilot: 200,000 Real Enterprise Work Interactions
                </h4>
                <EvidenceBadge id="C005" onClick={onOpenEvidence} labelOverride="Microsoft · 200k Copilot Interactions" />
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Empirical evaluation of 200k enterprise Copilot sessions shows how workers actually invoke assistants during their work hours:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-2xl font-serif font-bold text-[#d7e63b] block font-mono">42%</span>
                  <span className="text-xs font-bold text-[#f7faeb] block mt-1">Information Gathering</span>
                  <p className="text-[11px] text-[#9bb2cf] mt-1">
                    Searching corporate intranet, summarizing meetings, extracting dates and action items.
                  </p>
                </div>
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-2xl font-serif font-bold text-[#1e5bb4] block font-mono">34%</span>
                  <span className="text-xs font-bold text-[#f7faeb] block mt-1">Writing & Drafting</span>
                  <p className="text-[11px] text-[#9bb2cf] mt-1">
                    Drafting email replies, memos, documentation outlines, and polishing client phrasing.
                  </p>
                </div>
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-2xl font-serif font-bold text-[#6dc361] block font-mono">24%</span>
                  <span className="text-xs font-bold text-[#f7faeb] block mt-1">Advising & Ideation</span>
                  <p className="text-[11px] text-[#9bb2cf] mt-1">
                    Brainstorming project risks, formula syntax, structure suggestions, and code review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ILO Tab Content */}
          {activeTab === 'ilo' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
                  ILO 2025 Global Synthesis: The 25% vs 3.3% Discrepancy
                </h4>
                <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="ILO · Global Study" />
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                The International Labour Organization analyzed employment across 140+ countries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-3xl font-serif font-bold text-[#6dc361] block font-mono">25% vs 3.3%</span>
                  <span className="text-xs font-bold text-[#f7faeb] block mt-1">Global Exposure vs Replacement Risk</span>
                  <p className="text-[11px] text-[#9bb2cf] mt-1">
                    While 25% of global jobs feature some exposure, only 3.3% exist in the highest tier where entire roles are at imminent risk of wholesale substitution.
                  </p>
                </div>
                <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-3xl font-serif font-bold text-[#d7e63b] block font-mono">34% vs 11%</span>
                  <span className="text-xs font-bold text-[#f7faeb] block mt-1">High-Income vs Low-Income Divide</span>
                  <p className="text-[11px] text-[#9bb2cf] mt-1">
                    High-income economies possess far higher exposure (34%) due to knowledge work concentration, compared to low-income economies (11%) where agriculture and physical labour dominate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
