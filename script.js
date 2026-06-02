const STORAGE_KEY = "jobfit-resume-ai-v1";
const keywordPool = ["AI", "SaaS", "CRM", "数据分析", "需求分析", "用户研究", "项目管理", "跨部门", "知识库", "智能客服", "增长", "运营", "SQL", "NLP", "PRD", "产品设计"];

const defaultState = {
  profile: {
    name: "李明",
    city: "上海",
    target: "AI 产品经理 / B 端产品经理",
    years: "5 年",
    skills: ["需求分析", "SaaS", "AI", "数据分析", "用户研究", "项目管理"],
    summary: "5 年 B 端产品经验，熟悉 SaaS、CRM 和智能客服场景，擅长将业务流程抽象为系统能力，并通过数据指标验证产品效果。"
  },
  experiences: [
    { id: "exp-1", title: "智能客服知识库搭建", description: "负责从 0 到 1 搭建客服知识库和问答配置后台，协同算法、客服和运营团队完成上线，使人工客服重复咨询量下降 28%。", evidence: "2024 Q3 项目复盘、客服工单统计", tags: ["AI", "B 端", "流程优化", "28%"] },
    { id: "exp-2", title: "销售线索管理系统", description: "重构线索分配和跟进流程，统一销售阶段定义，让销售主管可以实时查看线索转化漏斗。", evidence: "销售 CRM 需求文档、上线验收记录", tags: ["CRM", "数据看板", "跨部门"] }
  ],
  applications: [
    { id: "app-1", company: "云杉智能", role: "AI 产品经理", status: "面试中", channel: "内推", version: "AI PM v1", next: "准备一面" }
  ],
  reviews: [],
  stars: [
    { principle: "Deliver Results", text: "用智能客服知识库项目讲清如何推动上线，并让重复咨询量下降 28%。", strength: "强" },
    { principle: "Dive Deep", text: "准备解释知识命中率、人工接管率和重复咨询下降之间的关系。", strength: "待补充" }
  ],
  lastAnalysis: null
};

const sampleJd = `岗位：AI 产品经理
公司：云杉智能

岗位职责：
1. 负责智能客服、知识库、AI 助手等产品方向的需求分析和产品设计；
2. 协同算法、研发、运营和客服团队推进产品落地；
3. 通过数据指标评估上线效果，持续优化用户体验和业务效率；
4. 负责用户调研、需求优先级管理和项目推进。

任职要求：
1. 3 年以上 B 端或 SaaS 产品经验；
2. 熟悉 AI 应用、NLP、知识库或客服系统优先；
3. 具备数据分析和跨部门沟通能力；
4. 能独立完成 PRD、原型和项目推进。`;

let state = loadState();
const byId = (id) => document.getElementById(id);
const [
  profileName, profileCity, profileTarget, profileYears, profileSkills, skillTags,
  experienceList, resumeName, resumeMeta, summaryText, resumeSkills, resumeExperiences,
  evidenceBox, applicationRows, reviewHistory, starGrid, roleTitle, score, skillScore,
  projectScore, evidenceScore, analysisResult, companyResearch, successProfile, loadSample,
  jdInput, resumeFile, fileName, oldResumeText, importTitle, importResult, parseResumeBtn,
  saveProfileBtn, addExperienceBtn, experienceDialog, experienceTitle, experienceDescription,
  experienceEvidence, experienceTags, experienceForm, confirmExperienceBtn, analyzeBtn,
  saveResumeBtn, exportBtn, applyBigTechMode, applicationDialog, addApplicationBtn,
  applicationCompany, applicationRole, applicationStatus, applicationChannel, applicationNext,
  applicationForm, confirmApplicationBtn, reviewRole, reviewQuestions, reviewGaps, reviewOutput,
  reviewBtn, addStarBtn
] = [
  "profileName", "profileCity", "profileTarget", "profileYears", "profileSkills", "skillTags",
  "experienceList", "resumeName", "resumeMeta", "summaryText", "resumeSkills", "resumeExperiences",
  "evidenceBox", "applicationRows", "reviewHistory", "starGrid", "roleTitle", "score", "skillScore",
  "projectScore", "evidenceScore", "analysisResult", "companyResearch", "successProfile", "loadSample",
  "jdInput", "resumeFile", "fileName", "oldResumeText", "importTitle", "importResult", "parseResumeBtn",
  "saveProfileBtn", "addExperienceBtn", "experienceDialog", "experienceTitle", "experienceDescription",
  "experienceEvidence", "experienceTags", "experienceForm", "confirmExperienceBtn", "analyzeBtn",
  "saveResumeBtn", "exportBtn", "applyBigTechMode", "applicationDialog", "addApplicationBtn",
  "applicationCompany", "applicationRole", "applicationStatus", "applicationChannel", "applicationNext",
  "applicationForm", "confirmApplicationBtn", "reviewRole", "reviewQuestions", "reviewGaps", "reviewOutput",
  "reviewBtn", "addStarBtn"
].map(byId);

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadState() {
  try { return { ...clone(defaultState), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return clone(defaultState); }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.getElementById("saveStatus").textContent = `已保存 ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
  renderAll();
}
function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}
function splitTags(value) { return value.split(/[,，、\s]+/).map((item) => item.trim()).filter(Boolean); }
function activateView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
}
document.querySelectorAll("[data-view], [data-view-link]").forEach((item) => item.addEventListener("click", () => activateView(item.dataset.view || item.dataset.viewLink)));

function renderAll() {
  renderMetrics();
  renderProfile();
  renderResume();
  renderApplications();
  renderReviews();
  renderStars();
  if (state.lastAnalysis) renderAnalysis(state.lastAnalysis);
}
function renderMetrics() {
  document.getElementById("metricApplications").textContent = state.applications.length;
  document.getElementById("metricExperiences").textContent = state.experiences.length;
  document.getElementById("metricReviews").textContent = state.reviews.length;
  document.getElementById("metricScore").textContent = state.lastAnalysis ? `${state.lastAnalysis.score}%` : "--";
  const list = document.getElementById("recentJobs");
  list.innerHTML = state.applications.slice(0, 4).map((item) => `<article><div><strong>${esc(item.role)}</strong><span>${esc(item.company)} · ${esc(item.next || "等待下一步")}</span></div><mark>${esc(item.status)}</mark></article>`).join("") || `<p class="analysis-empty">还没有投递记录。分析一个 JD 后开始创建。</p>`;
}
function renderProfile() {
  profileName.value = state.profile.name; profileCity.value = state.profile.city; profileTarget.value = state.profile.target; profileYears.value = state.profile.years; profileSkills.value = state.profile.skills.join(", ");
  skillTags.innerHTML = state.profile.skills.map((tag) => `<span>${esc(tag)}</span>`).join("");
  experienceList.innerHTML = state.experiences.map((item) => `<div class="experience-card"><div class="panel-head"><strong>${esc(item.title)}</strong><button class="text-btn" data-delete-exp="${esc(item.id)}">删除</button></div><p>${esc(item.description)}</p><div class="tag-cloud">${item.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div><small class="source-note">依据：${esc(item.evidence || "待补充")}</small></div>`).join("") || `<p class="analysis-empty">还没有项目素材，点击“添加项目”。</p>`;
  document.querySelectorAll("[data-delete-exp]").forEach((button) => button.addEventListener("click", () => { state.experiences = state.experiences.filter((item) => item.id !== button.dataset.deleteExp); saveState(); }));
}
function renderResume() {
  resumeName.textContent = state.profile.name || "你的名字";
  resumeMeta.textContent = `${state.profile.target || "求职方向"} · ${state.profile.city || "城市"}`;
  summaryText.value = state.profile.summary || "";
  resumeSkills.textContent = state.profile.skills.join("、");
  resumeExperiences.innerHTML = state.experiences.map((item) => `<p><strong>${esc(item.title)}：</strong>${esc(item.description)}</p>`).join("");
  evidenceBox.innerHTML = state.experiences.map((item) => `<p><strong>${esc(item.title)}</strong><br />${esc(item.evidence || "待补充事实依据")}</p>`).join("");
}
function renderApplications() {
  applicationRows.innerHTML = state.applications.map((item) => `<tr><td>${esc(item.company)}</td><td>${esc(item.role)}</td><td>${esc(item.status)}</td><td>${esc(item.channel)}</td><td>${esc(item.version)}</td><td>${esc(item.next)}</td><td><button class="text-btn" data-delete-app="${esc(item.id)}">删除</button></td></tr>`).join("");
  document.querySelectorAll("[data-delete-app]").forEach((button) => button.addEventListener("click", () => { state.applications = state.applications.filter((item) => item.id !== button.dataset.deleteApp); saveState(); }));
}
function renderReviews() {
  reviewHistory.innerHTML = state.reviews.map((item) => `<label><input type="checkbox" /> <strong>${esc(item.role)}</strong>：${esc(item.action)}</label>`).join("") || `<p class="analysis-empty">还没有复盘记录。</p>`;
}
function renderStars() {
  starGrid.innerHTML = state.stars.map((item) => `<article><strong>${esc(item.principle)}</strong><p>${esc(item.text)}</p><span>证据强度：${esc(item.strength)}</span></article>`).join("");
}
function analyzeJd(text) {
  const lower = text.toLowerCase();
  const hits = keywordPool.filter((keyword) => lower.includes(keyword.toLowerCase()));
  const owned = state.profile.skills.filter((skill) => lower.includes(skill.toLowerCase()));
  const evidenceHits = state.experiences.filter((item) => hits.some((keyword) => `${item.title}${item.description}${item.tags.join(" ")}`.toLowerCase().includes(keyword.toLowerCase())));
  const missing = hits.filter((keyword) => !`${state.profile.skills.join(" ")} ${state.experiences.map((item) => `${item.title} ${item.description}`).join(" ")}`.toLowerCase().includes(keyword.toLowerCase()));
  const score = Math.min(96, 58 + owned.length * 4 + evidenceHits.length * 7);
  const role = text.match(/岗位[：:]\s*([^\n]+)/)?.[1] || (text.includes("AI") ? "AI 产品经理" : "目标岗位");
  const company = text.match(/公司[：:]\s*([^\n]+)/)?.[1] || "目标公司";
  return { role, company, hits, owned, evidenceHits, missing, score, skillScore: Math.min(96, 60 + owned.length * 6), projectScore: Math.min(95, 60 + evidenceHits.length * 12), evidenceScore: Math.min(95, 55 + state.experiences.filter((item) => item.evidence).length * 15) };
}
function renderAnalysis(result) {
  roleTitle.textContent = result.role; score.textContent = `${result.score}%`; skillScore.textContent = `${result.skillScore}%`; projectScore.textContent = `${result.projectScore}%`; evidenceScore.textContent = `${result.evidenceScore}%`;
  analysisResult.className = "analysis-block";
  analysisResult.innerHTML = `<strong>JD 关键词</strong><div class="tag-cloud">${result.hits.map((tag) => `<span>${esc(tag)}</span>`).join("") || "<span>待补充更完整 JD</span>"}</div><strong>命中项目</strong><ul>${result.evidenceHits.map((item) => `<li>${esc(item.title)}</li>`).join("") || "<li>暂无明显命中项目</li>"}</ul><strong>缺口提醒</strong><ul>${result.missing.map((item) => `<li>${esc(item)}：资料库暂未找到依据</li>`).join("") || "<li>当前关键词覆盖较完整</li>"}</ul>`;
  companyResearch.innerHTML = `<div class="research-card"><strong>${esc(result.company)}</strong><p>建议围绕 ${esc(result.role)} 的业务目标，突出可验证的项目结果、协作复杂度和上线后指标。</p></div>`;
  successProfile.innerHTML = ["能用事实说明项目结果", "能解释跨部门推进过程", "能说明上线后的指标与迭代", ...result.missing.slice(0, 2).map((item) => `补充 ${item} 的真实案例`)].map((item) => `<li>${esc(item)}</li>`).join("");
}

loadSample.addEventListener("click", () => { jdInput.value = sampleJd; activateView("jd"); });
resumeFile.addEventListener("change", () => { fileName.textContent = resumeFile.files[0]?.name || "文件内容解析将在云端版接入"; });
parseResumeBtn.addEventListener("click", () => {
  const text = oldResumeText.value.trim();
  if (!text) { importResult.textContent = "请先粘贴旧简历文本。"; return; }
  const hits = keywordPool.filter((keyword) => text.toLowerCase().includes(keyword.toLowerCase()));
  const metrics = text.match(/\d+(?:\.\d+)?%/g) || [];
  importTitle.textContent = "已生成资料库草稿";
  importResult.innerHTML = `<strong>识别到的技能</strong><div class="tag-cloud">${hits.map((item) => `<span>${esc(item)}</span>`).join("") || "<span>暂未识别</span>"}</div><strong>识别到的量化成果</strong><p>${metrics.join("、") || "未找到百分比指标，建议手动补充。"}</p><button class="primary-btn" id="applyImportBtn">写入技能资料库</button>`;
  document.getElementById("applyImportBtn").addEventListener("click", () => { state.profile.skills = [...new Set([...state.profile.skills, ...hits])]; saveState(); activateView("profile"); });
});
saveProfileBtn.addEventListener("click", () => { state.profile = { ...state.profile, name: profileName.value.trim(), city: profileCity.value.trim(), target: profileTarget.value.trim(), years: profileYears.value.trim(), skills: splitTags(profileSkills.value) }; saveState(); });
addExperienceBtn.addEventListener("click", () => experienceDialog.showModal());
confirmExperienceBtn.addEventListener("click", (event) => { event.preventDefault(); if (!experienceTitle.value.trim() || !experienceDescription.value.trim()) return; state.experiences.unshift({ id: crypto.randomUUID(), title: experienceTitle.value.trim(), description: experienceDescription.value.trim(), evidence: experienceEvidence.value.trim(), tags: splitTags(experienceTags.value) }); experienceForm.reset(); experienceDialog.close(); saveState(); });
analyzeBtn.addEventListener("click", () => { if (!jdInput.value.trim()) { analysisResult.textContent = "请先粘贴岗位 JD。"; return; } state.lastAnalysis = analyzeJd(jdInput.value); saveState(); });
saveResumeBtn.addEventListener("click", () => { state.profile.summary = summaryText.value.trim(); saveState(); });
exportBtn.addEventListener("click", () => window.print());
applyBigTechMode.addEventListener("click", () => { state.profile.summary = `${state.profile.years} ${state.profile.target}经验，擅长将复杂业务问题拆解为可交付方案，并通过可验证指标持续迭代。代表项目：${state.experiences[0]?.title || "待补充项目"}。`; saveState(); activateView("resume"); });
addApplicationBtn.addEventListener("click", () => applicationDialog.showModal());
confirmApplicationBtn.addEventListener("click", (event) => { event.preventDefault(); if (!applicationCompany.value.trim() || !applicationRole.value.trim()) return; state.applications.unshift({ id: crypto.randomUUID(), company: applicationCompany.value.trim(), role: applicationRole.value.trim(), status: applicationStatus.value, channel: applicationChannel.value.trim(), version: "定制简历 v1", next: applicationNext.value.trim() }); applicationForm.reset(); applicationDialog.close(); saveState(); });
reviewBtn.addEventListener("click", () => { if (!reviewRole.value.trim()) return; const review = { id: crypto.randomUUID(), role: reviewRole.value.trim(), questions: reviewQuestions.value.trim(), gaps: reviewGaps.value.trim(), action: reviewGaps.value.trim() ? `补充证据并准备 STAR 回答：${reviewGaps.value.trim().slice(0, 45)}` : "沉淀本轮面试问题并准备 STAR 回答" }; state.reviews.unshift(review); reviewOutput.innerHTML = `<p class="eyebrow">AI 复盘</p><h2>已生成下一步建议</h2><p>${esc(review.action)}</p>`; saveState(); });
addStarBtn.addEventListener("click", () => { state.stars.unshift({ principle: "Ownership", text: `围绕 ${state.experiences[0]?.title || "一个真实项目"}，说明你如何主动发现问题、推进落地并验证结果。`, strength: "待补充" }); saveState(); });

renderAll();
