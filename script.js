const sampleJd = `岗位：AI 产品经理

岗位职责：
1. 负责智能客服、知识库、AI 助手等产品方向的需求分析和产品设计；
2. 协同算法、研发、运营和客服团队推进产品落地；
3. 通过数据指标评估上线效果，持续优化用户体验和业务效率；
4. 负责竞品分析、用户调研、需求优先级管理和项目推进。

任职要求：
1. 3 年以上 B 端或 SaaS 产品经验；
2. 熟悉 AI 应用、NLP、知识库或客服系统优先；
3. 具备较强的数据分析、逻辑表达和跨部门沟通能力；
4. 能独立完成 PRD、原型和项目推进。`;

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll("[data-view], [data-view-link]");

function activateView(viewId) {
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const view = item.dataset.view || item.dataset.viewLink;
    if (view) activateView(view);
  });
});

document.getElementById("loadSample").addEventListener("click", () => {
  document.getElementById("jdInput").value = sampleJd;
  activateView("jd");
});

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const jd = document.getElementById("jdInput").value.trim();
  const result = document.getElementById("analysisResult");

  if (!jd) {
    result.innerHTML = "请先粘贴岗位 JD。";
    return;
  }

  document.getElementById("roleTitle").textContent = jd.includes("AI") ? "AI 产品经理" : "目标岗位";
  document.getElementById("score").textContent = "89%";
  document.getElementById("skillScore").textContent = "92%";
  document.getElementById("projectScore").textContent = "88%";
  document.getElementById("evidenceScore").textContent = "81%";
  result.className = "analysis-block";
  result.innerHTML = `
    <strong>核心能力</strong>
    <ul>
      <li>AI 应用落地、知识库、智能客服产品经验</li>
      <li>B 端需求分析、PRD、项目推进</li>
      <li>数据指标评估和跨部门协同</li>
    </ul>
    <strong>简历优化建议</strong>
    <ul>
      <li>将智能客服知识库项目放到第一位。</li>
      <li>突出“重复咨询量下降 28%”这个结果指标。</li>
      <li>补充模型效果评估、人工接管率、知识命中率等表达。</li>
    </ul>
    <strong>缺口提醒</strong>
    <ul>
      <li>JD 强调 AI 效果评估，但资料库缺少知识命中率的真实数据。</li>
      <li>建议补充一次跨部门推进的 STAR 案例，用于面试追问。</li>
    </ul>
  `;
});

document.getElementById("parseResumeBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("resumeFile");
  const pastedText = document.getElementById("oldResumeText").value.trim();
  const importTitle = document.getElementById("importTitle");
  const importResult = document.getElementById("importResult");
  const hasFile = fileInput.files && fileInput.files.length > 0;

  if (!hasFile && !pastedText) {
    importResult.innerHTML = "请上传文件或粘贴旧简历文本。";
    return;
  }

  importTitle.textContent = "已生成资料库草稿";
  importResult.className = "analysis-block";
  importResult.innerHTML = `
    <strong>自动识别</strong>
    <ul>
      <li>基础信息：姓名、城市、求职方向</li>
      <li>项目经历：智能客服知识库、销售线索管理系统</li>
      <li>技能标签：AI 产品、SaaS、数据分析、项目推进</li>
      <li>量化成果：重复咨询量下降 28%</li>
    </ul>
    <strong>需要确认</strong>
    <ul>
      <li>“提升效率明显”缺少具体数据，暂不写入最终简历。</li>
      <li>“熟悉大模型应用”需要补充真实项目场景。</li>
    </ul>
  `;
});

document.getElementById("optimizeBtn").addEventListener("click", () => {
  document.getElementById("summaryText").textContent =
    "5 年 B 端和 AI 产品经验，曾主导智能客服知识库与销售线索系统建设，擅长将复杂业务流程抽象为可落地的产品方案，并通过命中率、接管率、转化漏斗等指标持续验证效果。";
});

document.getElementById("exportBtn").addEventListener("click", () => {
  window.print();
});

document.getElementById("reviewBtn").addEventListener("click", () => {
  const output = document.getElementById("reviewOutput");
  output.innerHTML = `
    <p class="eyebrow">AI 复盘</p>
    <h2>下次重点补强指标解释</h2>
    <p>这次面试的主要短板不是项目经历不足，而是 AI 产品效果评估的表达不够具体。建议你在简历和自我介绍中补充知识命中率、人工接管率、重复咨询下降比例这三类指标，并准备一个 90 秒版本的项目复盘。</p>
    <button class="light-btn" data-view-link="resume">同步优化简历</button>
  `;
  output.querySelector("button").addEventListener("click", () => {
    document.getElementById("summaryText").textContent =
      "5 年 B 端和 AI 产品经验，曾主导智能客服知识库与销售线索系统建设，能围绕知识命中率、人工接管率和重复咨询下降比例评估 AI 产品效果，并推动算法、客服和运营团队持续优化。";
    document.getElementById("profileBacklog").classList.add("warning-card");
    const backlog = document.getElementById("reviewBacklog");
    if (backlog) {
      const item = document.createElement("label");
      item.innerHTML = "<input type=\"checkbox\" /> 将“AI 效果评估”补充为可复用项目回答";
      backlog.prepend(item);
    }
    activateView("resume");
  });
});

document.getElementById("addApplicationBtn").addEventListener("click", () => {
  const rows = document.getElementById("applicationRows");
  const row = document.createElement("tr");
  row.innerHTML = "<td>新公司</td><td>目标岗位</td><td>待投递</td><td>待确认</td><td>定制简历草稿</td><td>补充 JD</td>";
  rows.prepend(row);
});

document.getElementById("applyBigTechMode").addEventListener("click", () => {
  document.getElementById("summaryText").textContent =
    "5 年 B 端产品经验，主导 AI 知识库与 CRM 流程系统建设，擅长需求拆解、跨部门推进和基于指标的产品迭代；代表项目使重复咨询量下降 28%，并沉淀可复用的配置后台和数据看板。";
  activateView("resume");
});

document.getElementById("addStarBtn").addEventListener("click", () => {
  const grid = document.getElementById("starGrid");
  const item = document.createElement("article");
  item.innerHTML = `
    <strong>Ownership</strong>
    <p>围绕销售线索管理系统，讲清你如何主动统一销售阶段定义、推动团队接受新流程，并用转化漏斗验证上线效果。</p>
    <span>证据强度：中</span>
  `;
  grid.prepend(item);
});
