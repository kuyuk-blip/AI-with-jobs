import React, { useState } from 'react';
import { Occupation271 } from '../data/occupations271';
import { Compass, ExternalLink, X, ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react';

interface OccupationTokenProps {
  occupation: Occupation271;
  onOpenInChapter10: (occ: Occupation271) => void;
  onSelectAnother: () => void;
}

export const OccupationToken: React.FC<OccupationTokenProps> = ({
  occupation,
  onOpenInChapter10,
  onSelectAnother
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Active Occupation Token"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 font-sans select-none"
    >
      {/* Expanded Mini Context Card */}
      {expanded && (
        <div className="mb-2 w-72 sm:w-80 bg-[#0b1f3c] text-[#f7faeb] rounded-xl shadow-2xl border border-[#1a3d6d] p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-2 border-b border-[#173662] pb-2 mb-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#d7e63b] tracking-wider font-semibold">
                Tracked Profession
              </span>
              <h4 className="font-serif font-bold text-sm text-[#f7faeb] leading-snug">
                {occupation.occupation_title}
              </h4>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#9bb2cf] hover:text-[#f7faeb] p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
            <div className="bg-[#07162d] border border-[#142f56] p-2 rounded-lg">
              <span className="text-[10px] text-[#9bb2cf] block">AI Exposure</span>
              <span className="font-bold text-[#1e5bb4] text-sm">
                {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
              </span>
              <span className="text-[9px] text-[#9bb2cf] block capitalize">{occupation.ai_exposure_level} tier</span>
            </div>
            <div className="bg-[#07162d] border border-[#142f56] p-2 rounded-lg">
              <span className="text-[10px] text-[#9bb2cf] block">10-Yr US Growth</span>
              <span
                className={`font-bold text-sm ${
                  occupation.projected_growth_pct_2024_2034 >= 3.1
                    ? 'text-[#6dc361]'
                    : occupation.projected_growth_pct_2024_2034 >= 0
                    ? 'text-[#f7faeb]'
                    : 'text-[#ef4444]'
                }`}
              >
                {occupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                {occupation.projected_growth_pct_2024_2034}%
              </span>
              <span className="text-[9px] text-[#9bb2cf] block truncate">{occupation.growth_outlook}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#9bb2cf] mb-3 space-y-1">
            <div className="flex justify-between">
              <span>Median Wage:</span>
              <span className="font-mono font-medium text-[#f7faeb]">${occupation.median_annual_wage_usd.toLocaleString()}/yr</span>
            </div>
            <div className="flex justify-between">
              <span>Distinctive Strength:</span>
              <span className="font-mono font-medium text-[#d7e63b]">{occupation.distinctive_cognitive_strength}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#173662]">
            <button
              onClick={() => {
                setExpanded(false);
                onOpenInChapter10(occupation);
              }}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#1e5bb4] text-[#f7faeb] text-xs font-mono font-semibold hover:bg-[#2563eb] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Work Card</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setExpanded(false);
                onSelectAnother();
              }}
              className="py-1.5 px-2.5 rounded-lg bg-[#0e274c] hover:bg-[#133363] text-[#f7faeb] text-xs font-mono border border-[#193d6d] transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Tiny Subtly Following Token Pill */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#0c2142]/95 text-[#f7faeb] text-xs font-mono rounded-full shadow-lg border border-[#1b3d6d] hover:border-[#d7e63b] transition-all cursor-pointer backdrop-blur-md group"
      >
        <span className="w-2 h-2 rounded-full bg-[#d7e63b] animate-pulse" />
        <span className="font-sans font-semibold truncate max-w-[120px] sm:max-w-[160px] text-[#f7faeb]">
          {occupation.occupation_title}
        </span>
        <span className="px-1.5 py-0.2 rounded bg-[#061329] border border-[#153258] text-[10px] text-[#1e5bb4] font-bold">
          {(occupation.ai_exposure_llm_human * 100).toFixed(0)}%
        </span>
        {expanded ? <ChevronDown className="w-3.5 h-3.5 text-[#9bb2cf]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#9bb2cf]" />}
      </button>
    </aside>
  );
};
