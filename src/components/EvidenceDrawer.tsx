import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, Info, Search, Filter, BookOpen } from 'lucide-react';
import { claims, sources } from '../data/researchData';
import { Claim, Source } from '../types';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelectId: (id: string) => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  selectedId,
  onSelectId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChapter, setFilterChapter] = useState<string>('all');

  if (!isOpen) return null;

  // Selected item data
  const selectedClaim: Claim | undefined = selectedId ? claims[selectedId] : undefined;
  const selectedSource: Source | undefined = selectedClaim
    ? sources.find((s) => s.source_id === selectedClaim.source_id)
    : sources.find((s) => s.source_id === selectedId);

  const claimList = Object.values(claims);

  const filteredClaims = claimList.filter((c) => {
    const matchesSearch =
      c.claim_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.safe_wording.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caveat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChapter = filterChapter === 'all' || c.chapter === filterChapter;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#040d1c]/80 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#071731] text-[#f7faeb] h-full shadow-2xl flex flex-col border-l border-[#163560] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#163560] bg-[#0a1f3f] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0e2a52] text-[#d7e63b] flex items-center justify-center font-bold border border-[#1b3d6d]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#f7faeb]">Evidence & Research Audit Drawer</h2>
              <p className="text-xs text-[#9bb2cf]">Atomic Claims, Methodologies & Factual Caveats</p>
            </div>
          </div>
          <button
            id="close-evidence-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9bb2cf] hover:text-[#f7faeb] hover:bg-[#0e274c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: detail view or index */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#061329]">
          {selectedClaim || selectedSource ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Back to list */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectId('')}
                  className="text-xs text-[#d7e63b] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  ← Back to full claim database
                </button>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-[#0c2242] text-[#9bb2cf] border border-[#193d6d]">
                  {selectedClaim ? selectedClaim.claim_id : selectedSource?.source_id}
                </span>
              </div>

              {/* Main Claim Title */}
              {selectedClaim && (
                <div className="border-l-4 border-[#1e5bb4] pl-4 py-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#d7e63b] block mb-1">
                    {selectedClaim.evidence_type.replace(/_/g, ' ')}
                  </span>
                  <p className="text-lg font-semibold text-[#f7faeb] leading-snug font-serif">
                    "{selectedClaim.claim}"
                  </p>
                </div>
              )}

              {/* Verified Value & Confidence */}
              {selectedClaim && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0a1f3f] p-4 rounded-xl border border-[#163560] text-xs">
                  <div>
                    <span className="text-[#9bb2cf] block">Stated Metric</span>
                    <span className="font-semibold text-[#f7faeb] text-sm font-mono">
                      {typeof selectedClaim.value === 'object'
                        ? JSON.stringify(selectedClaim.value)
                        : `${selectedClaim.value} ${selectedClaim.unit || ''}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9bb2cf] block">Target Population</span>
                    <span className="font-semibold text-[#f7faeb]">{selectedClaim.population}</span>
                  </div>
                  <div>
                    <span className="text-[#9bb2cf] block">Data Period</span>
                    <span className="font-semibold text-[#f7faeb]">{selectedClaim.period}</span>
                  </div>
                  <div>
                    <span className="text-[#9bb2cf] block">Evidence Confidence</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#6dc361]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {selectedClaim.confidence.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#9bb2cf] block">Chapter Context</span>
                    <span className="font-semibold text-[#f7faeb] capitalize">
                      {selectedClaim.chapter.replace('_', ': ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Safe Wording Requirement */}
              {selectedClaim && (
                <div className="p-4 rounded-xl bg-[#091e3b] border border-[#1d4377] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#d7e63b] text-xs font-bold uppercase tracking-wider">
                    <Info className="w-4 h-4 text-[#d7e63b]" />
                    Mandatory Safe Wording
                  </div>
                  <p className="text-xs text-[#f7faeb] leading-relaxed font-medium">
                    {selectedClaim.safe_wording}
                  </p>
                </div>
              )}

              {/* Methodological Caveat */}
              {selectedClaim && (
                <div className="p-4 rounded-xl bg-[#28131d]/60 border border-[#6b213b] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#f87171] text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#f87171]" />
                    Methodological Caveat & Anti-Hype Guardrail
                  </div>
                  <p className="text-xs text-[#fed7d7] leading-relaxed font-medium">
                    {selectedClaim.caveat}
                  </p>
                </div>
              )}

              {/* Source Details */}
              {selectedSource && (
                <div className="p-4 rounded-xl border border-[#163560] bg-[#0a1f3f] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#f7faeb] flex items-center gap-1.5">
                      <span className="text-[#d7e63b]">[{selectedSource.source_id}]</span>
                      {selectedSource.organization}
                    </h3>
                    <span className="text-xs text-[#9bb2cf]">{selectedSource.date}</span>
                  </div>
                  <p className="text-xs font-medium text-[#f7faeb]">{selectedSource.title}</p>
                  <div className="text-xs text-[#9bb2cf] bg-[#061329] p-2.5 rounded border border-[#153258] space-y-1">
                    <span className="font-bold text-[#d7e63b] block">Methodology & Sampling:</span>
                    <p>{selectedSource.method_note}</p>
                  </div>
                  {selectedSource.url && selectedSource.url.startsWith('http') && (
                    <a
                      href={selectedSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e5bb4] hover:text-[#38bdf8] pt-1"
                    >
                      <span>Read original publication / study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Claim Explorer Search/Filter list */
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#9bb2cf] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search claims, keywords, sources, or caveats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#081a36] text-[#f7faeb] border border-[#163560] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1e5bb4] placeholder-[#5f7d9f]"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <Filter className="w-3 h-3 text-[#9bb2cf] shrink-0" />
                  {['all', '01_fear', '02_boost', '03_value_gap', '04_first_rung', '05_new_advantage', '06_who_gets_value'].map(
                    (ch) => (
                      <button
                        key={ch}
                        onClick={() => setFilterChapter(ch)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          filterChapter === ch
                            ? 'bg-[#d7e63b] text-[#061329] font-bold'
                            : 'bg-[#0a1f3f] text-[#9bb2cf] hover:bg-[#0e2a52] hover:text-[#f7faeb] border border-[#153258]'
                        }`}
                      >
                        {ch === 'all' ? 'All Chapters' : ch.replace('_', ' ')}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs text-[#9bb2cf]">
                  Showing {filteredClaims.length} verified research claims across external peer-reviewed literature and curated datasets.
                </p>
                {filteredClaims.map((item) => (
                  <div
                    key={item.claim_id}
                    onClick={() => onSelectId(item.claim_id)}
                    className="p-3.5 rounded-xl border border-[#163560] bg-[#0a1f3f] hover:border-[#d7e63b]/50 hover:bg-[#0e274c] transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#d7e63b] bg-[#08172f] px-1.5 py-0.5 rounded border border-[#173663]">
                        {item.claim_id}
                      </span>
                      <span className="text-[#9bb2cf] capitalize">{item.chapter.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs font-medium text-[#f7faeb] group-hover:text-[#d7e63b]">
                      {item.claim}
                    </p>
                    <p className="text-[11px] text-[#9bb2cf] line-clamp-1">
                      <span className="font-semibold text-[#d7e63b]">Caveat:</span> {item.caveat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#163560] bg-[#0a1f3f] flex items-center justify-between text-xs text-[#9bb2cf]">
          <span>The Work Observatory · Audit Layer v1.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0e274c] hover:bg-[#143666] text-[#f7faeb] border border-[#193d6d] font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
