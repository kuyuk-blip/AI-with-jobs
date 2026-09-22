import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Clock, CheckCircle2, AlertTriangle, Sparkles, ChevronRight, UserCheck } from 'lucide-react';

interface Chapter5Props {
  onOpenEvidence: (id: string) => void;
}

interface ProfessionWorkday {
  id: string;
  name: string;
  title: string;
  adoptionStat: string;
  adoptionLabel: string;
  timeImpact: string;
  timeLabel: string;
  evidenceId: string;
  caveat?: string;
  timeline: {
    time: string;
    task: string;
    aiRole: 'assisted' | 'human_core';
    desc: string;
    impact: string;
  }[];
  breakdownStats: { label: string; value: string }[];
}

const WORKDAYS: ProfessionWorkday[] = [
  {
    id: 'teacher',
    name: 'K-12 Teacher',
    title: 'Lesson Differentiation & Form Relief',
    adoptionStat: '60%',
    adoptionLabel: 'K-12 Teachers use AI',
    timeImpact: '5.9 hrs',
    timeLabel: 'saved per week (frequent users)',
    evidenceId: 'C006',
    caveat: 'Only 18% of teachers report receiving formal guidance or training from their school district.',
    breakdownStats: [
      { label: 'Weekly hours saved', value: '5.9h / week' },
      { label: 'Formal school guidance', value: '18% only' },
      { label: 'Weekly active users', value: '41%' }
    ],
    timeline: [
      { time: '07:45 AM', task: 'Lesson plan differentiation', aiRole: 'assisted', desc: 'Drafting 3 reading levels of a primary source history excerpt in 10 minutes.', impact: 'Saves 45 min' },
      { time: '09:00 AM', task: 'Classroom teaching & engagement', aiRole: 'human_core', desc: 'Sensing student boredom, adapting tone, handling emotional outbursts, group discussions.', impact: '100% human' },
      { time: '01:30 PM', task: 'Quiz generation & rubrics', aiRole: 'assisted', desc: 'Generating comprehension checks aligned to state curriculum standards.', impact: 'Saves 30 min' },
      { time: '03:15 PM', task: 'Parent-teacher conference & pastoral care', aiRole: 'human_core', desc: 'Discussing learning challenges with parents, building mutual trust and encouragement.', impact: '100% human' }
    ]
  },
  {
    id: 'physician',
    name: 'Physician / Healthcare',
    title: 'Clinical Notes & Diagnostic Assist',
    adoptionStat: '81%',
    adoptionLabel: 'Physicians use AI (AMA 2026)',
    timeImpact: '28%',
    timeLabel: 'charting & documentation relief',
    evidenceId: 'C007',
    caveat: 'Doctors retain 100% legal malpractice liability for any diagnostic oversight.',
    breakdownStats: [
      { label: 'Research summaries', value: '39% adoption' },
      { label: 'Documentation / EHR', value: '28% adoption' },
      { label: 'Patient message drafts', value: '19% adoption' },
      { label: 'Assistive diagnosis', value: '17% adoption' }
    ],
    timeline: [
      { time: '08:15 AM', task: 'Literature & clinical trial check', aiRole: 'assisted', desc: 'Summarizing recent drug interaction findings for a rare patient condition.', impact: 'Saves 20 min' },
      { time: '10:00 AM', task: 'Patient physical exam & bedside manner', aiRole: 'human_core', desc: 'Physical palpation, reading subtle micro-expressions, addressing chronic pain anxiety.', impact: '100% human' },
      { time: '11:45 AM', task: 'Ambient EHR documentation', aiRole: 'assisted', desc: 'Ambient AI microphone drafts clinical encounter note into electronic health record.', impact: 'Saves 15 min / patient' },
      { time: '03:00 PM', task: 'Complex treatment plan & ethics', aiRole: 'human_core', desc: 'Balancing quality of life with chemotherapy toxicity alongside family.', impact: '100% human' }
    ]
  },
  {
    id: 'designer',
    name: 'Creative / Designer',
    title: '4-Stage Creative River Workflow',
    adoptionStat: '84.8%',
    adoptionLabel: 'Positive sentiment on ideation',
    timeImpact: '57.6%',
    timeLabel: 'use for repetitive background tasks',
    evidenceId: 'C008',
    caveat: 'Vendor-sponsored study (Adobe 2026); treats creative practitioners using proprietary tooling.',
    breakdownStats: [
      { label: 'Ideation sentiment', value: '84.8% positive' },
      { label: 'Background cutout', value: '57.6% adoption' },
      { label: 'Compositing / fills', value: '50.0% adoption' },
      { label: 'Style directing', value: 'Human judgment' }
    ],
    timeline: [
      { time: '09:30 AM', task: 'Stage 1: Ideation & Moodboarding', aiRole: 'assisted', desc: 'Generating 20 visual mood boards exploring lighting and typography concepts.', impact: 'Accelerates brainstorm' },
      { time: '11:00 AM', task: 'Stage 2: Select & Direct (Taste)', aiRole: 'human_core', desc: 'Curating the single direction that authentically reflects brand identity and taste.', impact: '100% human taste' },
      { time: '01:30 PM', task: 'Stage 3: Make & Finish (Mechanical)', aiRole: 'assisted', desc: 'Generative fills, background removal, resolution upscaling, and format exports.', impact: 'Saves 3 hours' },
      { time: '04:00 PM', task: 'Stage 4: Review & Stakeholder alignment', aiRole: 'human_core', desc: 'Presenting to client leadership, defending design intent, negotiating compromises.', impact: '100% human alignment' }
    ]
  },
  {
    id: 'consultant',
    name: 'Professional Services',
    title: 'Legal & Consulting Workflow Acceleration',
    adoptionStat: '40%',
    adoptionLabel: 'Org adoption (up from 22%)',
    timeImpact: '80%+',
    timeLabel: 'active users use it weekly',
    evidenceId: 'C009',
    caveat: 'Thomson Reuters: while 40% of organizations use AI, only 18% formally measure ROI.',
    breakdownStats: [
      { label: 'Org adoption rate', value: '40% (2026)' },
      { label: 'Weekly usage frequency', value: '80%+' },
      { label: 'Organizations tracking ROI', value: '18% only' }
    ],
    timeline: [
      { time: '08:30 AM', task: 'Contract clause extraction', aiRole: 'assisted', desc: 'Parsing 300-page vendor agreement for indemnity liabilities and termination clauses.', impact: 'Saves 2.5 hours' },
      { time: '11:00 AM', task: 'Strategic negotiation with partner', aiRole: 'human_core', desc: 'Gauging partner risk appetite, establishing trust, framing trade-offs.', impact: '100% human negotiation' },
      { time: '02:00 PM', task: 'Synthesis memo & client deck', aiRole: 'assisted', desc: 'Drafting initial slide bullets and summarizing financial audit appendices.', impact: 'Saves 1.5 hours' },
      { time: '04:30 PM', task: 'Fiduciary sign-off & accountability', aiRole: 'human_core', desc: 'Senior partner signs legal opinion with personal malpractice responsibility.', impact: '100% human accountability' }
    ]
  },
  {
    id: 'support',
    name: 'Customer Support',
    title: 'NBER Trial (5,179 Support Agents)',
    adoptionStat: '+14%',
    adoptionLabel: 'Productivity lift across agents',
    timeImpact: '+34%',
    timeLabel: 'lift for novice / lower-skilled agents',
    evidenceId: 'C010',
    caveat: 'Brynjolfsson et al. (NBER 2023): Experienced agents saw almost 0% gain; compresses learning curve from 6 to 2 months.',
    breakdownStats: [
      { label: 'Overall productivity lift', value: '+14%' },
      { label: 'Novice agent productivity lift', value: '+34%' },
      { label: 'Top-tier agent lift', value: '~0% (null)' },
      { label: 'Onboarding time compression', value: '6 mos → 2 mos' }
    ],
    timeline: [
      { time: '09:00 AM', task: 'Routine query resolution', aiRole: 'assisted', desc: 'Real-time suggested reply snippets for common billing and subscription questions.', impact: '+34% for novices' },
      { time: '11:30 AM', task: 'Angry customer de-escalation', aiRole: 'human_core', desc: 'De-escalating an irate subscriber with genuine empathy and authentic emotional calibration.', impact: '100% human empathy' },
      { time: '02:00 PM', task: 'Knowledge base search & retrieval', aiRole: 'assisted', desc: 'Assistant retrieves obscure engineering bug tickets in 3 seconds.', impact: 'Saves 10 min / ticket' },
      { time: '04:00 PM', task: 'Escalation to engineering leadership', aiRole: 'human_core', desc: 'Judging whether an outage pattern warrants a severity-1 company paging event.', impact: '100% human judgment' }
    ]
  }
];

export const Chapter5RealWorkday: React.FC<Chapter5Props> = ({ onOpenEvidence }) => {
  const [selectedProfId, setSelectedProfId] = useState<string>('teacher');

  const prof = WORKDAYS.find((w) => w.id === selectedProfId) || WORKDAYS[0];

  return (
    <article id="ch05_real_workday" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">05</span>
            <span>AI IN A REAL WORKDAY.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            See how the hours actually rearrange.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            AI rarely replaces an entire person; it reallocates tasks within their day. Follow one morphing timeline across five distinct professions to see what gets automated and what remains deeply human.
          </p>
        </header>

        {/* Profession Switcher Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#163560] pb-3">
          {WORKDAYS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedProfId(item.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                selectedProfId === item.id
                  ? 'bg-[#1e5bb4] text-[#f7faeb] font-semibold border border-[#2a75e0] shadow-xs'
                  : 'bg-[#081a36] text-[#9bb2cf] hover:bg-[#0e274c] hover:text-[#f7faeb] border border-[#153258]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Workday Explorer Card */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#163560] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                Workday Architecture · {prof.name}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#f7faeb] mt-0.5">
                {prof.title}
              </h3>
            </div>
            <EvidenceBadge id={prof.evidenceId} onClick={onOpenEvidence} />
          </div>

          {/* Key Empirical Metrics for this profession */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
              <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Adoption</span>
              <span className="text-xl font-bold text-[#6dc361]">{prof.adoptionStat}</span>
              <span className="text-[10px] text-[#9bb2cf] block truncate">{prof.adoptionLabel}</span>
            </div>
            <div className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
              <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans">Time Impact</span>
              <span className="text-xl font-bold text-[#d7e63b]">{prof.timeImpact}</span>
              <span className="text-[10px] text-[#9bb2cf] block truncate">{prof.timeLabel}</span>
            </div>
            {prof.breakdownStats.slice(0, 2).map((s, idx) => (
              <div key={idx} className="p-3 bg-[#081a36] rounded-xl border border-[#163560]">
                <span className="text-[10px] text-[#9bb2cf] block uppercase font-sans truncate">{s.label}</span>
                <span className="text-xl font-bold text-[#f7faeb]">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Morphing Timeline */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-mono text-[#9bb2cf] uppercase tracking-wider block">
              Typical Daily Progression (Task Decomposition):
            </span>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#163560]">
              {prof.timeline.map((event, idx) => {
                const isAssisted = event.aiRole === 'assisted';
                return (
                  <div key={idx} className="relative group">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isAssisted
                          ? 'bg-[#144835] text-[#6dc361] ring-4 ring-[#144835]/30'
                          : 'bg-[#1b3d6d] text-[#d7e63b] ring-4 ring-[#1b3d6d]/30'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="p-4 rounded-xl border border-[#163560] bg-[#081a36] hover:bg-[#0c2548] transition-colors space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#9bb2cf]">{event.time}</span>
                          <span className="font-serif font-bold text-sm text-[#f7faeb]">{event.task}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold border ${
                            isAssisted
                              ? 'bg-[#0c2a20] text-[#6dc361] border-[#144835]'
                              : 'bg-[#0c2242] text-[#d7e63b] border-[#1b3d6d]'
                          }`}
                        >
                          {isAssisted ? '⚡ AI Assisted' : '🛡 Human Core'}
                        </span>
                      </div>
                      <p className="text-xs text-[#9bb2cf] leading-relaxed">{event.desc}</p>
                      <span className="text-[11px] font-mono text-[#9bb2cf] block pt-1">
                        Impact: <strong className="text-[#f7faeb] font-semibold">{event.impact}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mandatory Caveat Box */}
          {prof.caveat && (
            <div className="p-4 bg-[#081a36] rounded-xl border border-[#1b3d6d] flex items-start gap-2.5 text-xs text-[#9bb2cf]">
              <AlertTriangle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#f7faeb] block font-sans mb-0.5">Methodological Caveat:</strong>
                <span>{prof.caveat}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
