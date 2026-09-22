import React, { useState, useMemo } from 'react';
import { Occupation271, occupations271 } from '../../data/occupations271';
import { EvidenceBadge } from '../EvidenceBadge';
import { Search, ArrowUpDown, Filter, ChevronRight, Check, Sparkles, Scale, Info } from 'lucide-react';

interface Chapter10Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

export const Chapter10YourProfession: React.FC<Chapter10Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareOccupation, setCompareOccupation] = useState<Occupation271>(
    occupations271.find((o) => o.soc_code === '29-1141') || occupations271[1] // Registered Nurses default
  );

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    occupations271.forEach((o) => set.add(o.job_category));
    return Array.from(set).sort();
  }, []);

  // Filtered occupations
  const filteredList = useMemo(() => {
    return occupations271.filter((occ) => {
      const matchesCategory = selectedCategory === 'all' || occ.job_category === selectedCategory;
      const matchesSearch =
        occ.occupation_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.soc_code.includes(searchQuery) ||
        occ.distinctive_cognitive_strength.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <article id="ch10_your_profession" className="scroll-mt-12 py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">10</span>
            <span>YOUR PROFESSION.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            Find where your work sits in the atlas.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            Search across all 271 verified occupations. Inspect detailed work cards, test cognitive demands, examine the 3-lens evaluation gap, or compare two roles head-to-head.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#0b1f3c] p-4 rounded-2xl border border-[#163560] space-y-3 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by occupation title, SOC code, or skill..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#081a36] text-[#f7faeb] placeholder-[#5f7d9f] rounded-xl border border-[#163560] focus:outline-none focus:border-[#1e5bb4]"
              />
              <Search className="w-4 h-4 text-[#5f7d9f] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 text-xs bg-[#081a36] rounded-xl border border-[#163560] text-[#f7faeb] focus:outline-none focus:border-[#1e5bb4] cursor-pointer"
            >
              <option value="all">All Categories ({occupations271.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-2 text-xs font-mono rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                compareMode
                  ? 'bg-[#1e5bb4] text-[#f7faeb] border-[#2a75e0] font-semibold'
                  : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:text-[#f7faeb] hover:bg-[#0c2548]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{compareMode ? 'Comparing 2 Jobs' : 'Compare 2 Jobs'}</span>
            </button>
          </div>

          {/* Quick Result Chips (up to 8 if searching) */}
          {searchQuery && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[#9bb2cf] mr-1">Matching:</span>
              {filteredList.slice(0, 8).map((occ) => (
                <button
                  key={occ.soc_code}
                  onClick={() => onSelectOccupation(occ)}
                  className={`px-2 py-0.5 rounded text-[11px] font-sans border transition-colors cursor-pointer ${
                    activeOccupation.soc_code === occ.soc_code
                      ? 'bg-[#1e5bb4] text-[#f7faeb] border-[#2a75e0]'
                      : 'bg-[#081a36] text-[#9bb2cf] border-[#163560] hover:text-[#f7faeb]'
                  }`}
                >
                  {occ.occupation_title}
                </button>
              ))}
              {filteredList.length > 8 && (
                <span className="text-[11px] font-mono text-[#9bb2cf]">
                  +{filteredList.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* WORK CARD DISPLAY: SINGLE OR SIDE-BY-SIDE COMPARE */}
        <div className={`grid gap-6 ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Card A: Active Occupation */}
          <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#163560] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#9bb2cf]">
                    {activeOccupation.job_category}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#081a36] border border-[#163560] text-[#9bb2cf]">
                    SOC {activeOccupation.soc_code}
                  </span>
                  {compareMode && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e5bb4] text-[#f7faeb] font-bold">
                      Job A
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7faeb] mt-1">
                  {activeOccupation.occupation_title}
                </h3>
                <span className="text-xs text-[#9bb2cf] mt-0.5 block">
                  Education Required: <strong className="text-[#f7faeb]">{activeOccupation.education_required}</strong>
                </span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">AI Exposure</span>
                <span className="text-xl font-bold text-[#6dc361]">
                  {(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-[#9bb2cf] block capitalize">
                  {activeOccupation.ai_exposure_level} tier
                </span>
              </div>

              <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">10-Yr US Growth</span>
                <span
                  className={`text-xl font-bold ${
                    activeOccupation.projected_growth_pct_2024_2034 >= 3.1
                      ? 'text-[#6dc361]'
                      : activeOccupation.projected_growth_pct_2024_2034 >= 0
                      ? 'text-[#f7faeb]'
                      : 'text-[#f59e0b]'
                  }`}
                >
                  {activeOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                  {activeOccupation.projected_growth_pct_2024_2034}%
                </span>
                <span className="text-[10px] text-[#9bb2cf] block truncate">
                  {activeOccupation.growth_outlook}
                </span>
              </div>

              <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Median US Wage</span>
                <span className="text-xl font-bold text-[#f7faeb]">
                  ${activeOccupation.median_annual_wage_usd.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#9bb2cf] block">per year (BLS)</span>
              </div>

              <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Employment (2024)</span>
                <span className="text-xl font-bold text-[#f7faeb]">
                  {activeOccupation.employment_2024.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#9bb2cf] block">workers in US</span>
              </div>
            </div>

            {/* Cognitive Profile & Strength */}
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#f7faeb] uppercase">
                  Distinctive Cognitive Strength
                </span>
                <span className="font-mono text-xs font-bold text-[#d7e63b]">
                  {activeOccupation.distinctive_cognitive_strength}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#9bb2cf]">
                <div>
                  <span className="text-[#5f7d9f] block text-[9px]">Verbal</span>
                  <span>{activeOccupation.verbal_ability.toFixed(1)} / 5.0</span>
                </div>
                <div>
                  <span className="text-[#5f7d9f] block text-[9px]">Reasoning</span>
                  <span>{activeOccupation.reasoning_ability.toFixed(1)} / 5.0</span>
                </div>
                <div>
                  <span className="text-[#5f7d9f] block text-[9px]">Quantitative</span>
                  <span>{activeOccupation.quantitative_ability.toFixed(1)} / 5.0</span>
                </div>
                <div>
                  <span className="text-[#5f7d9f] block text-[9px]">Spatial</span>
                  <span>{activeOccupation.spatial_ability.toFixed(1)} / 5.0</span>
                </div>
              </div>
            </div>

            {/* 3 Lenses Breakdown for this occupation */}
            <div className="p-4 bg-[#061329] rounded-xl border border-[#142e53] text-xs space-y-2 font-mono">
              <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">
                Three Measurement Lenses
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[#9bb2cf] text-[10px] block">Human Expert</span>
                  <span className="font-bold text-[#6dc361]">
                    {(activeOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-[#9bb2cf] text-[10px] block">GPT-4 Rubric</span>
                  <span className="font-bold text-[#38bdf8]">
                    {(activeOccupation.ai_exposure_llm_gpt4 * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-[#9bb2cf] text-[10px] block">AIOE Z-Score</span>
                  <span className="font-bold text-[#f59e0b]">
                    {activeOccupation.ai_exposure_aioe > 0
                      ? `+${activeOccupation.ai_exposure_aioe.toFixed(2)}`
                      : activeOccupation.ai_exposure_aioe.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Comparison Occupation (If Compare Mode Active) */}
          {compareMode && (
            <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#163560] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#9bb2cf]">
                      {compareOccupation.job_category}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#081a36] border border-[#163560] text-[#9bb2cf]">
                      SOC {compareOccupation.soc_code}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f59e0b] text-black font-bold">
                      Job B
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7faeb] mt-1">
                    {compareOccupation.occupation_title}
                  </h3>
                  <span className="text-xs text-[#9bb2cf] mt-0.5 block">
                    Education Required: <strong className="text-[#f7faeb]">{compareOccupation.education_required}</strong>
                  </span>
                </div>

                {/* Job B Selector */}
                <select
                  value={compareOccupation.soc_code}
                  onChange={(e) => {
                    const found = occupations271.find((o) => o.soc_code === e.target.value);
                    if (found) setCompareOccupation(found);
                  }}
                  className="py-1 px-2 text-xs bg-[#081a36] border border-[#163560] rounded-lg font-mono text-[#f7faeb] cursor-pointer"
                >
                  {occupations271.map((o) => (
                    <option key={o.soc_code} value={o.soc_code}>
                      {o.occupation_title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">AI Exposure</span>
                  <span className="text-xl font-bold text-[#6dc361]">
                    {(compareOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block capitalize">
                    {compareOccupation.ai_exposure_level} tier
                  </span>
                </div>

                <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">10-Yr US Growth</span>
                  <span
                    className={`text-xl font-bold ${
                      compareOccupation.projected_growth_pct_2024_2034 >= 3.1
                        ? 'text-[#6dc361]'
                        : compareOccupation.projected_growth_pct_2024_2034 >= 0
                        ? 'text-[#f7faeb]'
                        : 'text-[#f59e0b]'
                    }`}
                  >
                    {compareOccupation.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                    {compareOccupation.projected_growth_pct_2024_2034}%
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block truncate">
                    {compareOccupation.growth_outlook}
                  </span>
                </div>

                <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Median US Wage</span>
                  <span className="text-xl font-bold text-[#f7faeb]">
                    ${compareOccupation.median_annual_wage_usd.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">per year (BLS)</span>
                </div>

                <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                  <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Employment (2024)</span>
                  <span className="text-xl font-bold text-[#f7faeb]">
                    {compareOccupation.employment_2024.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#9bb2cf] block">workers in US</span>
                </div>
              </div>

              {/* Cognitive Profile & Strength */}
              <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#f7faeb] uppercase">
                    Distinctive Cognitive Strength
                  </span>
                  <span className="font-mono text-xs font-bold text-[#f59e0b]">
                    {compareOccupation.distinctive_cognitive_strength}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#9bb2cf]">
                  <div>
                    <span className="text-[#5f7d9f] block text-[9px]">Verbal</span>
                    <span>{compareOccupation.verbal_ability.toFixed(1)} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-[#5f7d9f] block text-[9px]">Reasoning</span>
                    <span>{compareOccupation.reasoning_ability.toFixed(1)} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-[#5f7d9f] block text-[9px]">Quantitative</span>
                    <span>{compareOccupation.quantitative_ability.toFixed(1)} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-[#5f7d9f] block text-[9px]">Spatial</span>
                    <span>{compareOccupation.spatial_ability.toFixed(1)} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* 3 Lenses Breakdown for comparison occupation */}
              <div className="p-4 bg-[#061329] rounded-xl border border-[#142e53] text-xs space-y-2 font-mono">
                <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">
                  Three Measurement Lenses
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[#9bb2cf] text-[10px] block">Human Expert</span>
                    <span className="font-bold text-[#6dc361]">
                      {(compareOccupation.ai_exposure_llm_human * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9bb2cf] text-[10px] block">GPT-4 Rubric</span>
                    <span className="font-bold text-[#38bdf8]">
                      {(compareOccupation.ai_exposure_llm_gpt4 * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9bb2cf] text-[10px] block">AIOE Z-Score</span>
                    <span className="font-bold text-[#f59e0b]">
                      {compareOccupation.ai_exposure_aioe > 0
                        ? `+${compareOccupation.ai_exposure_aioe.toFixed(2)}`
                        : compareOccupation.ai_exposure_aioe.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CLOSING EDITORIAL REFLECTION */}
        <div className="mt-16 pt-16 border-t border-[#153258] text-center max-w-3xl mx-auto space-y-6">
          <div className="w-10 h-10 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] mx-auto flex items-center justify-center font-serif text-lg font-bold">
            ✦
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7faeb] leading-tight">
            “AI does not change every job the same way.”
          </h3>

          <p className="text-lg sm:text-xl font-serif italic text-[#d7e63b] leading-relaxed">
            “If artificial intelligence changes what you do, what part of you becomes more valuable?”
          </p>

          <p className="text-sm text-[#9bb2cf] leading-relaxed max-w-xl mx-auto">
            Not the mechanical synthesis. Not the boilerplate phrasing. What remains irreplaceable is your context, your verified taste, your courage to take responsibility, and the human relationships you nurture along the way.
          </p>
        </div>
      </div>
    </article>
  );
};
