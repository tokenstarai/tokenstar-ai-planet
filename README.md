# TokenStar · AI星球

> **OpenClaw 中国生态门户** — 聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动

---

## 项目概览

TokenStar · AI星球 是一个完整的内容门户平台，采用现代化的前后端分离架构：

| 层级 | 技术栈 | 说明 |
|------|--------|------|
| 前端 | Next.js 14 (App Router) + TypeScript + TailwindCSS | SSR/SSG，SEO 友好 |
| 后端 | Payload CMS 3.x + Express | Headless CMS，REST API |
| 数据库 | PostgreSQL | 生产级关系型数据库 |

---

## 目录结构

```
tokenstar/
├── frontend/                   # Next.js 前端
│   ├── app/                    # 页面路由（App Router）
│   │   ├── page.tsx            # 首页
│   │   ├── openclaw/           # OpenClaw 介绍页
│   │   ├── news/               # 新闻中心（列表 + 详情）
│   │   ├── knowledge/          # 知识库（列表 + 详情）
│   │   ├── skills/             # Skills 市场（列表 + 详情）
│   │   ├── cases/              # 案例中心（列表 + 详情）
│   │   ├── hardware/           # 硬件 & 云方案（列表 + 详情）
│   │   ├── events/             # 培训活动（列表 + 详情 + 报名）
│   │   ├── blog/               # Blog（列表 + 详情）
│   │   ├── about/              # 关于 / 合作 / 联系
│   │   ├── search/             # 全站搜索
│   │   ├── sitemap.ts          # 自动生成 sitemap.xml
│   │   └── robots.ts           # 自动生成 robots.txt
│   ├── components/
│   │   ├── layout/             # Navbar（含搜索框）、Footer
│   │   └── ui/                 # ContentCard、Pagination、SectionHeader
│   ├── lib/
│   │   ├── api.ts              # Payload CMS API 客户端
│   │   └── mock-data.ts        # 示例数据（无后端时使用）
│   ├── types/index.ts          # TypeScript 类型定义
│   ├── .env.local              # 前端环境变量
│   └── next.config.js
│
├── backend/                    # Payload CMS 后端
│   ├── src/
│   │   ├── collections/        # 内容模型定义
│   │   │   ├── Users.ts        # 用户
│   │   │   ├── Media.ts        # 媒体文件
│   │   │   ├── Categories.ts   # 分类
│   │   │   ├── Tags.ts         # 标签
│   │   │   ├── News.ts         # 新闻
│   │   │   ├── KnowledgeBase.ts # 知识库
│   │   │   ├── Blogs.ts        # Blog
│   │   │   ├── Cases.ts        # 案例
│   │   │   ├── Skills.ts       # Skills
│   │   │   ├── Hardware.ts     # 硬件 & 云方案
│   │   │   ├── Events.ts       # 培训活动
│   │   │   ├── Signups.ts      # 活动报名
│   │   │   └── shared-fields.ts # 通用字段
│   │   ├── payload.config.ts   # Payload 主配置
│   │   ├── server.ts           # Express 服务器（含 CSV 导出 API）
│   │   └── seed.ts             # 示例数据种子脚本
│   ├── .env                    # 后端环境变量
│   └── package.json
│
└── README.md                   # 本文档
```

---

## 快速开始

### 环境要求

- **Node.js** v18.x 或更高版本
- **npm** v9.x 或更高版本
- **PostgreSQL** v14 或更高版本

---

### 第一步：数据库配置

```bash
# 启动 PostgreSQL 服务
sudo service postgresql start

# 创建数据库和用户
sudo -u postgres psql << 'EOF'
CREATE DATABASE tokenstar_db;
CREATE USER strapi_user WITH PASSWORD 'strapi_password';
GRANT ALL PRIVILEGES ON DATABASE tokenstar_db TO strapi_user;
ALTER DATABASE tokenstar_db OWNER TO strapi_user;
EOF
```

---

### 第二步：启动后端（Payload CMS）

```bash
cd tokenstar/backend

# 安装依赖
npm install

# 配置环境变量（根据实际情况修改）
cp .env .env.local
# 编辑 .env.local，修改 DATABASE_URL 和 PAYLOAD_SECRET

# 启动开发服务器
npm run dev
```

后端启动后：
- **管理后台**: http://localhost:3000/admin
- **REST API**: http://localhost:3000/api
- **CSV 导出**: http://localhost:3000/api/export/signups

**首次启动**会自动提示创建管理员账户，填写邮箱和密码即可。

#### 填充示例数据（可选）

```bash
npm run seed
```

> ⚠️ 注意：seed 脚本会清空现有数据，请谨慎在生产环境使用。

---

### 第三步：启动前端（Next.js）

```bash
cd tokenstar/frontend

# 安装依赖
npm install

# 配置环境变量
cat > .env.local << 'EOF'
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
EOF

# 启动开发服务器（端口 3001，避免与后端冲突）
npm run dev -- -p 3001
```

访问 **http://localhost:3001** 查看网站。

---

## 内容管理

### 后台操作

访问 http://localhost:3000/admin 进入 Payload CMS 管理后台。

| 功能 | 操作说明 |
|------|----------|
| 首页推荐内容 | 编辑任意内容，勾选 `featured` 字段即可在首页显示 |
| 发布/草稿 | 通过 `status` 字段控制内容是否公开 |
| 分类管理 | 在「分类管理」中独立管理各内容类型的分类 |
| 标签管理 | 在「标签管理」中独立管理标签 |
| 报名管理 | 在「报名管理」中查看活动报名，支持按活动筛选 |

### 导出报名数据

```bash
# 导出全部报名数据
curl http://localhost:3000/api/export/signups -o signups.csv

# 按活动 ID 筛选导出
curl "http://localhost:3000/api/export/signups?event=<eventId>" -o signups_event.csv
```

---

## SEO 功能

| 功能 | 实现方式 |
|------|----------|
| sitemap.xml | 访问 `/sitemap.xml` 自动生成，包含所有内容页面 |
| robots.txt | 访问 `/robots.txt` 自动生成 |
| Meta Tags | 每个页面自动输出 `title`、`description`、OG Tags |
| 结构化数据 | 支持 JSON-LD（可在各页面扩展） |

---

## 内容模型说明

### 通用字段（News / KnowledgeBase / Blog / Case）

| 字段 | 类型 | 说明 |
|------|------|------|
| title | text | 标题 |
| slug | text (unique) | URL 标识符 |
| summary | textarea | 摘要 |
| cover_image | upload | 封面图片 |
| content | richText | 正文内容 |
| category | relationship | 关联分类 |
| tags | relationship | 关联标签（多对多） |
| seo_title | text | SEO 标题 |
| seo_description | textarea | SEO 描述 |
| featured | checkbox | 是否推荐（首页展示） |
| status | select | draft / published |
| published_at | date | 发布时间 |

### Skills 额外字段

| 字段 | 类型 | 说明 |
|------|------|------|
| install_guide | richText | 安装指南 |
| usage_examples | richText | 使用示例 |
| repo_link | text | 代码仓库链接 |
| version | text | 版本号 |

### Hardware 额外字段

| 字段 | 类型 | 说明 |
|------|------|------|
| scenario | textarea | 适用场景 |
| configuration | richText | 硬件配置规格 |
| selling_points | array | 核心卖点列表 |
| buy_link | text | 购买链接（"立即购买"按钮跳转） |

### Event 模型字段

| 字段 | 类型 | 说明 |
|------|------|------|
| type | select | public / bootcamp / enterprise |
| status | select | upcoming / open / finished |
| start_time / end_time | date | 活动时间 |
| location | text | 活动地点 |
| signup_deadline | date | 报名截止时间 |
| agenda | richText | 活动议程 |
| gallery | array | 活动图集（多图） |
| recap_content | richText | 活动回顾 |

### Signup 模型字段

| 字段 | 类型 | 说明 |
|------|------|------|
| event | relationship | 关联活动 |
| name / phone / email | text | 报名人信息 |
| company / role | text | 公司和职位 |
| note | textarea | 备注 |
| status | select | new / contacted / confirmed |

---

## 生产环境部署

### 后端生产部署

```bash
cd tokenstar/backend

# 修改 .env 中的配置
# DATABASE_URL=postgresql://user:password@prod-host:5432/tokenstar_db
# PAYLOAD_SECRET=<随机强密码，至少 32 位>
# NODE_ENV=production

# 构建
npm run build

# 使用 PM2 启动
npm install -g pm2
pm2 start dist/server.js --name tokenstar-backend
pm2 save
```

### 前端生产部署

```bash
cd tokenstar/frontend

# 修改 .env.local
# NEXT_PUBLIC_PAYLOAD_URL=https://api.yourdomain.com
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# 构建
npm run build

# 启动
npm start
# 或使用 PM2
pm2 start npm --name tokenstar-frontend -- start
```

### Docker 部署（可选）

项目支持 Docker 容器化部署，建议使用 docker-compose 同时管理前端、后端和数据库服务。

---

## 阶段二扩展计划

| 功能 | 说明 |
|------|------|
| Meilisearch 全文搜索 | 替换当前的前端过滤搜索，接入 Meilisearch 实现毫秒级全文检索 |
| 评论系统 | 基于 Payload CMS 扩展评论内容模型 |
| 用户中心 | 开发者注册、收藏、学习进度追踪 |
| Skills 市场 | 支持 Skills 在线安装、评分、评论 |
| 多语言支持 | 中英文双语内容管理 |

---

## 联系与支持

- **官网**: https://tokenstar.ai
- **邮箱**: hello@tokenstar.ai
- **GitHub**: https://github.com/tokenstar-ai

---

© 2026 TokenStar · AI星球. All rights reserved.
