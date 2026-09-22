import React, { useState } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { EvidenceBadge } from '../EvidenceBadge';
import { Scale, Eye, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface Chapter3Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

const DISAGREEMENT_EXAMPLES = [
  '31-9094', // Medical transcriptionists
  '43-3031', // Bookkeeping clerks
  '23-2092', // Court reporters
  '17-2061', // Computer hardware engineers
  '39-6012', // Concierges
  '19-3022', // Survey researchers
  '27-3041'  // Editors (high agreement)
];

export const Chapter3ThreeLenses: React.FC<Chapter3Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(activeOccupation.soc_code);

  const occ = occupations271.find((o) => o.soc_code === selectedCode) || activeOccupation;

  // Normalized AIOE representation (raw is standardized z-score roughly -2.0 to +2.0)
  const aioeNormalized = Math.max(0, Math.min(1, (occ.ai_exposure_aioe + 2) / 4));

  const humanPct = (occ.ai_exposure_llm_human * 100).toFixed(0);
  const gpt4Pct = (occ.ai_exposure_llm_gpt4 * 100).toFixed(0);
  const gapPct = Math.abs(occ.ai_exposure_llm_human - occ.ai_exposure_llm_gpt4) * 100;

  return (
    <article id="ch03_three_lenses" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">03</span>
            <span>ONE JOB. THREE AI LENSES.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            There is no single, perfect "AI risk number."
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            While human rubrics and model rubrics correlate strongly overall (<strong className="font-mono text-[#d7e63b]">r = 0.835</strong>), individual occupations produce startling disagreements. Depending on who evaluates the work, the same job looks entirely exposed or largely human-intensive.
          </p>
        </header>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b1f3c] p-3 rounded-xl border border-[#163560]">
          <span className="text-xs font-mono text-[#9bb2cf]">Sample high-divergence occupations:</span>
          <div className="flex flex-wrap gap-1.5">
            {DISAGREEMENT_EXAMPLES.map((code) => {
              const item = occupations271.find((o) => o.soc_code === code);
              if (!item) return null;
              const isSelected = occ.soc_code === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedCode(code);
                    onSelectOccupation(item);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0] shadow-xs'
                      : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
                  }`}
                >
                  {item.occupation_title}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Three Lenses Comparison Grid */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#163560] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                Analyzing Measurement Divergence
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#f7faeb] mt-0.5">
                {occ.occupation_title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0c2242] text-[#d7e63b] border border-[#1b3d6d]">
                Gap: {gapPct.toFixed(0)} percentage points
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lens 1: Human Expert Rubric */}
            <div className="p-5 rounded-xl bg-[#081a36] border border-[#163560] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#6dc361] uppercase">
                  Lens 1 · Human Experts
                </span>
                <span className="text-xs font-mono text-[#9bb2cf]">OpenAI / UPenn</span>
              </div>
              <div className="text-4xl font-serif font-bold text-[#f7faeb] font-mono">
                {humanPct}%
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Evaluated by human labour economists. Humans often penalize AI feasibility for tasks requiring tacit knowledge, empathy, or regulatory ambiguity.
              </p>
              <div className="w-full bg-[#061329] h-2 rounded-full overflow-hidden border border-[#142e53]">
                <div
                  className="bg-[#6dc361] h-full rounded-full transition-all duration-300"
                  style={{ width: `${humanPct}%` }}
                />
              </div>
            </div>

            {/* Lens 2: GPT-4 Self-Evaluation */}
            <div className="p-5 rounded-xl bg-[#081a36] border border-[#163560] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#1e5bb4] uppercase">
                  Lens 2 · GPT-4 Rubric
                </span>
                <span className="text-xs font-mono text-[#9bb2cf]">Automated Rubric</span>
              </div>
              <div className="text-4xl font-serif font-bold text-[#f7faeb] font-mono">
                {gpt4Pct}%
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Evaluated autonomously by GPT-4 on detailed task descriptions. The model frequently rates its own capability higher on syntactical, code, and clerical duties.
              </p>
              <div className="w-full bg-[#061329] h-2 rounded-full overflow-hidden border border-[#142e53]">
                <div
                  className="bg-[#1e5bb4] h-full rounded-full transition-all duration-300"
                  style={{ width: `${gpt4Pct}%` }}
                />
              </div>
            </div>

            {/* Lens 3: Ability-based AIOE */}
            <div className="p-5 rounded-xl bg-[#081a36] border border-[#163560] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#d7e63b] uppercase">
                  Lens 3 · AIOE Score
                </span>
                <span className="text-xs font-mono text-[#9bb2cf]">Felten, Raj & Seamans</span>
              </div>
              <div className="text-4xl font-serif font-bold text-[#f7faeb] font-mono">
                {occ.ai_exposure_aioe > 0 ? `+${occ.ai_exposure_aioe.toFixed(2)}` : occ.ai_exposure_aioe.toFixed(2)}
              </div>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Standardized ability score linking 52 cognitive skills to patented AI progress. Focuses on underlying mental capacities rather than explicit task text.
              </p>
              <div className="w-full bg-[#061329] h-2 rounded-full overflow-hidden border border-[#142e53]">
                <div
                  className="bg-[#d7e63b] h-full rounded-full transition-all duration-300"
                  style={{ width: `${aioeNormalized * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Editorial Case Study Box */}
          <div className="p-4 bg-[#071731] rounded-xl border border-[#163560] flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#d7e63b] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-[#f7faeb] text-sm">
                Why Medical Transcriptionists diverge: Human 23% vs GPT-4 88%
              </h4>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Human annotators reasoned that clinical dictations contain heavily accented doctors, noisy operating room audio, and HIPAA compliance risks. GPT-4 evaluated the pure task definition ("convert audio speech to written medical records") and concluded that modern Whisper/audio models can perform nearly all of it. Neither perspective is invalid; each models a different aspect of adoption friction.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with methodology citation */}
        <footer className="flex items-center justify-between pt-2 text-xs text-[#9bb2cf]">
          <div className="flex items-center gap-2">
            <span>Methodologies: Eloundou et al. (Science / arXiv 2023) & Felten et al. (Management Science 2021).</span>
            <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="OpenAI / AIOE Methods" />
          </div>
        </footer>
      </div>
    </article>
  );
};
