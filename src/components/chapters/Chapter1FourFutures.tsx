import React, { useState, useMemo } from 'react';
import { occupations271, Occupation271 } from '../../data/occupations271';
import { calculatedKeyFindings } from '../../data/researchData';
import { EvidenceBadge } from '../EvidenceBadge';
import { Filter, Search, Info, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface Chapter1Props {
  activeOccupation: Occupation271;
  onSelectOccupation: (occ: Occupation271) => void;
  onOpenEvidence: (id: string) => void;
}

export const Chapter1FourFutures: React.FC<Chapter1Props> = ({
  activeOccupation,
  onSelectOccupation,
  onOpenEvidence
}) => {
  const [quadrantFilter, setQuadrantFilter] = useState<string>('all');
  const [hoveredOcc, setHoveredOcc] = useState<Occupation271 | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // SVG viewport dimensions
  const svgWidth = 800;
  const svgHeight = 480;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };

  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  // Scales
  // X: AI exposure (0 to 0.9)
  const minX = 0;
  const maxX = 0.9;
  const scaleX = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * innerWidth;

  // Y: Growth % (-18% to +35%)
  const minY = -18;
  const maxY = 35;
  const scaleY = (val: number) => padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  // Employment radius (sqrt scale)
  const maxEmp = 3400000;
  const scaleRadius = (emp: number) => {
    const r = Math.sqrt(emp / maxEmp) * 14;
    return Math.max(3, Math.min(18, r));
  };

  const filteredOccupations = useMemo(() => {
    return occupations271.filter((occ) => {
      const matchesSearch = occ.occupation_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.job_category.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (quadrantFilter === 'all') return true;
      if (quadrantFilter === 'high_growing') return occ.ai_exposure_level === 'High' && occ.projected_growth_pct_2024_2034 > 0;
      if (quadrantFilter === 'high_declining') return occ.ai_exposure_level === 'High' && occ.projected_growth_pct_2024_2034 < 0;
      if (quadrantFilter === 'low_growing') return (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') && occ.projected_growth_pct_2024_2034 > 0;
      if (quadrantFilter === 'low_declining') return (occ.ai_exposure_level === 'Low' || occ.ai_exposure_level === 'Medium') && occ.projected_growth_pct_2024_2034 < 0;
      return true;
    });
  }, [quadrantFilter, searchQuery]);

  const medianX = scaleX(calculatedKeyFindings.dataset_median_exposure);
  const baselineY = scaleY(calculatedKeyFindings.bls_baseline_growth);
  const zeroY = scaleY(0);

  const getQuadrantColor = (occ: Occupation271) => {
    const isHigh = occ.ai_exposure_llm_human >= calculatedKeyFindings.dataset_median_exposure;
    const isGrow = occ.projected_growth_pct_2024_2034 >= 0;

    if (isHigh && isGrow) return '#1e5bb4'; // cobalt blue
    if (isHigh && !isGrow) return '#f87171'; // soft coral/red
    if (!isHigh && isGrow) return '#6dc361'; // green
    return '#5f7d9f'; // muted slate
  };

  return (
    <article id="ch01_four_futures" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">01</span>
            <span>271 JOBS. FOUR DIFFERENT FUTURES.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            Exposure barely predicts whether a profession grows or declines.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            Plotting all 271 occupations reveals an empirical correlation of{' '}
            <strong className="text-[#d7e63b] font-mono bg-[#081a36] border border-[#1b3d6d] px-1.5 py-0.5 rounded">r = -0.094</strong>.
            In statistics, that represents almost no simple relationship. An AI-exposed role can easily expand, while a low-exposure role can shrink.
          </p>
        </header>

        {/* Four Quadrant Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <button
            onClick={() => setQuadrantFilter('high_growing')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'high_growing'
                ? 'bg-[#0d264a] border-[#1e5bb4] ring-2 ring-[#1e5bb4]/40 shadow-lg'
                : 'bg-[#0b1f3c] border-[#163560] hover:border-[#1e5bb4]'
            }`}
          >
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">High Exposure + Growth</span>
            <div className="text-xl font-bold text-[#1e5bb4] mt-0.5">72 jobs (80%)</div>
            <span className="text-[11px] text-[#9bb2cf]">47 beat 3.1% BLS average</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('high_declining')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'high_declining'
                ? 'bg-[#28131d] border-[#f87171] ring-2 ring-[#f87171]/40 shadow-lg'
                : 'bg-[#0b1f3c] border-[#163560] hover:border-[#f87171]'
            }`}
          >
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">High Exposure + Decline</span>
            <div className="text-xl font-bold text-[#f87171] mt-0.5">13 jobs (14%)</div>
            <span className="text-[11px] text-[#9bb2cf]">e.g. Survey researchers, CSRs</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('low_growing')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'low_growing'
                ? 'bg-[#0e2a22] border-[#6dc361] ring-2 ring-[#6dc361]/40 shadow-lg'
                : 'bg-[#0b1f3c] border-[#163560] hover:border-[#6dc361]'
            }`}
          >
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">Low Exposure + Growth</span>
            <div className="text-xl font-bold text-[#6dc361] mt-0.5">105 jobs</div>
            <span className="text-[11px] text-[#9bb2cf]">Physical care, health, trades</span>
          </button>

          <button
            onClick={() => setQuadrantFilter('low_declining')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              quadrantFilter === 'low_declining'
                ? 'bg-[#0d1e34] border-[#9bb2cf] ring-2 ring-[#9bb2cf]/40 shadow-lg'
                : 'bg-[#0b1f3c] border-[#163560] hover:border-[#9bb2cf]'
            }`}
          >
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">Low Exposure + Decline</span>
            <div className="text-xl font-bold text-[#f7faeb] mt-0.5">24 jobs</div>
            <span className="text-[11px] text-[#9bb2cf]">Mechanization, declining legacy</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a1f3f] p-3 rounded-xl border border-[#163560]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#9bb2cf]">Showing:</span>
            <button
              onClick={() => setQuadrantFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                quadrantFilter === 'all'
                  ? 'bg-[#d7e63b] text-[#061329] font-bold'
                  : 'bg-[#061329] text-[#9bb2cf] hover:bg-[#0e2a52] hover:text-[#f7faeb] border border-[#163560]'
              }`}
            >
              All 271 ({occupations271.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search occupation..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#061329] text-[#f7faeb] rounded-lg border border-[#163560] focus:outline-hidden focus:border-[#1e5bb4] placeholder-[#5f7d9f]"
            />
            <Search className="w-3.5 h-3.5 text-[#5f7d9f] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Interactive Scatterplot Canvas */}
        <div className="bg-[#0b1f3c] p-4 sm:p-6 rounded-2xl border border-[#163560] shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#9bb2cf] mb-2 font-mono">
            <span>Y-AXIS: Projected 10-Year Growth Rate (% 2024–2034)</span>
            <span>Bubble size = 2024 Employment</span>
          </div>

          <div className="overflow-x-auto bg-[#071731] p-3 rounded-xl border border-[#142e53]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[640px] select-none"
            >
              {/* Gridlines */}
              {[-10, 0, 10, 20, 30].map((yVal) => (
                <g key={yVal}>
                  <line
                    x1={padding.left}
                    y1={scaleY(yVal)}
                    x2={svgWidth - padding.right}
                    y2={scaleY(yVal)}
                    stroke="#142e53"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={scaleY(yVal) + 4}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-[#5f7d9f]"
                  >
                    {yVal > 0 ? `+${yVal}%` : `${yVal}%`}
                  </text>
                </g>
              ))}

              {/* Zero line */}
              <line
                x1={padding.left}
                y1={zeroY}
                x2={svgWidth - padding.right}
                y2={zeroY}
                stroke="#1b3d6d"
                strokeWidth={1.5}
              />

              {/* BLS baseline average growth line (+3.1%) */}
              <line
                x1={padding.left}
                y1={baselineY}
                x2={svgWidth - padding.right}
                y2={baselineY}
                stroke="#6dc361"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={svgWidth - padding.right}
                y={baselineY - 5}
                textAnchor="end"
                className="text-[10px] font-mono fill-[#6dc361] font-semibold"
              >
                BLS Baseline (+3.1%)
              </text>

              {/* Dataset Median Exposure Reference Line */}
              <line
                x1={medianX}
                y1={padding.top}
                x2={medianX}
                y2={svgHeight - padding.bottom}
                stroke="#d7e63b"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <text
                x={medianX + 6}
                y={padding.top + 14}
                className="text-[10px] font-mono fill-[#d7e63b] font-medium"
              >
                Dataset Median (0.37) — not a risk threshold
              </text>

              {/* X Axis ticks */}
              {[0.1, 0.3, 0.5, 0.7].map((xVal) => (
                <g key={xVal}>
                  <line
                    x1={scaleX(xVal)}
                    y1={svgHeight - padding.bottom}
                    x2={scaleX(xVal)}
                    y2={padding.top}
                    stroke="#142e53"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={scaleX(xVal)}
                    y={svgHeight - padding.bottom + 18}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-[#5f7d9f]"
                  >
                    {(xVal * 100).toFixed(0)}%
                  </text>
                </g>
              ))}

              {/* X Axis Label */}
              <text
                x={svgWidth / 2}
                y={svgHeight - 15}
                textAnchor="middle"
                className="text-xs font-mono fill-[#9bb2cf]"
              >
                X-AXIS: AI Task Exposure Index (0.00 to 1.00)
              </text>

              {/* Occupation Bubbles */}
              {filteredOccupations.map((occ) => {
                const cx = scaleX(occ.ai_exposure_llm_human);
                const cy = scaleY(occ.projected_growth_pct_2024_2034);
                const r = scaleRadius(occ.employment_2024);
                const isSelected = activeOccupation.soc_code === occ.soc_code;
                const isHovered = hoveredOcc?.soc_code === occ.soc_code;
                const color = getQuadrantColor(occ);

                return (
                  <circle
                    key={occ.soc_code}
                    cx={cx}
                    cy={cy}
                    r={isSelected ? r + 3 : isHovered ? r + 2 : r}
                    fill={color}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.9 : 0.65}
                    stroke={isSelected ? '#d7e63b' : isHovered ? '#ffffff' : '#071731'}
                    strokeWidth={isSelected ? 2.5 : 1}
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredOcc(occ)}
                    onMouseLeave={() => setHoveredOcc(null)}
                    onClick={() => onSelectOccupation(occ)}
                  />
                );
              })}

              {/* Selected / Hovered Callout Line */}
              {(hoveredOcc || activeOccupation) && (
                <g pointerEvents="none">
                  {(() => {
                    const target = hoveredOcc || activeOccupation;
                    const cx = scaleX(target.ai_exposure_llm_human);
                    const cy = scaleY(target.projected_growth_pct_2024_2034);
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={scaleRadius(target.employment_2024) + 6}
                        fill="none"
                        stroke="#d7e63b"
                        strokeWidth={1.5}
                        strokeDasharray="2 2"
                        className="animate-spin origin-center"
                      />
                    );
                  })()}
                </g>
              )}
            </svg>
          </div>

          {/* Active / Hovered Occupation Inspection Strip */}
          <div className="mt-4 p-4 bg-[#0a1f3f] rounded-xl border border-[#163560] flex flex-wrap items-center justify-between gap-4">
            {(() => {
              const occ = hoveredOcc || activeOccupation;
              return (
                <>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9bb2cf]">
                        {occ.job_category}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#071731] text-[#d7e63b] border border-[#142e53]">
                        SOC {occ.soc_code}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#f7faeb]">
                      {occ.occupation_title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                    <div>
                      <span className="text-[#9bb2cf] block text-[10px]">AI Exposure</span>
                      <span className="font-bold text-[#d7e63b]">
                        {(occ.ai_exposure_llm_human * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9bb2cf] block text-[10px]">10-Yr Growth</span>
                      <span
                        className={`font-bold ${
                          occ.projected_growth_pct_2024_2034 >= 3.1
                            ? 'text-[#6dc361]'
                            : occ.projected_growth_pct_2024_2034 >= 0
                            ? 'text-[#f7faeb]'
                            : 'text-[#f87171]'
                        }`}
                      >
                        {occ.projected_growth_pct_2024_2034 > 0 ? '+' : ''}
                        {occ.projected_growth_pct_2024_2034}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9bb2cf] block text-[10px]">Median Wage</span>
                      <span className="font-bold text-[#f7faeb]">
                        ${occ.median_annual_wage_usd.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9bb2cf] block text-[10px]">2024 Employment</span>
                      <span className="font-bold text-[#f7faeb]">
                        {occ.employment_2024.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectOccupation(occ)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1e5bb4] text-[#f7faeb] font-semibold text-xs hover:bg-[#2563eb] transition-colors cursor-pointer"
                    >
                      Track this job
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Footnote & Evidence Peel */}
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#9bb2cf]">
          <div className="flex items-center gap-2">
            <span>Primary dataset sources: BLS 2024–2034 projections + Eloundou et al. (OpenAI / UPenn).</span>
            <EvidenceBadge id="C001" onClick={onOpenEvidence} labelOverride="ILO · Task Exposure" />
          </div>
          <span className="font-mono text-[11px] text-[#5f7d9f]">Click any dot to make it the active tracked profession</span>
        </footer>
      </div>
    </article>
  );
};
