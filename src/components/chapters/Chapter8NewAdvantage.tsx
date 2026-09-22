import React, { useState } from 'react';
import { EvidenceBadge } from '../EvidenceBadge';
import { Sparkles, CheckCircle2, ShieldCheck, Compass, ArrowUpRight, BookOpen } from 'lucide-react';

interface Chapter8Props {
  onOpenEvidence: (id: string) => void;
}

interface SkillNode {
  id: string;
  name: string;
  family: 'analytical' | 'interpersonal' | 'strategic';
  tagline: string;
  whyScarce: string;
  workplaceExample: string;
  researchLink: string;
}

const SKILL_NODES: SkillNode[] = [
  {
    id: 'verification',
    name: 'Rigorous Verification & Fact Grounding',
    family: 'analytical',
    tagline: 'Treating unverified AI output as an ungrounded liability.',
    whyScarce: 'Generating plausible text costs pennies; verifying whether a statistic or precedent is authentic requires deep expertise and patience.',
    workplaceExample: 'Auditing an AI-drafted legal brief to verify that cited court precedents actually exist and support the specific legal theory.',
    researchLink: 'ILO Field Studies: Power users cite verification as their primary competitive moat.'
  },
  {
    id: 'domain_depth',
    name: 'Deep Domain Expertise',
    family: 'analytical',
    tagline: 'Recognizing subtle errors that fool generalists.',
    whyScarce: 'Models generate confident, fluent answers that look 95% right. Only seasoned domain experts can spot the critical 5% flaw.',
    workplaceExample: 'An oncologist spotting that an AI drug interaction summary overlooked a rare enzyme deficiency in a patient’s lab panel.',
    researchLink: 'Eloundou et al.: Higher human education correlates positively with AI task exposure.'
  },
  {
    id: 'taste_curation',
    name: 'Contextual Judgement & Taste',
    family: 'strategic',
    tagline: 'Knowing what to keep when infinite options are free.',
    whyScarce: 'When anyone can generate 50 logos or 10 memos in seconds, the scarce value shifts entirely to the discernment that selects the one right solution.',
    workplaceExample: 'A creative director selecting the single visual metaphor that honors a cultural heritage without sliding into generic stock imagery.',
    researchLink: 'Adobe Creative Study: 84.8% of creatives view AI as a generator, but human taste as the anchor.'
  },
  {
    id: 'empathy',
    name: 'Empathetic Calibration & Trust',
    family: 'interpersonal',
    tagline: 'Humans seek human presence in vulnerable moments.',
    whyScarce: 'Chatbots can simulate polite syntax, but cannot experience grief, care, or moral accountability. Human trust remains non-fungible.',
    workplaceExample: 'A hospice nurse comforting a grieving family; an executive negotiating a confidential corporate merger.',
    researchLink: 'Brynjolfsson et al.: Customer satisfaction relies on empathetic human escalation.'
  },
  {
    id: 'prompt_steering',
    name: 'AI Fluency & Problem Decomposition',
    family: 'strategic',
    tagline: 'Decomposing ambiguous real-world problems into structured prompts.',
    whyScarce: 'Effective prompt engineering is not asking clever questions; it is understanding data architecture, system prompts, and context boundaries.',
    workplaceExample: 'A financial analyst breaking a 50-page financial filing into 6 discrete extraction pipelines with structured JSON schemas.',
    researchLink: 'WEF 2025: AI fluency and technological literacy rank among top 3 fastest-growing skills.'
  },
  {
    id: 'originality',
    name: 'Creative Originality & Novel Hypotheses',
    family: 'strategic',
    tagline: 'Inventing connections outside the training distribution.',
    whyScarce: 'LLMs are statistical interpolators of existing internet text. Truly novel scientific theories and brand identities come from lateral human leaps.',
    workplaceExample: 'Developing a novel biochemical testing assay that combines microfluidics with culinary fermentation techniques.',
    researchLink: 'O*NET Cognitive Taxonomy: Originality correlates at r = +0.49 with high AI exposure.'
  },
  {
    id: 'cross_synthesis',
    name: 'Cross-Functional Synthesis',
    family: 'strategic',
    tagline: 'Bridging legal, technical, and human requirements.',
    whyScarce: 'Models excel within narrow context windows. Bridging an engineering reality with marketing strategy and regulatory compliance requires cross-domain agility.',
    workplaceExample: 'A product manager aligning engineering feasibility, legal copyright liability, and user delight in a new software feature.',
    researchLink: 'Thomson Reuters: Cross-functional advisory commands the highest billable rates.'
  },
  {
    id: 'fiduciary',
    name: 'Fiduciary Duty & Accountability',
    family: 'interpersonal',
    tagline: 'The human who signs their name and accepts the liability.',
    whyScarce: 'Software cannot stand trial, be stripped of a medical license, or lose equity. Only humans can enter binding social contracts of trust.',
    workplaceExample: 'A civil engineer certifying a bridge structural calculation with their official professional engineer stamp.',
    researchLink: 'AMA 2026: 100% of diagnostic liability remains strictly on licensed physicians.'
  },
  {
    id: 'meta_learning',
    name: 'Adaptive Meta-Learning',
    family: 'analytical',
    tagline: 'The ability to unlearn and relearn every six months.',
    whyScarce: 'Tools and workflows update constantly. The fixed-knowledge mindset becomes obsolete, while the capacity to adopt new paradigms expands in value.',
    workplaceExample: 'A software engineer transitioning seamlessly from writing syntax by hand to orchestrating multi-agent test environments.',
    researchLink: 'WEF 2025: 59 out of 100 workers require active retraining before 2030.'
  }
];

export const Chapter8NewAdvantage: React.FC<Chapter8Props> = ({ onOpenEvidence }) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('verification');

  const activeSkill = SKILL_NODES.find((s) => s.id === selectedSkillId) || SKILL_NODES[0];

  return (
    <article id="ch08_new_advantage" className="scroll-mt-12 py-16 sm:py-24 border-b border-[#153258] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Chapter Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0c2242] border border-[#1b3d6d] text-[#d7e63b] text-xs font-mono">
            <span className="font-bold text-[#d7e63b]">08</span>
            <span>WHAT BECOMES MORE VALUABLE?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f7faeb] tracking-tight leading-tight">
            When generation becomes cheap, judgement becomes scarce.
          </h2>
          <p className="text-base sm:text-lg text-[#9bb2cf] font-sans max-w-3xl leading-relaxed">
            The World Economic Forum reports that <strong className="text-[#f7faeb] font-semibold">59 out of 100 workers</strong> will need substantial retraining by 2030, with 63% of employers citing skill gaps as their biggest barrier. Here are the 9 durable capabilities that gain relative value.
          </p>
        </header>

        {/* WEF Macro Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">Retraining Mandate</span>
            <span className="text-2xl font-bold text-[#6dc361] mt-1 block">59 / 100</span>
            <span className="text-[11px] text-[#9bb2cf]">workers need upskilling by 2030 (WEF 2025)</span>
          </div>
          <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">Corporate Bottleneck</span>
            <span className="text-2xl font-bold text-[#f59e0b] mt-1 block">63%</span>
            <span className="text-[11px] text-[#9bb2cf]">employers report critical skill gaps</span>
          </div>
          <div className="p-4 bg-[#081a36] rounded-xl border border-[#163560]">
            <span className="text-[10px] text-[#9bb2cf] uppercase block font-sans">Strategy Focus</span>
            <span className="text-2xl font-bold text-[#f7faeb] mt-1 block">77%</span>
            <span className="text-[11px] text-[#9bb2cf]">firms prioritize internal upskilling</span>
          </div>
        </div>

        {/* The 9 Skills Constellation Atlas */}
        <div className="bg-[#0b1f3c] p-6 sm:p-8 rounded-2xl border border-[#163560] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#163560] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9bb2cf] tracking-wider">
                Atlas of Durable Human Capabilities
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f7faeb] mt-0.5">
                The 9 Scarcities in an Age of Abundant Content
              </h3>
            </div>
            <EvidenceBadge id="C016" onClick={onOpenEvidence} labelOverride="WEF 2025 · Skills Outlook" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Skill Selector Constellation Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SKILL_NODES.map((skill) => {
                const isSelected = selectedSkillId === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0e274c] border-[#1e5bb4] ring-2 ring-[#1e5bb4]/30'
                        : 'bg-[#081a36] border-[#163560] hover:bg-[#0c2548]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9bb2cf]">
                        {skill.family}
                      </span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#d7e63b]" />}
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#f7faeb] leading-snug">
                      {skill.name}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Selected Skill Deep Dive Card */}
            <div className="lg:col-span-5 p-5 bg-[#081a36] rounded-xl border border-[#163560] space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d7e63b] font-semibold">
                  Capability Detail · {activeSkill.family}
                </span>
                <h4 className="text-lg font-serif font-bold text-[#f7faeb] leading-snug">
                  {activeSkill.name}
                </h4>
                <p className="text-xs text-[#9bb2cf] italic font-serif">"{activeSkill.tagline}"</p>
              </div>

              <div className="space-y-2 text-xs text-[#9bb2cf]">
                <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53]">
                  <strong className="text-[#f7faeb] block font-sans mb-0.5">Why it becomes scarcer:</strong>
                  <span>{activeSkill.whyScarce}</span>
                </div>

                <div className="p-3 bg-[#061329] rounded-lg border border-[#142e53]">
                  <strong className="text-[#f7faeb] block font-sans mb-0.5">Everyday workplace test:</strong>
                  <span>{activeSkill.workplaceExample}</span>
                </div>

                <div className="p-2.5 bg-[#0c2242] border border-[#1b3d6d] rounded-lg text-[11px] font-mono text-[#9bb2cf]">
                  <span>{activeSkill.researchLink}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
