# AI 能力设计与 Prompt 草案

## 1. 总原则

AI 只能基于用户资料库、旧简历解析结果、JD 原文和面试复盘生成内容。

禁止：

- 编造公司、职位、学校、项目
- 编造时间
- 编造量化指标
- 把推测内容写成事实

允许：

- 改写表达
- 调整顺序
- 提炼重点
- 将用户已有经历映射到 JD 关键词
- 提醒用户补充缺失证据

## 2. 旧简历解析 Prompt

任务：

把用户上传或粘贴的旧简历解析成结构化资料库草稿。

输出 JSON：

```json
{
  "basic_info": {},
  "education": [],
  "work_experiences": [],
  "projects": [],
  "skills": [],
  "achievements": [],
  "portfolio_links": [],
  "uncertain_items": [
    {
      "text": "提升效率明显",
      "reason": "缺少具体指标或上下文",
      "suggested_question": "请补充提升了什么效率，提升幅度是多少"
    }
  ]
}
```

## 3. JD 解析 Prompt

任务：

从岗位 JD 中提取岗位画像。

输出 JSON：

```json
{
  "company": "",
  "role_title": "",
  "role_type": "",
  "seniority": "",
  "responsibilities": [],
  "required_skills": [],
  "bonus_skills": [],
  "keywords": [],
  "business_context": "",
  "interview_focus": []
}
```

## 4. 经历匹配 Prompt

任务：

根据 JD 和用户资料库，找出最相关的经历，并解释原因。

输出 JSON：

```json
{
  "match_score": 0,
  "matched_experiences": [
    {
      "experience_id": "",
      "reason": "",
      "matched_keywords": [],
      "evidence_strength": "strong"
    }
  ],
  "gaps": [],
  "resume_strategy": []
}
```

## 5. 简历生成 Prompt

任务：

生成一份岗位定制简历草稿。

硬性规则：

- 每条关键表达必须附带 evidence_id
- 没有 evidence_id 的内容放入 suggestions，不进入 resume_content
- 量化指标必须来自资料库

输出 JSON：

```json
{
  "resume_content": {
    "summary": "",
    "skills": [],
    "experiences": []
  },
  "evidence_map": [
    {
      "sentence": "",
      "evidence_id": "",
      "source_title": ""
    }
  ],
  "suggestions": [
    {
      "text": "",
      "reason": "缺少原始依据"
    }
  ]
}
```

## 6. 事实依据校验 Prompt

任务：

检查简历草稿中的关键表达是否有资料库依据。

输出 JSON：

```json
{
  "verified_items": [],
  "risky_items": [
    {
      "sentence": "",
      "risk": "metric_not_found",
      "action": "ask_user_to_confirm"
    }
  ],
  "safe_to_export": false
}
```

## 7. 面试复盘 Prompt

任务：

根据面试问题、用户回答表现和目标岗位，生成复盘与反哺建议。

输出 JSON：

```json
{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "resume_updates": [],
  "profile_backlog": [],
  "next_interview_plan": [],
  "reusable_star_answers": []
}
```

