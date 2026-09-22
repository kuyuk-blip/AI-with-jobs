import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { AlertCircle, Globe, Users, ShieldAlert, TrendingUp, Sparkles } from 'lucide-react';

interface Chapter9Props {
  onOpenEvidence: (id: string) => void;
}

export const Chapter9IndiaLens: React.FC<Chapter9Props> = ({ onOpenEvidence }) => {
  const [activeSegment, setActiveSegment] = useState<'all' | 'complementary' | 'displacement' | 'low_exp'>('all');

  return (
    <article id="ch09_india_lens" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Mandatory Dataset Audit Limitation Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#2a1a0c] border border-[#523314] text-[#f7faeb] flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
            <span className="font-serif font-bold text-[#f59e0b] block">
              Methodological Disclosure: Geographic Dataset Limitation
            </span>
            <p className="text-[#d6cbbe]">
              The project's underlying 71,913 compensation records are <strong>83.6% US-based</strong> and contain only <strong>0.3% Indian entries</strong>. Applying US task coefficients directly to India would produce misleading conclusions. Therefore, this chapter relies strictly on macroeconomic field research from the <strong>International Monetary Fund (IMF)</strong>, <strong>World Bank</strong>, and <strong>NASSCOM</strong>.
            </p>
          </div>
        </div>

        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">09</span>
            <span>INDIA: SAME TECHNOLOGY, DIFFERENT STARTING POINT.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            The same model lands on a vastly different labor pyramid.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            In advanced economies, 60% of jobs face high AI exposure. In India, the IMF estimates that only <strong className="text-[#f7faeb] font-semibold">26% of employment is highly exposed</strong> — with 14% positioned for AI augmentation and 12% facing acute displacement pressures in routine services.
          </p>
        </header>

        {/* The 100-Worker Labor Pyramid Interactive Grid */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#163560] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                IMF 2024 Macroeconomic Simulation
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f7faeb] mt-0.5">
                The 100-Worker Indian Workforce Field
              </h3>
            </div>
            <EvidenceBadge id="C018" onClick={onOpenEvidence} labelOverride="IMF · India Labor Exposure" />
          </div>

          {/* Segment Filter Toggles */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveSegment('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                activeSegment === 'all'
                  ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border-[#2a75e0]'
                  : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:bg-[#0c2548] hover:text-[#f7faeb]'
              }`}
            >
              All 100 Workers
            </button>
            <button
              onClick={() => setActiveSegment('complementary')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                activeSegment === 'complementary'
                  ? 'bg-[#144835] text-[#6dc361] font-semibold border-[#1e6b50]'
                  : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:bg-[#0c2548] hover:text-[#f7faeb]'
              }`}
            >
              14% Complementary (AI Assist)
            </button>
            <button
              onClick={() => setActiveSegment('displacement')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                activeSegment === 'displacement'
                  ? 'bg-[#482012] text-[#f97316] font-semibold border-[#75341c]'
                  : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:bg-[#0c2548] hover:text-[#f7faeb]'
              }`}
            >
              12% Displacement Risk (BPO/Data)
            </button>
            <button
              onClick={() => setActiveSegment('low_exp')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                activeSegment === 'low_exp'
                  ? 'bg-[#163560] text-[#9bb2cf] font-semibold border-[#234c85]'
                  : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:bg-[#0c2548] hover:text-[#f7faeb]'
              }`}
            >
              74% Lower Exposure (Agri/Informal)
            </button>
          </div>

          {/* 100-Dot Visual Grid */}
          <div className="p-5 bg-[#081a36] rounded-xl border border-[#163560] space-y-3">
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-2 select-none">
              {Array.from({ length: 100 }).map((_, idx) => {
                let dotType: 'complementary' | 'displacement' | 'low_exp' = 'low_exp';
                if (idx < 14) dotType = 'complementary';
                else if (idx < 26) dotType = 'displacement';

                const isHighlighted =
                  activeSegment === 'all' || activeSegment === dotType;

                let bgColor = '#244063';
                if (dotType === 'complementary') bgColor = '#6dc361';
                if (dotType === 'displacement') bgColor = '#f97316';

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: bgColor,
                      opacity: isHighlighted ? 1 : 0.2
                    }}
                    title={`Worker #${idx + 1}: ${dotType.replace('_', ' ')}`}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-md transition-all hover:scale-125 cursor-pointer shadow-xs"
                  />
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs pt-3 border-t border-[#163560] font-mono text-[#9bb2cf]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#6dc361]" />
                <span>14% High Exp + High Complementarity</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#f97316]" />
                <span>12% High Exp + High Displacement Risk</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#244063]" />
                <span>74% Low Exposure (Agriculture, Physical, Informal)</span>
              </span>
            </div>
          </div>

          {/* Segment Explanation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-1.5">
              <span className="font-mono font-bold text-[#6dc361] block text-sm">14% Complementary</span>
              <p className="text-[#9bb2cf] leading-relaxed">
                Senior developers, engineering architects, financial analysts, and corporate managers who use generative AI as an intellectual multiplier to serve global clients.
              </p>
            </div>
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-1.5">
              <span className="font-mono font-bold text-[#f97316] block text-sm">12% Displacement Risk</span>
              <p className="text-[#9bb2cf] leading-relaxed">
                Back-office operations, basic data labeling, Tier-1 call centers, and routine software testing that face intense price compression from autonomous pipelines.
              </p>
            </div>
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-1.5">
              <span className="font-mono font-bold text-[#9bb2cf] block text-sm">74% Lower Exposure</span>
              <p className="text-[#9bb2cf] leading-relaxed">
                Farming, transportation, local logistics, artisanal manufacturing, and informal daily-wage labor insulated from near-term digital AI algorithms.
              </p>
            </div>
          </div>
        </div>

        {/* World Bank & NASSCOM Macro Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* World Bank WDR 2026 Comparison */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#6dc361] uppercase">
                World Bank (WDR 2026)
              </span>
              <EvidenceBadge id="C019" onClick={onOpenEvidence} labelOverride="World Bank · Developing vs High Income" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
              Automation Risk: 4.5% vs 14.2%
            </h4>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              Developing economies exhibit far lower immediate vulnerability to generative AI replacement (<strong>4.5%</strong> of jobs) compared to high-income nations (<strong>14.2%</strong>), primarily because high-income workforces have a much higher concentration of desk-based clerical labor.
            </p>
          </div>

          {/* NASSCOM Tech Sector Snapshot (Clearly Labeled) */}
          <div className="p-6 rounded-2xl bg-[#081a36] border border-[#163560] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-[#f59e0b] uppercase">
                Tech Sector Only (NASSCOM 2026)
              </span>
              <EvidenceBadge id="C020" onClick={onOpenEvidence} labelOverride="NASSCOM · Tech Ecosystem" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#f7faeb]">
              India's 1.25M+ AI Talent Pool by 2027
            </h4>
            <p className="text-xs text-[#9bb2cf] leading-relaxed">
              <em className="text-[#9bb2cf] font-mono text-[11px] block mb-1">Notice: Applies strictly to the export technology sector, not the broader national economy.</em>
              India’s IT services sector is aggressively retraining: 20–40% of IT workflows incorporate AI pipelines, and AI engineering services are expanding at a 25–35% CAGR.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
