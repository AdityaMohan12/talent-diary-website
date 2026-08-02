/** Open roles + full job descriptions, sourced from the client's JD documents.
 *  Each role renders a card on /jobs and a full JD page at /jobs/[slug].
 *  "Apply now" on every JD page opens APPLY_FORM_URL (see lib/site.ts). */

export type JDSection = {
  heading: string;
  intro?: string;
  bullets?: string[];
  groups?: { label: string; bullets: string[] }[];
};

export type Role = {
  slug: string;
  title: string;
  company: keyof typeof COMPANIES;
  location: string;
  ctc: string;
  experience: string;
  employment: string;
  shift?: string;
  summary: string;
  tags: string[];
  overview: string;
  sections: JDSection[];
};

export const COMPANIES = {
  "workforce-platform": {
    descriptor: "Workforce & AI data platform",
    blurb:
      "A fast-scaling, technology-driven workforce and work-execution platform that helps enterprises run large-scale operations through a nationwide network of over a million gig workers. The company delivers everything from field and retail operations, staffing, and telecalling to AI data services, data collection, annotation, and speech, image, and video AI, for leading technology and enterprise clients. It is a high-growth, execution-first environment where teams build and scale operational systems from the ground up.",
  },
  "preventive-healthtech": {
    descriptor: "AI-powered preventive healthcare",
    blurb:
      "A next-generation preventive healthcare company using AI-powered diagnostics to detect health conditions early, before symptoms appear. By combining full-body MRI, advanced biomarkers, and AI-driven insights, the company helps individuals and corporates shift from reactive treatment to proactive prevention. It is a fast-paced, high-ownership environment at the intersection of healthcare and AI.",
  },
} as const;

export const ROLES: Role[] = [
  {
    slug: "general-manager-operations",
    title: "General Manager, Operations",
    company: "workforce-platform",
    location: "Bengaluru",
    ctc: "25 to 35 LPA",
    experience: "8 to 12 years",
    employment: "Full-time",
    summary:
      "Lead and scale end-to-end business operations for a work-as-a-service platform, owning execution across large field and remote projects.",
    tags: ["Full-time", "On-site, Bengaluru", "8 to 12 yrs", "25 to 35 LPA"],
    overview:
      "The General Manager, Operations will lead and scale end-to-end business operations for a work-as-a-service organisation. This role typically involves execution of multiple large projects that could be field-based or remote execution across grey-collar domains. The ideal candidate brings strong execution rigour, delivery of results, the ability to build scalable operational systems, and proven experience managing large, distributed teams in a high-growth environment.",
    sections: [
      {
        heading: "Primary responsibilities",
        bullets: [
          "Operational Strategy & Execution: Define and execute operational strategies to drive efficiency, scalability, service quality, and cost optimisation across business operations. Translate business objectives into structured operating plans with clear ownership, governance, and measurable outcomes.",
          "Leadership & Team Management: Lead, mentor, and scale multi-layered operations teams including central operations, field leadership, and partner or vendor networks. Build a high-ownership, performance-driven culture with strong accountability and collaboration.",
          "Service Quality & Process Excellence: Design and implement SOPs, quality frameworks, audits, and continuous improvement mechanisms to meet client SLAs and service standards. Drive root-cause analysis and corrective action planning to improve execution reliability.",
          "Client Experience & Stakeholder Management: Own client satisfaction by proactively managing escalations, strengthening communication, and ensuring consistent service delivery. Act as the primary operational interface between clients, service providers, and internal stakeholders.",
          "Resource Planning & Deployment: Plan and optimise workforce deployment, vendor capacity, territory coverage, and operational infrastructure to meet business demand. Oversee onboarding, performance management, and productivity of service providers and partners.",
          "Financial & Cost Ownership: Own operational budgets and P&L, track expenses, and identify cost-efficiency and productivity improvement opportunities. Improve unit economics without compromising service quality.",
          "Performance Management & Analytics: Define, monitor, and report key operational KPIs covering productivity, quality, turnaround time, cost, and client satisfaction. Use data-driven insights to guide decisions and scale best practices.",
          "Risk, Compliance & Governance: Identify operational risks and implement mitigation strategies to ensure business continuity. Ensure compliance with applicable regulatory, legal, and industry standards.",
          "Process Documentation & Enablement: Build and maintain detailed process documentation, SOPs, and playbooks for operations, field execution, and partner onboarding.",
        ],
      },
      {
        heading: "Desired skills",
        bullets: [
          "Graduation from Tier 1 institutions (IITs or NITs) preferred.",
          "Proven experience in B2B operations and field operations (on-ground workforce deployment, territory management, vendor onboarding, service fulfillment, quality audits), vendor management, and gig workforce operations, with strong negotiation and decision-making skills.",
          "Excellent analytical, problem-solving, and communication abilities.",
          "Strong leadership skills with experience managing diverse and distributed teams, including on-ground workforce and partner networks.",
          "Proficient in Microsoft Office Suite and familiar with marketplace management and field operations tools.",
          "Ability to multitask, adapt, and perform effectively under pressure in a dynamic, fast-paced business environment.",
        ],
      },
    ],
  },
  {
    slug: "program-manager-founders-office",
    title: "Program Manager, Founder's Office",
    company: "workforce-platform",
    location: "Bengaluru",
    ctc: "12 to 14 LPA",
    experience: "1 to 3 years",
    employment: "Full-time",
    shift: "3:00 PM to 12:00 AM IST, or 11:00 AM to 8:00 PM IST",
    summary:
      "A high-ownership hybrid role with direct founder exposure, spanning AI program management and outbound enterprise growth.",
    tags: ["Full-time", "On-site, Bengaluru", "1 to 3 yrs", "12 to 14 LPA"],
    overview:
      "This is a high-ownership role designed for individuals who thrive in fast-paced environments, enjoy solving ambiguous business problems, and want direct exposure to founders and senior leadership. You will work across strategic initiatives, operational execution, AI program management, and outbound enterprise growth. The role combines the analytical rigour of program management with the hustle and communication skills required in sales development. If you enjoy building from 0 to 1, driving execution at scale, and working at the intersection of AI, operations, and business growth, this role is for you.",
    sections: [
      {
        heading: "Key responsibilities",
        groups: [
          {
            label: "Program Management & Founder's Office",
            bullets: [
              "Drive execution of large-scale AI and operational programs across multiple clients and workflows.",
              "Work directly with founders and senior leadership on strategic initiatives and high-priority business problems.",
              "Coordinate cross-functional teams including operations, product, quality, recruiting, and delivery.",
              "Track key metrics, project timelines, deliverables, and execution efficiency.",
              "Identify process gaps and implement scalable operational improvements.",
              "Support rapid experimentation and execution across AI data services and enterprise operations.",
              "Prepare business updates, dashboards, reports, and strategic recommendations for leadership.",
            ],
          },
          {
            label: "Sales Development (SDR)",
            bullets: [
              "Drive outbound outreach to enterprise prospects and potential clients.",
              "Build and manage sales pipelines through cold emails, LinkedIn outreach, and strategic prospecting.",
              "Conduct market and account research to identify growth opportunities.",
              "Support business development initiatives and client engagement efforts.",
              "Coordinate with leadership and sales teams to improve conversion and outreach effectiveness.",
              "Maintain CRM hygiene, reporting, and lead tracking processes.",
            ],
          },
        ],
      },
      {
        heading: "Required skills & qualifications",
        bullets: [
          "0.5 to 3 years of experience in consulting, startups, operations, strategy, business development, or similar roles.",
          "Exceptional problem-solving and structured thinking ability.",
          "Strong communication and stakeholder management skills.",
          "Strong English communication skills (mandatory); Hindi communication proficiency preferred.",
          "High ownership mindset with strong execution capability.",
          "Ability to thrive in ambiguity and fast-changing environments.",
          "Strong analytical skills and comfort working with data and metrics.",
          "Self-driven, proactive, and entrepreneurial attitude.",
          "Ability to multitask and manage multiple priorities effectively.",
        ],
      },
      {
        heading: "Preferred qualities",
        bullets: [
          "Experience working in early-stage startups or high-growth environments.",
          "Familiarity with AI or ML, data operations, or tech-enabled services.",
          "Exposure to client-facing or enterprise-facing roles.",
          "Strong proficiency in Google Sheets, Excel, and presentation tools.",
        ],
      },
      {
        heading: "Who should apply",
        intro: "This role is ideal for candidates who:",
        bullets: [
          "Want rapid career growth and high ownership early in their careers.",
          "Enjoy solving operational and business challenges.",
          "Are comfortable working in execution-heavy, fast-paced environments.",
          "Aspire to work closely with founders and build scalable businesses.",
          "Have strong communication, hustle, and analytical thinking skills.",
        ],
      },
    ],
  },
  {
    slug: "senior-qa-manager",
    title: "Senior QA Manager",
    company: "workforce-platform",
    location: "Bengaluru",
    ctc: "16 to 20 LPA",
    experience: "6 to 10 years",
    employment: "Full-time",
    summary:
      "Lead the Quality Assurance function for large-scale video annotation operations, owning accuracy, audits, and continuous improvement.",
    tags: ["Full-time", "On-site, Bengaluru", "6 to 10 yrs", "16 to 20 LPA"],
    overview:
      "We are seeking an experienced and detail-oriented QA Manager to lead the Quality Assurance function for our video annotation operations. The ideal candidate will be responsible for ensuring the delivery of high-quality annotation outputs across labeling, segmentation, tracking, and captioning projects. This role requires strong leadership capabilities, a deep understanding of annotation workflows, and the ability to drive continuous quality improvement through data-driven decision-making.",
    sections: [
      {
        heading: "Primary responsibilities",
        groups: [
          {
            label: "Quality Management & Operations",
            bullets: [
              "Lead and manage the QA team supporting video annotation projects, including labeling, segmentation, tracking, and captioning tasks.",
              "Ensure annotation deliverables meet quality standards for accuracy, consistency, completeness, and compliance with project guidelines.",
              "Establish and maintain robust quality control processes across annotation workflows.",
              "Conduct regular audits, calibration sessions, and quality reviews to ensure alignment across teams and projects.",
              "Identify quality gaps, analyze root causes, and implement corrective and preventive action plans (CAPA).",
            ],
          },
          {
            label: "Performance Monitoring & Reporting",
            bullets: [
              "Monitor and analyze key quality metrics, including annotation accuracy, rework percentage, reviewer efficiency, SLA adherence, and quality scores.",
              "Develop and maintain quality dashboards, reports, and performance analyses for internal stakeholders and clients.",
              "Drive continuous improvement initiatives based on quality trends and operational insights.",
            ],
          },
          {
            label: "Stakeholder & Client Management",
            bullets: [
              "Collaborate closely with Operations, Production, and Project Management teams to improve workflow efficiency and annotation quality.",
              "Manage client feedback, quality escalations, and issue resolution processes.",
              "Act as the primary quality point of contact for project stakeholders and clients.",
            ],
          },
          {
            label: "Process Improvement & Compliance",
            bullets: [
              "Develop, maintain, and update SOPs, QA guidelines, audit frameworks, and process documentation.",
              "Ensure adherence to project-specific quality standards, security requirements, and data confidentiality protocols.",
              "Implement best practices and quality methodologies to improve operational performance and scalability.",
            ],
          },
          {
            label: "Team Leadership & Development",
            bullets: [
              "Lead, mentor, and develop QA Leads, Auditors, and Quality Specialists.",
              "Conduct training sessions, coaching programs, and performance reviews.",
              "Foster a culture of accountability, continuous learning, and operational excellence.",
              "Support workforce planning and resource allocation to meet quality and business objectives.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "senior-talent-acquisition-associate",
    title: "Senior Talent Acquisition Associate",
    company: "workforce-platform",
    location: "Bengaluru",
    ctc: "7 to 9 LPA",
    experience: "2 to 5 years",
    employment: "Full-time",
    summary:
      "Own end-to-end hiring, build strong talent pipelines, and partner with stakeholders to attract top talent across functions.",
    tags: ["Full-time", "On-site, Bengaluru", "2 to 5 yrs", "7 to 9 LPA"],
    overview:
      "We are looking for a dynamic and result-oriented Senior Associate, Talent Acquisition with solid experience in core recruitment and talent acquisition. The ideal candidate will be responsible for managing end-to-end hiring processes, building strong talent pipelines, and partnering with business stakeholders to attract top talent across functions.",
    sections: [
      {
        heading: "Key responsibilities",
        groups: [
          {
            label: "Talent Acquisition & Recruitment",
            bullets: [
              "Manage the complete recruitment lifecycle from sourcing to onboarding.",
              "Understand hiring requirements from stakeholders and create effective hiring strategies.",
              "Source candidates through job portals, LinkedIn, referrals, social media, and networking channels.",
              "Screen resumes, conduct initial HR interviews, and coordinate technical or managerial rounds.",
              "Ensure quality hiring within defined timelines (TAT) and budget.",
              "Negotiate salary offers and close positions efficiently.",
            ],
          },
          {
            label: "Stakeholder Management",
            bullets: [
              "Partner with hiring managers to understand workforce planning and hiring priorities.",
              "Provide regular hiring updates, market insights, and candidate feedback.",
              "Build strong relationships with internal teams and external recruitment partners.",
            ],
          },
          {
            label: "Candidate Experience",
            bullets: [
              "Ensure a seamless and positive candidate experience throughout the recruitment process.",
              "Maintain timely communication with candidates regarding status updates and offers.",
              "Support onboarding coordination for selected candidates.",
            ],
          },
          {
            label: "Data & Reporting",
            bullets: [
              "Track recruitment metrics such as TAT, offer-to-join ratio, source effectiveness, and hiring funnel.",
              "Maintain accurate candidate records in ATS or HRMS systems.",
              "Prepare weekly and monthly hiring dashboards and reports.",
            ],
          },
          {
            label: "Employer Branding",
            bullets: [
              "Support employer branding initiatives through social media, job fairs, and campus drives.",
              "Promote the organisation as an employer of choice.",
            ],
          },
        ],
      },
      {
        heading: "Required skills & competencies",
        bullets: [
          "Strong experience in core talent acquisition and recruitment.",
          "Expertise in sourcing through portals, LinkedIn, and social media hiring.",
          "Strong screening and interviewing skills.",
          "Good understanding of hiring metrics and recruitment analytics.",
          "Excellent communication, negotiation, and stakeholder management skills.",
          "Ability to work in a fast-paced environment and manage multiple open positions.",
          "Proficiency in MS Excel, PowerPoint, ATS, and HRMS tools.",
        ],
      },
      {
        heading: "Preferred qualifications",
        bullets: [
          "Bachelor's degree in Human Resources, Business Administration, or a related field.",
          "MBA or PGDM in HR is preferred.",
        ],
      },
    ],
  },
  {
    slug: "team-lead-sales",
    title: "Team Lead, Sales",
    company: "preventive-healthtech",
    location: "Bengaluru (Koramangala)",
    ctc: "10 to 12 LPA",
    experience: "6 to 7 years",
    employment: "Full-time",
    summary:
      "Lead and drive a customer acquisition team for an AI-powered preventive healthcare company, owning targets, quality, and team development.",
    tags: ["Full-time", "On-site, Bengaluru", "6 to 7 yrs", "10 to 12 LPA"],
    overview:
      "As a Team Lead, Sales, you will be responsible for managing and driving the performance of the Customer Acquisition team. You will ensure target achievement, process adherence, quality conversations, and team development while maintaining high customer engagement standards.",
    sections: [
      {
        heading: "Key responsibilities",
        bullets: [
          "Lead, manage, and motivate a team of Customer Acquisition Specialists.",
          "Drive daily, weekly, and monthly sales targets.",
          "Monitor calls, conversions, and pipeline management through CRM.",
          "Conduct regular performance reviews and feedback sessions.",
          "Coach team members on objection handling and closing techniques.",
          "Ensure accurate communication of the company's preventive screening packages.",
          "Maintain process discipline and quality standards.",
          "Coordinate with operations and medical teams for smooth booking and service delivery.",
          "Prepare sales reports and share performance insights with management.",
        ],
      },
      {
        heading: "Required skills",
        bullets: [
          "Strong team handling and people management skills.",
          "Proven track record of achieving and exceeding sales targets.",
          "Excellent objection handling and closing abilities.",
          "Strong communication skills (English plus a local language preferred).",
          "Process-driven mindset with high accountability.",
          "Experience in telesales, B2C, or health-tech preferred.",
          "Good knowledge of CRM and basic reporting.",
        ],
      },
      {
        heading: "Qualifications",
        bullets: [
          "Graduate (any stream).",
          "Minimum 2 to 3 years of experience as a Team Leader in Sales or Telesales.",
          "Experience in the healthcare, diagnostics, or wellness industry is an added advantage.",
        ],
      },
      {
        heading: "What we offer",
        bullets: [
          "Opportunity to work in preventive healthcare and AI-driven diagnostics.",
          "Leadership growth path into Sales Manager or Centre Head roles.",
          "Performance-driven incentives.",
          "Fast-paced, high-ownership environment.",
        ],
      },
    ],
  },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
