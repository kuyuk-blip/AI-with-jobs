import React from 'react';
import { X, Database, CheckCircle, AlertTriangle, GitCompare, BarChart3, Scale } from 'lucide-react';
import { calculatedKeyFindings } from '../data/researchData';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#040d1c]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl bg-[#071731] text-[#f7faeb] rounded-2xl shadow-2xl border border-[#163560] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#163560] bg-[#0a1f3f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0e2a52] text-[#d7e63b] flex items-center justify-center border border-[#1b3d6d]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#f7faeb]">Methodology, Sampling & Data Integrity</h2>
              <p className="text-xs text-[#9bb2cf]">
                Auditable parameters across 71,913 compensation records & 271 occupations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9bb2cf] hover:text-[#f7faeb] hover:bg-[#0e274c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-[#9bb2cf] max-h-[75vh] overflow-y-auto bg-[#061329]">
          {/* Section 1: The Core Dataset */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#f7faeb] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#1e5bb4]" />
              1. Primary Salary Dataset Profile (n = 71,913)
            </h3>
            <p className="leading-relaxed">
              The project dataset aggregates 71,913 verified compensation points across technology, data, and machine learning positions spanning 2020 through 2025.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0a1f3f] p-3 rounded-lg border border-[#163560] font-mono text-[11px]">
              <div>
                <span className="text-[#9bb2cf] block">Total Records</span>
                <span className="font-bold text-[#f7faeb] text-sm">71,913</span>
              </div>
              <div>
                <span className="text-[#9bb2cf] block">Median Salary</span>
                <span className="font-bold text-[#f7faeb] text-sm">$138,750</span>
              </div>
              <div>
                <span className="text-[#9bb2cf] block">Interquartile Range</span>
                <span className="font-bold text-[#f7faeb] text-sm">$96k – $190k</span>
              </div>
              <div>
                <span className="text-[#9bb2cf] block">2024–25 Share</span>
                <span className="font-bold text-[#6dc361] text-sm">91.7%</span>
              </div>
            </div>
            <div className="p-3 bg-[#0a1e38] border border-[#193a67] rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#d7e63b] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#f7faeb] space-y-0.5">
                <span className="font-bold block text-[#d7e63b]">Temporal Collection Note (D007):</span>
                <span className="text-[#9bb2cf]">
                  91.7% of all dataset records were collected during 2024–2025. Raw record count increases between 2020 and 2025 reflect collection expansion, NOT actual aggregate job market growth. All temporal comparisons in this platform rely on internal percentage shares and normalized distributions.
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Adjusted Regression Model */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#f7faeb] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#d7e63b]" />
              2. The Adjusted Salary Regression Model (+9.6% finding)
            </h3>
            <p className="leading-relaxed">
              To evaluate whether AI/ML specializations carry an independent wage premium beyond classic software engineering, we analyzed 39,808 classified full-time 2024–2025 records using a multivariable log-linear Mincerian specification:
            </p>
            <div className="bg-[#040e20] text-[#d7e63b] border border-[#142e53] p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
              ln(Salary_USD) = β₀ + β₁(AI_Role) + β₂(Experience) + β₃(Year) + β₄(Country) + β₅(Remote_Mode) + β₆(Company_Size) + ε
            </div>
            <div className="bg-[#0a1f3f] p-3.5 rounded-lg border border-[#163560] space-y-2">
              <div className="flex items-center justify-between border-b border-[#163560] pb-2">
                <span className="font-bold text-[#f7faeb]">Estimated Coefficient (β₁):</span>
                <span className="font-bold font-mono text-[#6dc361] text-sm">+9.6% (p &lt; 0.001)</span>
              </div>
              <p className="text-[11px] text-[#9bb2cf] leading-relaxed">
                <strong className="text-[#f7faeb]">Strict Scientific Caveat (Claim D004):</strong> This estimate indicates an <em>adjusted observational association</em>. It does NOT prove that acquiring AI skills causes a 9.6% compensation raise. Omitted factors such as individual problem-solving talent, tier-1 company selection effects, and unobserved skill depth account for a major portion of observed compensation variations.
              </p>
            </div>
          </div>

          {/* Section 3: 271 Occupations Exposure Analysis */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#f7faeb] flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-[#6dc361]" />
              3. Occupational AI Exposure vs Projected Job Growth
            </h3>
            <p className="leading-relaxed">
              Evaluating 271 distinct occupations mapped to US Bureau of Labor Statistics (BLS) 2024–2034 projection data and O*NET cognitive ability ratings:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#9bb2cf]">
              <li>
                <strong className="text-[#f7faeb]">Correlation r = {calculatedKeyFindings.correlation_exposure_vs_projected_growth.toFixed(3)}</strong>: The correlation between AI exposure and 10-year projected employment growth is essentially zero. AI exposure is an indicator of task interface, not a forecast of job destruction.
              </li>
              <li>
                <strong className="text-[#6dc361]">{calculatedKeyFindings.high_exposure_positive_growth_share_pct}% of high-exposure occupations</strong> are projected by the BLS to grow over the decade, with {calculatedKeyFindings.high_exposure_above_baseline_share_pct}% growing faster than the 3.1% all-occupation baseline.
              </li>
              <li>
                <strong className="text-[#f7faeb]">Correlation with verbal ability (r = +{calculatedKeyFindings.correlation_exposure_vs_verbal_ability})</strong> vs <strong className="text-[#f7faeb]">spatial ability (r = {calculatedKeyFindings.correlation_exposure_vs_spatial_ability})</strong>: Current LLMs interact primarily with language-dense knowledge synthesis rather than physical-spatial execution.
              </li>
            </ul>
          </div>

          {/* Section 4: Geographic Representation & India Guardrail */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#f7faeb] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#d7e63b]" />
              4. Geographic Scope & India Research Guardrail (D006)
            </h3>
            <div className="p-3.5 bg-[#0a1f3f] border border-[#163560] rounded-lg space-y-2">
              <p className="leading-relaxed">
                The primary dataset is geographically skewed: <strong className="text-[#f7faeb]">83.6% of records represent US residence</strong>, with Western Europe comprising 12.1%, and India representing only <strong className="text-[#f7faeb]">0.3% (229 records)</strong>.
              </p>
              <div className="p-2.5 bg-[#28131d]/60 border border-[#6b213b] rounded text-[11px] text-[#fed7d7] font-medium">
                <strong className="text-[#f87171]">Enforced Platform Rule:</strong> Under no circumstances do we draw generalized conclusions about Indian tech wages from the project dataset. All insights regarding India (Chapter 9) are strictly drawn from official research by the <strong>International Monetary Fund (IMF 2025)</strong> and <strong>NASSCOM (2024–2026)</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#163560] bg-[#0a1f3f] flex items-center justify-between">
          <span className="text-[11px] text-[#9bb2cf]">Methodological specification compliant with reproducible research standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1e5bb4] hover:bg-[#2563eb] text-[#f7faeb] font-semibold text-xs cursor-pointer transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
