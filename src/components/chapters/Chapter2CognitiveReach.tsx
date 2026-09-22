import React, { useState } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { calculatedKeyFindings } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { Sparkles, AlertCircle, Fingerprint, Layers, ArrowRight } from 'lucide-react';

interface Chapter2Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

const COGNITIVE_DIMENSIONS = [
  { key: 'verbal_ability', label: 'Verbal Ability', r: 0.711, desc: 'Oral/written comprehension & expression', color: '#0f766e' },
  { key: 'reasoning_ability', label: 'Reasoning Ability', r: 0.491, desc: 'Deductive, inductive, and originality', color: '#0d9488' },
  { key: 'quantitative_ability', label: 'Quantitative Ability', r: 0.432, desc: 'Mathematical reasoning & computation', color: '#0284c7' },
  { key: 'memory_ability', label: 'Memory Ability', r: 0.386, desc: 'Information recall & structured retention', color: '#6366f1' },
  { key: 'attention_ability', label: 'Attention Ability', r: 0.25, desc: 'Selective attention & time sharing', color: '#8b5cf6' },
  { key: 'perceptual_ability', label: 'Perceptual Ability', r: 0.12, desc: 'Speed of closure & perceptual speed', color: '#a855f7' },
  { key: 'spatial_ability', label: 'Spatial Ability', r: -0.394, desc: 'Spatial orientation & visualization', color: '#b45309' }
];

const PRESET_COMPARISON_SOCCDES = [
  '27-3043', // Writers and authors
  '15-1252', // Software Developers
  '29-1141', // Registered nurses
  '27-1024', // Graphic designers
  '17-2141', // Mechanical engineers
  '47-2111'  // Electricians
];

export const Chapter2CognitiveReach: React.FC<Chapter2Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [selectedPresetCode, setSelectedPresetCode] = useState<string>(activeOccupation.soc_code);

  const currentOcc = occupations271.find((o) => o.soc_code === selectedPresetCode) || activeOccupation;

  // Petal SVG geometry calculations
  const cx = 200;
  const cy = 200;
  const maxRadius = 130;

  return (
    <article id="ch02_cognitive_reach" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">02</span>
            <span>WHAT KIND OF WORK DOES AI REACH FIRST?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            AI reaches into language, symbols, and structured reasoning first.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            Correlating exposure with cognitive requirements across 271 professions exposes the underlying architectural bias of modern models:{' '}
            <strong className="text-[#f7faeb] font-semibold">verbal ability correlates at r = +0.71</strong>, while{' '}
            <strong className="text-[#f7faeb] font-semibold">spatial ability correlates at r = -0.39</strong>.
          </p>
        </header>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b1f3c] p-3.5 rounded-xl border border-[#163560]">
          <span className="text-xs font-mono text-[#9bb2cf]">Inspect cognitive fingerprint:</span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COMPARISON_SOCCDES.map((code) => {
              const occ = occupations271.find((o) => o.soc_code === code);
              if (!occ) return null;
              const isSelected = currentOcc.soc_code === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedPresetCode(code);
                    onSelectOccupation(occ);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0] shadow-xs'
                      : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
                  }`}
                >
                  {occ.occupation_title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Fingerprint Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl">
          {/* Left: Petal Flower Radial Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9bb2cf] mb-2">
              Cognitive Demand Petal Array
            </span>
            <div className="relative w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                {/* Background concentric reference rings (scores 1 to 5) */}
                {[1, 2, 3, 4, 5].map((level) => (
                  <circle
                    key={level}
                    cx={cx}
                    cy={cy}
                    r={(level / 5) * maxRadius}
                    fill="none"
                    stroke="#142e53"
                    strokeDasharray="2 3"
                  />
                ))}

                {/* Cognitive Petals */}
                {COGNITIVE_DIMENSIONS.map((dim, index) => {
                  const angle = (index / COGNITIVE_DIMENSIONS.length) * (2 * Math.PI) - Math.PI / 2;
                  const value = (currentOcc as any)[dim.key] || 2.5;
                  const petalLength = (value / 5) * maxRadius;

                  const tipX = cx + Math.cos(angle) * petalLength;
                  const tipY = cy + Math.sin(angle) * petalLength;

                  const leftAngle = angle - 0.22;
                  const rightAngle = angle + 0.22;
                  const midRadius = petalLength * 0.55;

                  const ctrl1X = cx + Math.cos(leftAngle) * midRadius;
                  const ctrl1Y = cy + Math.sin(leftAngle) * midRadius;
                  const ctrl2X = cx + Math.cos(rightAngle) * midRadius;
                  const ctrl2Y = cy + Math.sin(rightAngle) * midRadius;

                  const d = `M ${cx} ${cy} Q ${ctrl1X} ${ctrl1Y} ${tipX} ${tipY} Q ${ctrl2X} ${ctrl2Y} ${cx} ${cy} Z`;

                  // Outer label positions
                  const labelRadius = maxRadius + 36;
                  const lx = cx + Math.cos(angle) * labelRadius;
                  const ly = cy + Math.sin(angle) * labelRadius;

                  return (
                    <g key={dim.key} className="group cursor-pointer">
                      {/* Petal Path */}
                      <path
                        d={d}
                        fill={dim.color}
                        fillOpacity={0.45}
                        stroke={dim.color}
                        strokeWidth={1.8}
                        className="transition-all duration-300 hover:fill-opacity-80"
                      />
                      {/* Petal Tip Dot */}
                      <circle cx={tipX} cy={tipY} r={3.5} fill={dim.color} />
                      {/* Axis Label */}
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[9px] font-mono fill-[#9bb2cf] font-medium"
                      >
                        {dim.label.split(' ')[0]} ({value.toFixed(1)})
                      </text>
                    </g>
                  );
                })}

                {/* Center Core */}
                <circle cx={cx} cy={cy} r={12} fill="#071731" stroke="#1b3d6d" strokeWidth={2} />
                <circle cx={cx} cy={cy} r={4} fill="#d7e63b" />
              </svg>
            </div>
            <div className="text-center mt-2">
              <span className="font-serif font-bold text-[#f7faeb] text-sm block">
                {currentOcc.occupation_title}
              </span>
              <span className="text-[11px] font-mono text-[#d7e63b]">
                Distinctive strength: {currentOcc.distinctive_cognitive_strength}
              </span>
            </div>
          </div>

          {/* Right: Cognitive Breakdown & Correlation Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#9bb2cf] uppercase">Empirical Ability Profile</span>
              <h3 className="text-xl font-serif font-bold text-[#f7faeb]">
                Why language and logic face earlier disruption
              </h3>
              <p className="text-xs text-[#9bb2cf] leading-relaxed">
                Large language models process discrete tokens, text corpora, and formal syntactic structures. Consequently, occupations with high verbal and symbolic demands encounter AI capabilities far earlier than occupations requiring 3D physical coordination.
              </p>
            </div>

            {/* Ability Dimension Bars */}
            <div className="space-y-2.5 pt-2">
              {COGNITIVE_DIMENSIONS.map((dim) => {
                const score = (currentOcc as any)[dim.key] || 0;
                const pct = (score / 5) * 100;
                return (
                  <div key={dim.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#f7faeb]">{dim.label}</span>
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                            dim.r > 0 ? 'bg-[#0c2a20] text-[#6dc361] border-[#144835]' : 'bg-[#2a1a0c] text-[#f59e0b] border-[#482e14]'
                          }`}
                        >
                          r = {dim.r > 0 ? `+${dim.r.toFixed(2)}` : dim.r.toFixed(2)} with exposure
                        </span>
                      </div>
                      <span className="font-mono text-[#d7e63b] font-semibold">{score.toFixed(2)} / 5.0</span>
                    </div>
                    <div className="w-full h-2 bg-[#081a36] rounded-full overflow-hidden border border-[#142e53]">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: dim.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Essential Research Caveat */}
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#1b3d6d] text-xs text-[#9bb2cf] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-[#f7faeb] block font-sans">
                  Critical Guardrail: Spatial jobs are NOT "AI-proof"
                </span>
                <p className="text-[11px] text-[#9bb2cf] leading-relaxed">
                  Negative correlation with spatial ability (r = -0.39) reflects the current dominance of text-based LLMs. It does not imply that carpentry, surgery, or engineering are immune: vision transformers, spatial robotics, and sensor-based automation are advancing independently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer citation */}
        <footer className="flex items-center justify-between pt-2 text-xs text-[#9bb2cf]">
          <div className="flex items-center gap-2">
            <span>O*NET Cognitive Abilities Taxonomy mapped to 271 US occupations.</span>
            <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="O*NET · Cognitive Profiles" />
          </div>
        </footer>
      </div>
    </article>
  );
};
