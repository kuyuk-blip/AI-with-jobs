import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Sparkles, ArrowRight, CheckCircle2, HelpCircle, ArrowUpDown } from 'lucide-react';
import { Occupation271 } from '../../data/occupations271';

interface Chapter0Props {
  onOpenEvidence: (id: string) => void;
  onSelectOccupation: (occ: Occupation271) => void;
}

interface ComparisonPair {
  jobA: {
    title: string;
    category: string;
    exposure: number;
    growth: number;
    wage: number;
    tasksSample: string[];
  };
  jobB: {
    title: string;
    category: string;
    exposure: number;
    growth: number;
    wage: number;
    tasksSample: string[];
  };
  contextNote: string;
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    jobA: {
      title: 'Graphic Designers',
      category: 'Arts & Design',
      exposure: 0.411,
      growth: 2.0,
      wage: 61300,
      tasksSample: ['Layout variation', 'Background removal', 'Client brand identity', 'Creative direction']
    },
    jobB: {
      title: 'Registered Nurses',
      category: 'Healthcare',
      exposure: 0.335,
      growth: 5.0,
      wage: 93600,
      tasksSample: ['Chart notes & EHR', 'Symptom triage checklist', 'Physical bedside care', 'Patient family empathy']
    },
    contextNote: 'Designers use image generation extensively, but nurses also encounter generative documentation and alert triage. Yet nursing demand expands faster (+5%) due to aging demographics.'
  },
  {
    jobA: {
      title: 'Software Developers',
      category: 'Computer & Mathematical',
      exposure: 0.61,
      growth: 17.0,
      wage: 130160,
      tasksSample: ['Code completion & boilerplates', 'Test generation', 'Distributed architecture', 'Production reliability']
    },
    jobB: {
      title: 'High School Teachers',
      category: 'Education',
      exposure: 0.341,
      growth: -2.0,
      wage: 64580,
      tasksSample: ['Lesson plan drafting', 'Rubric creation', 'Classroom management', 'Mentoring & social guidance']
    },
    contextNote: 'Software engineering is among the most AI-exposed roles (61%), yet projected to grow +17% — much faster than teaching (-2%), which contracts due to demographic school-age enrollments.'
  },
  {
    jobA: {
      title: 'Customer Service Reps',
      category: 'Office & Admin',
      exposure: 0.705,
      growth: -5.0,
      wage: 42830,
      tasksSample: ['Answering common queries', 'Ticket routing', 'Escalation handling', 'Empathetic de-escalation']
    },
    jobB: {
      title: 'Personal Financial Advisors',
      category: 'Finance',
      exposure: 0.671,
      growth: 10.0,
      wage: 102140,
      tasksSample: ['Portfolio summary reports', 'Tax bracket simulations', 'Client trust & reassurance', 'Life-event fiduciary advice']
    },
    contextNote: 'Both have very high AI exposure (~67–71%), but customer service declines (-5%) while personal financial advising expands (+10%) because human trust remains a premium asset.'
  }
];

export const Chapter0WhichChangesMore: React.FC<Chapter0Props> = ({ onOpenEvidence }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [userPick, setUserPick] = useState<'A' | 'B' | null>(null);
  const [revealed, setRevealed] = useState(false);

  const pair = COMPARISON_PAIRS[selectedPairIndex];

  const handlePick = (choice: 'A' | 'B') => {
    setUserPick(choice);
    setRevealed(true);
  };

  const handleNextPair = () => {
    setSelectedPairIndex((prev) => (prev + 1) % COMPARISON_PAIRS.length);
    setUserPick(null);
    setRevealed(false);
  };

  return (
    <article id="ch00_which_changes" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <header className="space-y-3 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">00</span>
            <span>WHICH JOB CHANGES MORE?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            Before looking at 271 professions, compare two.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-2xl">
            When you imagine artificial intelligence entering the workplace, which of these two familiar roles do you think AI changes more?
          </p>
        </header>

        {/* Pair Switcher tabs */}
        <div className="flex items-center justify-between gap-2 mb-6 border-b border-[#153258] pb-3">
          <span className="text-xs font-mono text-[#9bb2cf] uppercase tracking-wider">Select comparison pair:</span>
          <div className="flex items-center gap-1.5">
            {COMPARISON_PAIRS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPairIndex(idx);
                  setUserPick(null);
                  setRevealed(false);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  selectedPairIndex === idx
                    ? 'bg-[#d7e63b] text-[#061329] font-bold'
                    : 'bg-[#0a1f3f] text-[#9bb2cf] hover:bg-[#0e2a52] hover:text-[#f7faeb] border border-[#153258]'
                }`}
              >
                Pair {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Job A Card */}
          <div
            onClick={() => handlePick('A')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              userPick === 'A'
                ? 'border-[#d7e63b] bg-[#0d264a] ring-2 ring-[#d7e63b]/30 shadow-lg'
                : 'border-[#163560] bg-[#0b1f3c] hover:border-[#1e5bb4] shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#9bb2cf] uppercase tracking-wider">
                  {pair.jobA.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7faeb] mt-0.5">
                  {pair.jobA.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 bg-[#081a36] text-[#d7e63b] border border-[#163560] rounded-md">
                ${pair.jobA.wage.toLocaleString()}/yr
              </span>
            </div>

            <p className="text-xs text-[#9bb2cf] mb-4">Sample task bundle:</p>
            <ul className="space-y-1.5 mb-6 text-xs text-[#dbe7f5]">
              {pair.jobA.tasksSample.map((task, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e5bb4]" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            {!revealed ? (
              <button
                type="button"
                className="w-full py-2.5 px-4 bg-[#0e274c] hover:bg-[#1e5bb4] text-[#f7faeb] text-xs font-mono font-semibold rounded-lg border border-[#193d6d] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select this job</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="pt-4 border-t border-[#163560] grid grid-cols-2 gap-3 font-mono animate-in fade-in duration-300">
                <div className="bg-[#071731] border border-[#153258] p-3 rounded-lg">
                  <span className="text-[10px] text-[#9bb2cf] uppercase block">Fact 1: AI Exposure</span>
                  <span className="text-xl font-bold text-[#d7e63b]">
                    {(pair.jobA.exposure * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">task overlap</span>
                </div>
                <div className="bg-[#071731] border border-[#153258] p-3 rounded-lg">
                  <span className="text-[10px] text-[#9bb2cf] uppercase block">Fact 2: 10-Yr Growth</span>
                  <span
                    className={`text-xl font-bold ${
                      pair.jobA.growth >= 3.1
                        ? 'text-[#6dc361]'
                        : pair.jobA.growth >= 0
                        ? 'text-[#f7faeb]'
                        : 'text-[#f87171]'
                    }`}
                  >
                    {pair.jobA.growth > 0 ? '+' : ''}
                    {pair.jobA.growth}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">BLS forecast</span>
                </div>
              </div>
            )}
          </div>

          {/* Job B Card */}
          <div
            onClick={() => handlePick('B')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              userPick === 'B'
                ? 'border-[#d7e63b] bg-[#0d264a] ring-2 ring-[#d7e63b]/30 shadow-lg'
                : 'border-[#163560] bg-[#0b1f3c] hover:border-[#1e5bb4] shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#9bb2cf] uppercase tracking-wider">
                  {pair.jobB.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7faeb] mt-0.5">
                  {pair.jobB.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 bg-[#081a36] text-[#d7e63b] border border-[#163560] rounded-md">
                ${pair.jobB.wage.toLocaleString()}/yr
              </span>
            </div>

            <p className="text-xs text-[#9bb2cf] mb-4">Sample task bundle:</p>
            <ul className="space-y-1.5 mb-6 text-xs text-[#dbe7f5]">
              {pair.jobB.tasksSample.map((task, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e5bb4]" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            {!revealed ? (
              <button
                type="button"
                className="w-full py-2.5 px-4 bg-[#0e274c] hover:bg-[#1e5bb4] text-[#f7faeb] text-xs font-mono font-semibold rounded-lg border border-[#193d6d] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select this job</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="pt-4 border-t border-[#163560] grid grid-cols-2 gap-3 font-mono animate-in fade-in duration-300">
                <div className="bg-[#071731] border border-[#153258] p-3 rounded-lg">
                  <span className="text-[10px] text-[#9bb2cf] uppercase block">Fact 1: AI Exposure</span>
                  <span className="text-xl font-bold text-[#d7e63b]">
                    {(pair.jobB.exposure * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">task overlap</span>
                </div>
                <div className="bg-[#071731] border border-[#153258] p-3 rounded-lg">
                  <span className="text-[10px] text-[#9bb2cf] uppercase block">Fact 2: 10-Yr Growth</span>
                  <span
                    className={`text-xl font-bold ${
                      pair.jobB.growth >= 3.1
                        ? 'text-[#6dc361]'
                        : pair.jobB.growth >= 0
                        ? 'text-[#f7faeb]'
                        : 'text-[#f87171]'
                    }`}
                  >
                    {pair.jobB.growth > 0 ? '+' : ''}
                    {pair.jobB.growth}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">BLS forecast</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reveal & Core Insight Panel */}
        {revealed && (
          <div className="mt-8 p-6 bg-[#0a1f3f] rounded-2xl border border-[#193d6d] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1e5bb4] text-[#d7e63b] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-[#2563eb]">
                ✓
              </div>
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
                  Neither choice is "right" or "wrong" — because AI exposure and job growth are two completely different facts.
                </h4>
                <p className="text-sm text-[#9bb2cf] leading-relaxed">
                  {pair.contextNote}
                </p>
                <div className="text-xs text-[#9bb2cf] bg-[#071731] p-3 rounded-lg border border-[#153258]">
                  <p className="font-semibold text-[#f7faeb] mb-1">The Critical Distinction:</p>
                  <p>
                    <strong className="text-[#d7e63b]">Exposure</strong> measures what percentage of a role's daily tasks large language models or algorithms have the capability to assist or perform.
                    <strong className="text-[#6dc361]"> Projected growth</strong> measures overall macroeconomic employer demand for workers across the entire economy.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#163560] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#9bb2cf]">Evidence Peel:</span>
                <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="ILO · Task Exposure vs Job Loss" />
              </div>
              <button
                onClick={handleNextPair}
                className="px-3.5 py-1.5 bg-[#1e5bb4] hover:bg-[#2563eb] text-[#f7faeb] rounded-lg transition-colors font-mono cursor-pointer font-semibold"
              >
                Try next pair →
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
