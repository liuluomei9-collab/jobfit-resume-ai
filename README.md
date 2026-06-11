# JobFit Resume AI

![JobFit Resume AI cover](./assets/cover.svg)

AI-powered job application workspace for tailoring resumes to job descriptions, managing applications, and turning interview reviews into reusable career assets.

中文：一个基于岗位 JD 自动适配简历、管理投递记录、沉淀面试复盘的 AI 求职工作台。

## Why This Project

Most resume tools generate a resume once. JobFit Resume AI is designed around a longer job-search loop:

1. Build a structured career profile.
2. Paste a target job description.
3. Analyze the role, company context, gaps, and keywords.
4. Generate a tailored resume with evidence tracking.
5. Save role-specific resume versions and export PDF.
6. Track applications in a job-search CRM.
7. Review interviews and feed learnings back into the profile.

The goal is not just to write a resume. The goal is to make every application and interview improve the next one.

## Core Features

- **Resume import**: Paste an old resume and convert recognized skills into profile drafts.
- **Career profile library**: Edit profile information, skills, and evidence-backed project materials.
- **JD analysis**: Extract local keyword matches, gaps, fit score, company context, and success profile.
- **Tailored resume generation**: Generate and edit a resume summary based on the target JD.
- **Resume versioning**: Save, load, and delete role-specific resume versions.
- **Evidence chain**: Track which resume claims come from which profile evidence.
- **PDF export**: Print or export the generated resume as PDF through the browser.
- **Application CRM**: Track companies, roles, channels, resume versions, and next steps.
- **Interview review**: Record interview questions, weak spots, and improvement actions.
- **STAR library**: Save behavioral interview stories and Big Tech preparation notes.

## What Makes It Different

普通 AI 简历工具通常只做“生成简历”。JobFit 更强调完整求职闭环：

- **Truth-preserving generation**: AI should not invent companies, projects, dates, or metrics.
- **Evidence-first resume writing**: Important claims need traceable sources.
- **Interview-to-resume feedback**: Interview reviews create new profile tasks and STAR stories.
- **Job-search CRM**: Resume versions and application status are managed together.
- **Big Tech preparation**: ATS resume mode and STAR behavioral preparation are built into the flow.

## Current Status

This repository currently contains a browser-based local MVP plus product documents.

The current version works without a build step and stores data in browser `localStorage`. It supports:

- Editing profile information and skills
- Adding and deleting evidence-backed project materials
- Pasting old resume text and importing recognized skills
- Pasting a JD and generating a local keyword-based fit analysis
- Editing a tailored resume summary
- Saving and loading resume versions
- Printing or exporting the resume as PDF
- Adding and deleting application CRM records
- Saving interview reviews and STAR story drafts

It is not yet a production cloud application. The next implementation step is to turn this local MVP into a full web app with:

- Next.js
- Supabase or PostgreSQL
- OpenAI API
- TipTap editor
- Playwright PDF export

## Local Preview

Open this file in a browser:

```text
index.html
```

No build step is required for the current prototype.

## Project Structure

```text
.
├── index.html              # Interactive static MVP
├── styles.css              # UI styles
├── script.js               # Local MVP interactions
├── PRD.md                  # Product requirements document
├── PROJECT_PLAN.md         # Roadmap and implementation plan
├── TECH_SPEC.md            # Technical implementation notes
├── AI_PROMPTS.md           # AI prompt and structured output design
├── BIG_TECH_SKILLS.md      # Big Tech resume/interview skill research
└── MODAO_PROTOTYPE.md      # Modao/Figma prototype guide
```

## Roadmap

- [x] Browser-based local MVP
- [x] JD analysis flow
- [x] Resume generation flow
- [x] Evidence chain concept
- [x] Application CRM concept
- [x] Interview review feedback loop
- [x] Big Tech mode concept
- [x] Browser localStorage persistence
- [x] Profile and project material CRUD
- [x] Editable resume summary and print-to-PDF
- [x] Resume version management
- [ ] Resume PDF/Word import
- [ ] OpenAI-powered JD parsing
- [ ] Rich resume editor
- [ ] Playwright PDF export service
- [ ] User accounts and data persistence
- [ ] Public personal website generation

## Recommended MVP Stack

- Frontend: Next.js, React, Tailwind CSS, shadcn/ui
- Editor: TipTap
- Backend: Next.js API routes or FastAPI
- Database: PostgreSQL / Supabase
- AI: OpenAI API structured outputs
- PDF: Playwright HTML-to-PDF
- Storage: Supabase Storage or Cloudflare R2

## Docs

- [Product Requirements](./PRD.md)
- [Project Plan](./PROJECT_PLAN.md)
- [Technical Spec](./TECH_SPEC.md)
- [AI Prompts](./AI_PROMPTS.md)
- [Big Tech Skills](./BIG_TECH_SKILLS.md)
- [Prototype Guide](./MODAO_PROTOTYPE.md)

## License

License is not selected yet.
