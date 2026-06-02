# 技术实现说明

## 1. MVP 架构

推荐从单体 Web 应用开始：

- Next.js：页面、API Route、服务端渲染
- PostgreSQL：结构化数据
- Prisma：数据库 ORM
- OpenAI API：JD 解析、简历生成、复盘总结
- Playwright：HTML 转 PDF
- Supabase Storage 或 R2：PDF、上传简历文件

## 2. 核心数据表

### users

- id
- name
- email
- created_at

### experiences

- id
- user_id
- type
- title
- organization
- role
- start_date
- end_date
- description
- achievements
- skills
- tags

### evidence_sources

- id
- user_id
- source_type
- source_title
- raw_text
- file_url
- created_at

### job_descriptions

- id
- user_id
- company
- role_title
- raw_text
- parsed_json
- created_at

### resume_versions

- id
- user_id
- jd_id
- title
- content_json
- evidence_map_json
- match_score
- pdf_url
- created_at

### applications

- id
- user_id
- jd_id
- resume_id
- company
- role_title
- channel
- status
- next_step
- notes
- created_at

### interview_reviews

- id
- user_id
- application_id
- round
- questions_json
- review_json
- created_at

### improvement_backlogs

- id
- user_id
- source_type
- source_id
- title
- description
- status
- created_at

## 3. 关键 API

- POST `/api/import-resume`
- POST `/api/analyze-jd`
- POST `/api/generate-resume`
- POST `/api/verify-evidence`
- POST `/api/export-pdf`
- POST `/api/applications`
- POST `/api/interview-reviews`

## 4. PDF 方案

建议使用 HTML 模板生成 PDF：

1. 简历内容保存为 JSON
2. 服务端渲染为固定 HTML
3. Playwright 打开 HTML
4. 输出 A4 PDF
5. 保存到对象存储

优点：

- 样式控制好
- 与网页预览一致
- 适合多模板扩展

## 5. 事实依据链实现

每条生成内容保留 evidence_id：

```json
{
  "sentence": "重复咨询量下降 28%",
  "evidence_id": "ev_001",
  "source_title": "智能客服知识库搭建"
}
```

导出前执行校验：

- 关键事实有 evidence_id：允许导出
- 缺少 evidence_id：要求用户确认或删除
- AI 推测：只能进入建议区

