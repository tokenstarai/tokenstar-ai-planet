import payload from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const seed = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'tokenstar_secret_2026',
    local: true,
  })

  console.log('🌱 Starting seed...')

  // ==================== Categories ====================
  const categories = [
    { name: '产品动态', slug: 'product', type_scope: 'news', order: 1 },
    { name: '合作动态', slug: 'partnership', type_scope: 'news', order: 2 },
    { name: '生态动态', slug: 'ecosystem', type_scope: 'news', order: 3 },
    { name: '技术动态', slug: 'tech', type_scope: 'news', order: 4 },
    { name: '活动公告', slug: 'event-news', type_scope: 'news', order: 5 },
    { name: '入门教程', slug: 'beginner', type_scope: 'kb', order: 1 },
    { name: '开发指南', slug: 'dev-guide', type_scope: 'kb', order: 2 },
    { name: '实战教程', slug: 'practice', type_scope: 'kb', order: 3 },
    { name: 'API 文档', slug: 'api-docs', type_scope: 'kb', order: 4 },
    { name: '运维指南', slug: 'ops', type_scope: 'kb', order: 5 },
    { name: '技术洞察', slug: 'insights', type_scope: 'blog', order: 1 },
    { name: '行业观察', slug: 'industry', type_scope: 'blog', order: 2 },
    { name: '技术深度', slug: 'tech-deep', type_scope: 'blog', order: 3 },
    { name: '金融', slug: 'finance', type_scope: 'case', order: 1 },
    { name: '医疗', slug: 'healthcare', type_scope: 'case', order: 2 },
    { name: '制造', slug: 'manufacturing', type_scope: 'case', order: 3 },
    { name: '电商', slug: 'ecommerce', type_scope: 'case', order: 4 },
  ]

  const createdCategories: Record<string, any> = {}
  for (const cat of categories) {
    try {
      const result = await payload.create({
        collection: 'categories',
        data: cat,
      })
      createdCategories[cat.slug] = result
      console.log(`✅ Category: ${cat.name}`)
    } catch (e) {
      console.log(`⚠️  Category already exists: ${cat.name}`)
    }
  }

  // ==================== Tags ====================
  const tags = [
    { name: 'OpenClaw', slug: 'openclaw' },
    { name: '多模态', slug: 'multimodal' },
    { name: 'RAG', slug: 'rag' },
    { name: 'Skills', slug: 'skills' },
    { name: '企业版', slug: 'enterprise' },
    { name: '搜索', slug: 'search' },
    { name: '代码执行', slug: 'code' },
    { name: '自动化', slug: 'automation' },
    { name: '文档处理', slug: 'document' },
    { name: '视觉', slug: 'vision' },
    { name: '数据库', slug: 'database' },
    { name: 'API', slug: 'api' },
    { name: '部署', slug: 'deploy' },
    { name: '入门', slug: 'beginner' },
  ]

  const createdTags: Record<string, any> = {}
  for (const tag of tags) {
    try {
      const result = await payload.create({
        collection: 'tags',
        data: tag,
      })
      createdTags[tag.slug] = result
      console.log(`✅ Tag: ${tag.name}`)
    } catch (e) {
      console.log(`⚠️  Tag already exists: ${tag.name}`)
    }
  }

  // ==================== News ====================
  const newsData = [
    {
      title: 'OpenClaw 2.0 正式发布：全新多模态能力突破',
      slug: 'openclaw-2-0-release',
      summary: 'OpenClaw 2.0 带来革命性的多模态处理能力，支持视觉、语音、文本三模态融合推理，推理速度提升 300%。',
      featured: true,
      status: 'published',
      published_at: '2026-02-20T08:00:00.000Z',
    },
    {
      title: 'TokenStar 与华为云达成战略合作，共建 AI 基础设施',
      slug: 'tokenstar-huawei-partnership',
      summary: 'TokenStar 与华为云签署战略合作协议，将在昇腾 AI 芯片上优化 OpenClaw 推理性能，打造国产 AI 完整解决方案。',
      featured: true,
      status: 'published',
      published_at: '2026-02-18T08:00:00.000Z',
    },
    {
      title: 'OpenClaw Skills 生态突破 500 个，开发者社区活跃度创新高',
      slug: 'skills-ecosystem-500',
      summary: 'OpenClaw Skills 生态系统正式突破 500 个技能包，覆盖金融、医疗、教育、制造等 20+ 行业垂直场景。',
      featured: false,
      status: 'published',
      published_at: '2026-02-15T08:00:00.000Z',
    },
    {
      title: 'OpenClaw 企业版正式支持私有化部署与数据隔离',
      slug: 'enterprise-private-deploy',
      summary: '企业版新增完整私有化部署方案，支持内网离线运行，数据完全不出域，满足金融、政务等高安全级别场景需求。',
      featured: false,
      status: 'published',
      published_at: '2026-02-10T08:00:00.000Z',
    },
    {
      title: '2026 OpenClaw 开发者大会议程正式公布',
      slug: 'devcon-2026-agenda',
      summary: '2026 OpenClaw 开发者大会将于 3 月 15 日在北京举办，汇聚 50+ 技术专家，共探 AI Agent 未来。',
      featured: false,
      status: 'published',
      published_at: '2026-02-08T08:00:00.000Z',
    },
    {
      title: 'OpenClaw RAG 2.0 知识库检索精度提升至 98.7%',
      slug: 'rag-2-0-accuracy',
      summary: 'OpenClaw RAG 2.0 采用全新混合检索架构，在企业知识库场景下检索精度达到 98.7%，较上一版本提升 15 个百分点。',
      featured: false,
      status: 'published',
      published_at: '2026-02-05T08:00:00.000Z',
    },
  ]

  for (const item of newsData) {
    try {
      await payload.create({ collection: 'news', data: item })
      console.log(`✅ News: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  News already exists: ${item.title}`)
    }
  }

  // ==================== Skills ====================
  const skillsData = [
    {
      title: 'Web Search Pro',
      slug: 'web-search-pro',
      summary: '增强型网络搜索技能，支持多引擎聚合、结果去重与智能摘要，适用于信息收集与竞品分析场景。',
      version: '2.1.0',
      repo_link: 'https://github.com/openclaw/skill-web-search-pro',
      featured: true,
      status: 'published',
      published_at: '2026-02-01T08:00:00.000Z',
    },
    {
      title: 'Code Executor',
      slug: 'code-executor',
      summary: '安全沙箱代码执行技能，支持 Python/JS/Shell，内置超时控制与资源限制，适合数据分析与自动化任务。',
      version: '1.5.2',
      repo_link: 'https://github.com/openclaw/skill-code-executor',
      featured: true,
      status: 'published',
      published_at: '2026-02-01T08:00:00.000Z',
    },
    {
      title: 'Document Parser',
      slug: 'document-parser',
      summary: '多格式文档解析技能，支持 PDF/Word/Excel/PPT，自动提取结构化内容，支持表格识别与公式解析。',
      version: '3.0.1',
      repo_link: 'https://github.com/openclaw/skill-doc-parser',
      featured: true,
      status: 'published',
      published_at: '2026-01-28T08:00:00.000Z',
    },
    {
      title: 'Email Assistant',
      slug: 'email-assistant',
      summary: '智能邮件处理技能，支持邮件读取、分类、回复草稿生成，集成 Gmail/Outlook，提升邮件处理效率 80%。',
      version: '1.2.0',
      repo_link: 'https://github.com/openclaw/skill-email',
      featured: false,
      status: 'published',
      published_at: '2026-01-25T08:00:00.000Z',
    },
    {
      title: 'Database Query',
      slug: 'database-query',
      summary: '自然语言数据库查询技能，支持 MySQL/PostgreSQL/MongoDB，将自然语言转换为 SQL/NoSQL 查询语句。',
      version: '2.0.0',
      repo_link: 'https://github.com/openclaw/skill-db-query',
      featured: true,
      status: 'published',
      published_at: '2026-01-22T08:00:00.000Z',
    },
    {
      title: 'Image Analysis',
      slug: 'image-analysis',
      summary: '多模态图像分析技能，支持图像描述、目标检测、OCR 文字识别、图表数据提取，基于 OpenClaw Vision 模型。',
      version: '1.8.0',
      repo_link: 'https://github.com/openclaw/skill-image-analysis',
      featured: false,
      status: 'published',
      published_at: '2026-01-20T08:00:00.000Z',
    },
    {
      title: 'Calendar Manager',
      slug: 'calendar-manager',
      summary: '智能日历管理技能，支持会议安排、提醒设置、冲突检测，集成 Google Calendar 与企业微信日历。',
      version: '1.0.3',
      repo_link: 'https://github.com/openclaw/skill-calendar',
      featured: false,
      status: 'published',
      published_at: '2026-01-18T08:00:00.000Z',
    },
    {
      title: 'API Connector',
      slug: 'api-connector',
      summary: '通用 API 连接技能，支持 REST/GraphQL，自动解析 OpenAPI 文档，一键接入任意第三方服务。',
      version: '2.3.0',
      repo_link: 'https://github.com/openclaw/skill-api-connector',
      featured: false,
      status: 'published',
      published_at: '2026-01-15T08:00:00.000Z',
    },
    {
      title: 'Data Visualization',
      slug: 'data-visualization',
      summary: '数据可视化技能，支持生成折线图、柱状图、饼图、热力图等，输出高质量 PNG/SVG 图表文件。',
      version: '1.4.0',
      repo_link: 'https://github.com/openclaw/skill-data-viz',
      featured: false,
      status: 'published',
      published_at: '2026-01-12T08:00:00.000Z',
    },
    {
      title: 'Browser Automation',
      slug: 'browser-automation',
      summary: '浏览器自动化技能，支持网页操作、表单填写、数据抓取，基于 Playwright 引擎，支持无头模式运行。',
      version: '3.1.0',
      repo_link: 'https://github.com/openclaw/skill-browser',
      featured: true,
      status: 'published',
      published_at: '2026-01-10T08:00:00.000Z',
    },
  ]

  for (const item of skillsData) {
    try {
      await payload.create({ collection: 'skills', data: item })
      console.log(`✅ Skill: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  Skill already exists: ${item.title}`)
    }
  }

  // ==================== Events ====================
  const eventsData = [
    {
      title: 'OpenClaw 开发者大会 2026',
      slug: 'devcon-2026',
      type: 'public',
      status: 'open',
      start_time: '2026-03-15T09:00:00.000Z',
      end_time: '2026-03-15T18:00:00.000Z',
      location: '北京国家会议中心',
      signup_deadline: '2026-03-10T23:59:59.000Z',
      summary: '年度最大规模 AI 开发者盛会，汇聚 50+ 技术专家，共探 AI Agent 未来发展趋势。',
      featured: true,
    },
    {
      title: 'OpenClaw 企业 AI 训练营（第 3 期）',
      slug: 'bootcamp-3',
      type: 'bootcamp',
      status: 'upcoming',
      start_time: '2026-04-01T09:00:00.000Z',
      end_time: '2026-04-03T18:00:00.000Z',
      location: '上海张江 AI 园区',
      signup_deadline: '2026-03-25T23:59:59.000Z',
      summary: '三天密集训练营，从零到一掌握 OpenClaw 企业级应用开发，含实战项目与专家辅导。',
      featured: true,
    },
    {
      title: 'OpenClaw 深圳城市沙龙',
      slug: 'shenzhen-salon-2026',
      type: 'public',
      status: 'finished',
      start_time: '2026-01-20T14:00:00.000Z',
      end_time: '2026-01-20T18:00:00.000Z',
      location: '深圳南山科技园',
      signup_deadline: '2026-01-18T23:59:59.000Z',
      summary: '深圳城市开发者沙龙，聚焦 AI Agent 在硬件与 IoT 场景的创新应用，已圆满结束。',
      featured: false,
    },
  ]

  for (const item of eventsData) {
    try {
      await payload.create({ collection: 'events', data: item })
      console.log(`✅ Event: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  Event already exists: ${item.title}`)
    }
  }

  // ==================== Hardware ====================
  const hardwareData = [
    {
      title: 'OpenClaw Box Pro',
      slug: 'openclaw-box-pro',
      summary: '企业级 AI 推理一体机，搭载 NVIDIA A100 40GB，支持 OpenClaw 全系列模型本地部署，开箱即用。',
      scenario: '适用于金融、医疗、政务等对数据安全要求极高的企业客户，支持完全离线运行。',
      buy_link: 'https://shop.tokenstar.ai/products/openclaw-box-pro',
      price_label: '¥198,000 起',
      featured: true,
      status: 'published',
      published_at: '2026-02-01T08:00:00.000Z',
      selling_points: [
        { title: '高性能推理', description: 'A100 40GB 显存，支持 70B 参数模型实时推理', icon: 'Zap' },
        { title: '开箱即用', description: '预装 OpenClaw 全套软件，30 分钟完成部署', icon: 'Package' },
        { title: '数据安全', description: '完全本地化运行，数据不出域', icon: 'Shield' },
      ],
    },
    {
      title: 'OpenClaw Mini',
      slug: 'openclaw-mini',
      summary: '轻量级 AI 推理盒子，搭载 NVIDIA RTX 4090，适合中小企业和开发者本地部署 OpenClaw 7B/13B 模型。',
      scenario: '适合中小企业、高校研究机构和个人开发者，性价比极高的本地 AI 部署方案。',
      buy_link: 'https://shop.tokenstar.ai/products/openclaw-mini',
      price_label: '¥29,800 起',
      featured: true,
      status: 'published',
      published_at: '2026-01-28T08:00:00.000Z',
      selling_points: [
        { title: '高性价比', description: 'RTX 4090 24GB，支持 13B 模型流畅推理', icon: 'TrendingUp' },
        { title: '体积小巧', description: '迷你机箱设计，桌面级部署', icon: 'Monitor' },
        { title: '低功耗', description: '整机功耗仅 350W，7×24 小时稳定运行', icon: 'Battery' },
      ],
    },
    {
      title: 'OpenClaw Cloud Starter',
      slug: 'openclaw-cloud-starter',
      summary: '阿里云托管版 OpenClaw，按需付费，无需硬件投入，5 分钟快速接入，适合初创团队和 PoC 验证。',
      scenario: '适合初创企业、快速验证场景，无需前期硬件投入，按 API 调用量付费。',
      buy_link: 'https://cloud.tokenstar.ai/starter',
      price_label: '按需付费',
      featured: true,
      status: 'published',
      published_at: '2026-01-25T08:00:00.000Z',
      selling_points: [
        { title: '零硬件投入', description: '云端托管，无需购买服务器', icon: 'Cloud' },
        { title: '按需付费', description: '按 API 调用量计费，灵活控制成本', icon: 'CreditCard' },
        { title: '快速接入', description: '5 分钟完成 API 接入，立即开始开发', icon: 'Rocket' },
      ],
    },
    {
      title: 'OpenClaw Cluster Enterprise',
      slug: 'openclaw-cluster-enterprise',
      summary: '大规模 AI 推理集群方案，支持横向扩展至 100+ 节点，适合大型企业和云服务商构建 AI 基础设施。',
      scenario: '适合大型企业、运营商和云服务商，构建高可用、高并发的 AI 推理基础设施。',
      buy_link: 'https://shop.tokenstar.ai/products/cluster-enterprise',
      price_label: '联系销售',
      featured: false,
      status: 'published',
      published_at: '2026-01-20T08:00:00.000Z',
      selling_points: [
        { title: '弹性扩展', description: '支持 10-1000 节点弹性扩缩容', icon: 'Network' },
        { title: '高可用', description: '99.99% SLA，自动故障转移', icon: 'Shield' },
        { title: '统一管理', description: '可视化集群管理控制台', icon: 'LayoutDashboard' },
      ],
    },
    {
      title: 'OpenClaw 昇腾版',
      slug: 'openclaw-ascend',
      summary: '基于华为昇腾 910B 的国产 AI 推理方案，完全自主可控，满足信创要求，性能媲美 A100。',
      scenario: '适合政府、央企、军工等对国产化有严格要求的客户，完全满足信创采购标准。',
      buy_link: 'https://shop.tokenstar.ai/products/openclaw-ascend',
      price_label: '联系销售',
      featured: false,
      status: 'published',
      published_at: '2026-01-15T08:00:00.000Z',
      selling_points: [
        { title: '完全国产化', description: '昇腾 910B 芯片，满足信创要求', icon: 'Flag' },
        { title: '高性能', description: '性能媲美 NVIDIA A100，推理速度快', icon: 'Zap' },
        { title: '完整生态', description: '支持 OpenClaw 全系列功能', icon: 'Layers' },
      ],
    },
    {
      title: 'OpenClaw 边缘推理盒',
      slug: 'openclaw-edge',
      summary: '专为边缘计算场景设计的轻量级推理设备，支持断网离线运行，适合工厂、医院、零售等场景。',
      scenario: '适合工厂车间、医院科室、零售门店等边缘场景，无需网络连接即可本地推理。',
      buy_link: 'https://shop.tokenstar.ai/products/openclaw-edge',
      price_label: '¥8,800 起',
      featured: false,
      status: 'published',
      published_at: '2026-01-10T08:00:00.000Z',
      selling_points: [
        { title: '断网可用', description: '完全离线运行，不依赖网络', icon: 'WifiOff' },
        { title: '工业级可靠', description: '宽温设计，IP65 防护等级', icon: 'Shield' },
        { title: '低延迟', description: '本地推理延迟 < 100ms', icon: 'Timer' },
      ],
    },
  ]

  for (const item of hardwareData) {
    try {
      await payload.create({ collection: 'hardware', data: item })
      console.log(`✅ Hardware: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  Hardware already exists: ${item.title}`)
    }
  }

  // ==================== Cases ====================
  const casesData = [
    {
      title: '某头部银行智能客服系统：接待量提升 400%',
      slug: 'bank-customer-service',
      summary: '基于 OpenClaw 构建的智能客服系统，日均接待量从 2 万次提升至 10 万次，客户满意度达 96%。',
      industry: '金融',
      featured: true,
      status: 'published',
      published_at: '2026-02-10T08:00:00.000Z',
    },
    {
      title: '三甲医院 AI 辅助诊断：诊断准确率提升至 97.3%',
      slug: 'hospital-ai-diagnosis',
      summary: '基于 OpenClaw 多模态能力构建的辅助诊断系统，在影像识别和病历分析方面达到专家级水平。',
      industry: '医疗',
      featured: true,
      status: 'published',
      published_at: '2026-02-05T08:00:00.000Z',
    },
    {
      title: '某制造企业 AI 质检系统：不良率降低 85%',
      slug: 'manufacturing-quality',
      summary: '利用 OpenClaw 视觉分析能力构建的自动化质检系统，实现 24 小时无人值守，产品不良率大幅降低。',
      industry: '制造',
      featured: false,
      status: 'published',
      published_at: '2026-01-28T08:00:00.000Z',
    },
    {
      title: '头部电商平台 AI 选品助手：GMV 提升 23%',
      slug: 'ecommerce-ai-selection',
      summary: '基于 OpenClaw 构建的智能选品与营销文案生成系统，帮助商家提升选品效率和转化率。',
      industry: '电商',
      featured: false,
      status: 'published',
      published_at: '2026-01-20T08:00:00.000Z',
    },
    {
      title: '某省级政务平台 AI 办事助手：办理时效提升 60%',
      slug: 'government-ai-service',
      summary: '基于 OpenClaw 构建的政务智能助手，支持自然语言查询政策、自动填写表单、进度跟踪等功能。',
      industry: '政务',
      featured: false,
      status: 'published',
      published_at: '2026-01-15T08:00:00.000Z',
    },
    {
      title: '在线教育平台 AI 学习助手：完课率提升 45%',
      slug: 'education-ai-tutor',
      summary: '基于 OpenClaw 构建的个性化学习助手，根据学生学习进度动态调整内容，显著提升学习效果。',
      industry: '教育',
      featured: false,
      status: 'published',
      published_at: '2026-01-10T08:00:00.000Z',
    },
  ]

  for (const item of casesData) {
    try {
      await payload.create({ collection: 'cases', data: item })
      console.log(`✅ Case: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  Case already exists: ${item.title}`)
    }
  }

  // ==================== Knowledge Base ====================
  const kbData = [
    {
      title: 'OpenClaw 快速入门指南',
      slug: 'quick-start',
      summary: '5 分钟快速上手 OpenClaw，从安装到运行第一个 AI Agent，适合零基础开发者。',
      featured: true,
      status: 'published',
      published_at: '2026-02-15T08:00:00.000Z',
    },
    {
      title: 'Skills 开发完全指南',
      slug: 'skills-development-guide',
      summary: '从零开始开发 OpenClaw Skills，包含 API 规范、测试方法、发布流程和最佳实践。',
      featured: true,
      status: 'published',
      published_at: '2026-02-12T08:00:00.000Z',
    },
    {
      title: 'OpenClaw 企业知识库搭建实战',
      slug: 'enterprise-knowledge-base',
      summary: '详细介绍如何基于 OpenClaw RAG 能力构建企业私有知识库，包含文档处理、向量化、检索优化全流程。',
      featured: false,
      status: 'published',
      published_at: '2026-02-08T08:00:00.000Z',
    },
    {
      title: 'Multi-Agent 协作架构设计',
      slug: 'multi-agent-architecture',
      summary: '深入解析 OpenClaw Multi-Agent 协作机制，包含任务分解、Agent 通信、结果聚合等核心概念。',
      featured: false,
      status: 'published',
      published_at: '2026-02-05T08:00:00.000Z',
    },
    {
      title: 'OpenClaw API 完整参考手册',
      slug: 'api-reference',
      summary: '完整的 OpenClaw API 参考文档，包含所有接口说明、参数定义、返回值格式和代码示例。',
      featured: false,
      status: 'published',
      published_at: '2026-02-01T08:00:00.000Z',
    },
    {
      title: 'OpenClaw 私有化部署运维手册',
      slug: 'private-deploy-ops',
      summary: '企业私有化部署完整运维指南，包含安装、配置、监控、备份、升级和故障排查全流程。',
      featured: false,
      status: 'published',
      published_at: '2026-01-28T08:00:00.000Z',
    },
  ]

  for (const item of kbData) {
    try {
      await payload.create({ collection: 'knowledge-base', data: item })
      console.log(`✅ KB: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  KB already exists: ${item.title}`)
    }
  }

  // ==================== Blogs ====================
  const blogsData = [
    {
      title: '2026 年 AI Agent 技术趋势深度解析',
      slug: '2026-ai-agent-trends',
      summary: '深度分析 2026 年 AI Agent 技术发展趋势，包括多模态融合、自主规划、工具使用和安全对齐等核心方向。',
      author: 'TokenStar 技术团队',
      featured: true,
      status: 'published',
      published_at: '2026-02-22T08:00:00.000Z',
    },
    {
      title: '从 RPA 到 AI Agent：企业自动化的范式转变',
      slug: 'rpa-to-ai-agent',
      summary: '深入探讨 AI Agent 如何替代传统 RPA，在复杂业务场景中实现更高层次的智能自动化。',
      author: 'TokenStar 技术团队',
      featured: false,
      status: 'published',
      published_at: '2026-02-18T08:00:00.000Z',
    },
    {
      title: '大模型推理优化：量化、蒸馏与投机解码',
      slug: 'llm-inference-optimization',
      summary: '系统介绍大模型推理优化技术，包括 INT4/INT8 量化、知识蒸馏和投机解码，帮助降低推理成本。',
      author: 'TokenStar 技术团队',
      featured: false,
      status: 'published',
      published_at: '2026-02-14T08:00:00.000Z',
    },
    {
      title: 'OpenClaw vs LangChain：企业级 AI Agent 框架对比',
      slug: 'openclaw-vs-langchain',
      summary: '全面对比 OpenClaw 与 LangChain 在性能、易用性、生态和企业支持方面的差异，帮助企业做出选型决策。',
      author: 'TokenStar 技术团队',
      featured: false,
      status: 'published',
      published_at: '2026-02-10T08:00:00.000Z',
    },
    {
      title: 'AI Agent 安全：提示词注入攻击与防御实践',
      slug: 'ai-agent-security',
      summary: '深入分析 AI Agent 面临的安全威胁，重点介绍提示词注入攻击原理及 OpenClaw 的防御机制。',
      author: 'TokenStar 安全团队',
      featured: false,
      status: 'published',
      published_at: '2026-02-06T08:00:00.000Z',
    },
    {
      title: '构建生产级 AI Agent：从 Demo 到企业落地的 10 个关键点',
      slug: 'production-ai-agent',
      summary: '分享将 AI Agent 从原型推向生产环境的实战经验，涵盖稳定性、可观测性、成本控制等关键维度。',
      author: 'TokenStar 技术团队',
      featured: false,
      status: 'published',
      published_at: '2026-02-02T08:00:00.000Z',
    },
  ]

  for (const item of blogsData) {
    try {
      await payload.create({ collection: 'blogs', data: item })
      console.log(`✅ Blog: ${item.title}`)
    } catch (e) {
      console.log(`⚠️  Blog already exists: ${item.title}`)
    }
  }

  console.log('\n🎉 Seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
