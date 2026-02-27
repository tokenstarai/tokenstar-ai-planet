// Mock data for demonstration when Strapi is not available
export const mockNews = [
  {
    id: 1, title: 'OpenClaw 2.0 正式发布：全新多模态能力突破', slug: 'openclaw-2-0-release',
    summary: 'OpenClaw 2.0 带来革命性的多模态处理能力，支持视觉、语音、文本三模态融合推理，推理速度提升 300%。',
    cover_image: null, featured: true, published_at: '2026-02-20T08:00:00Z',
    category: { name: '产品动态', slug: 'product' }, tags: [{ name: 'OpenClaw', slug: 'openclaw' }, { name: '多模态', slug: 'multimodal' }],
    content: '<p>OpenClaw 2.0 正式发布，这是一个里程碑式的版本更新...</p>'
  },
  {
    id: 2, title: 'TokenStar 与华为云达成战略合作，共建 AI 基础设施', slug: 'tokenstar-huawei-partnership',
    summary: 'TokenStar 与华为云签署战略合作协议，将在昇腾 AI 芯片上优化 OpenClaw 推理性能，打造国产 AI 完整解决方案。',
    cover_image: null, featured: true, published_at: '2026-02-18T08:00:00Z',
    category: { name: '合作动态', slug: 'partnership' }, tags: [{ name: '华为云', slug: 'huawei' }],
    content: '<p>战略合作详情...</p>'
  },
  {
    id: 3, title: 'OpenClaw Skills 生态突破 500 个，开发者社区活跃度创新高', slug: 'skills-ecosystem-500',
    summary: 'OpenClaw Skills 生态系统正式突破 500 个技能包，覆盖金融、医疗、教育、制造等 20+ 行业垂直场景。',
    cover_image: null, featured: true, published_at: '2026-02-15T08:00:00Z',
    category: { name: '生态动态', slug: 'ecosystem' }, tags: [{ name: 'Skills', slug: 'skills' }],
    content: '<p>生态详情...</p>'
  },
  {
    id: 4, title: 'OpenClaw 企业版正式支持私有化部署与数据隔离', slug: 'enterprise-private-deploy',
    summary: '企业版新增完整私有化部署方案，支持内网离线运行，数据完全不出域，满足金融、政务等高安全级别场景需求。',
    cover_image: null, featured: false, published_at: '2026-02-10T08:00:00Z',
    category: { name: '产品动态', slug: 'product' }, tags: [{ name: '企业版', slug: 'enterprise' }],
    content: '<p>企业版详情...</p>'
  },
  {
    id: 5, title: '2026 OpenClaw 开发者大会议程正式公布', slug: 'devcon-2026-agenda',
    summary: '2026 OpenClaw 开发者大会将于 3 月 15 日在北京举办，汇聚 50+ 技术专家，共探 AI Agent 未来。',
    cover_image: null, featured: false, published_at: '2026-02-08T08:00:00Z',
    category: { name: '活动公告', slug: 'event-news' }, tags: [{ name: '开发者大会', slug: 'devcon' }],
    content: '<p>大会详情...</p>'
  },
  {
    id: 6, title: 'OpenClaw RAG 2.0 知识库检索精度提升至 98.7%', slug: 'rag-2-0-accuracy',
    summary: 'OpenClaw RAG 2.0 采用全新混合检索架构，在企业知识库场景下检索精度达到 98.7%，较上一版本提升 15 个百分点。',
    cover_image: null, featured: false, published_at: '2026-02-05T08:00:00Z',
    category: { name: '技术动态', slug: 'tech' }, tags: [{ name: 'RAG', slug: 'rag' }],
    content: '<p>RAG 技术详情...</p>'
  },
]

export const mockSkills = [
  {
    id: 1, title: 'Web Search Pro', slug: 'web-search-pro',
    summary: '增强型网络搜索技能，支持多引擎聚合、结果去重与智能摘要，适用于信息收集与竞品分析场景。',
    version: '2.1.0', repo_link: 'https://github.com/openclaw/skill-web-search-pro', featured: true,
    tags: [{ name: '搜索', slug: 'search' }, { name: '信息收集', slug: 'info-gather' }],
    install_guide: '```bash\nopenclaw skill install web-search-pro\n```',
    usage_examples: '```python\nfrom openclaw import Agent\nagent = Agent(skills=["web-search-pro"])\n```',
    published_at: '2026-02-01T08:00:00Z'
  },
  {
    id: 2, title: 'Code Executor', slug: 'code-executor',
    summary: '安全沙箱代码执行技能，支持 Python/JS/Shell，内置超时控制与资源限制，适合数据分析与自动化任务。',
    version: '1.5.2', repo_link: 'https://github.com/openclaw/skill-code-executor', featured: true,
    tags: [{ name: '代码执行', slug: 'code' }, { name: '自动化', slug: 'automation' }],
    install_guide: '```bash\nopenclaw skill install code-executor\n```',
    usage_examples: '```python\nagent.run("分析这份 CSV 数据并生成图表")\n```',
    published_at: '2026-02-01T08:00:00Z'
  },
  {
    id: 3, title: 'Document Parser', slug: 'document-parser',
    summary: '多格式文档解析技能，支持 PDF/Word/Excel/PPT，自动提取结构化内容，支持表格识别与公式解析。',
    version: '3.0.1', repo_link: 'https://github.com/openclaw/skill-doc-parser', featured: true,
    tags: [{ name: '文档处理', slug: 'document' }],
    install_guide: '```bash\nopenclaw skill install document-parser\n```',
    usage_examples: '```python\nagent.run("解析这份合同并提取关键条款")\n```',
    published_at: '2026-01-28T08:00:00Z'
  },
  {
    id: 4, title: 'Email Assistant', slug: 'email-assistant',
    summary: '智能邮件处理技能，支持邮件读取、分类、回复草稿生成，集成 Gmail/Outlook，提升邮件处理效率 80%。',
    version: '1.2.0', repo_link: 'https://github.com/openclaw/skill-email', featured: false,
    tags: [{ name: '邮件', slug: 'email' }, { name: '办公自动化', slug: 'office' }],
    install_guide: '```bash\nopenclaw skill install email-assistant\n```',
    usage_examples: '```python\nagent.run("整理今天的重要邮件并起草回复")\n```',
    published_at: '2026-01-25T08:00:00Z'
  },
  {
    id: 5, title: 'Database Query', slug: 'database-query',
    summary: '自然语言数据库查询技能，支持 MySQL/PostgreSQL/MongoDB，将自然语言转换为 SQL/NoSQL 查询语句。',
    version: '2.0.0', repo_link: 'https://github.com/openclaw/skill-db-query', featured: true,
    tags: [{ name: '数据库', slug: 'database' }, { name: 'NL2SQL', slug: 'nl2sql' }],
    install_guide: '```bash\nopenclaw skill install database-query\n```',
    usage_examples: '```python\nagent.run("查询上个月销售额最高的 10 个产品")\n```',
    published_at: '2026-01-22T08:00:00Z'
  },
  {
    id: 6, title: 'Image Analysis', slug: 'image-analysis',
    summary: '多模态图像分析技能，支持图像描述、目标检测、OCR 文字识别、图表数据提取，基于 OpenClaw Vision 模型。',
    version: '1.8.0', repo_link: 'https://github.com/openclaw/skill-image-analysis', featured: false,
    tags: [{ name: '视觉', slug: 'vision' }, { name: 'OCR', slug: 'ocr' }],
    install_guide: '```bash\nopenclaw skill install image-analysis\n```',
    usage_examples: '```python\nagent.run("分析这张产品图片并生成描述文案")\n```',
    published_at: '2026-01-20T08:00:00Z'
  },
  {
    id: 7, title: 'Calendar Manager', slug: 'calendar-manager',
    summary: '智能日历管理技能，支持会议安排、提醒设置、冲突检测，集成 Google Calendar 与企业微信日历。',
    version: '1.0.3', repo_link: 'https://github.com/openclaw/skill-calendar', featured: false,
    tags: [{ name: '日历', slug: 'calendar' }, { name: '办公自动化', slug: 'office' }],
    install_guide: '```bash\nopenclaw skill install calendar-manager\n```',
    usage_examples: '```python\nagent.run("帮我安排下周三下午 2 点的产品评审会议")\n```',
    published_at: '2026-01-18T08:00:00Z'
  },
  {
    id: 8, title: 'API Connector', slug: 'api-connector',
    summary: '通用 API 连接技能，支持 REST/GraphQL，自动解析 OpenAPI 文档，一键接入任意第三方服务。',
    version: '2.3.0', repo_link: 'https://github.com/openclaw/skill-api-connector', featured: false,
    tags: [{ name: 'API', slug: 'api' }, { name: '集成', slug: 'integration' }],
    install_guide: '```bash\nopenclaw skill install api-connector\n```',
    usage_examples: '```python\nagent.run("调用天气 API 获取北京未来 7 天天气预报")\n```',
    published_at: '2026-01-15T08:00:00Z'
  },
  {
    id: 9, title: 'Data Visualization', slug: 'data-visualization',
    summary: '数据可视化技能，支持生成折线图、柱状图、饼图、热力图等，输出高质量 PNG/SVG 图表文件。',
    version: '1.4.0', repo_link: 'https://github.com/openclaw/skill-data-viz', featured: false,
    tags: [{ name: '数据可视化', slug: 'visualization' }, { name: '图表', slug: 'chart' }],
    install_guide: '```bash\nopenclaw skill install data-visualization\n```',
    usage_examples: '```python\nagent.run("将这份销售数据生成月度趋势折线图")\n```',
    published_at: '2026-01-12T08:00:00Z'
  },
  {
    id: 10, title: 'Browser Automation', slug: 'browser-automation',
    summary: '浏览器自动化技能，支持网页操作、表单填写、数据抓取，基于 Playwright 引擎，支持无头模式运行。',
    version: '3.1.0', repo_link: 'https://github.com/openclaw/skill-browser', featured: true,
    tags: [{ name: '浏览器', slug: 'browser' }, { name: '自动化', slug: 'automation' }],
    install_guide: '```bash\nopenclaw skill install browser-automation\n```',
    usage_examples: '```python\nagent.run("登录电商平台并抓取竞品价格数据")\n```',
    published_at: '2026-01-10T08:00:00Z'
  },
]

export const mockHardware = [
  {
    id: 1, title: 'OpenClaw Box Pro', slug: 'openclaw-box-pro',
    summary: '企业级 AI 推理一体机，搭载 NVIDIA A100 40GB，支持 OpenClaw 全系列模型本地部署，开箱即用。',
    scenario: '适用于金融、医疗、政务等对数据安全要求极高的企业客户，支持完全离线运行。',
    buy_link: 'https://shop.tokenstar.ai/products/openclaw-box-pro', featured: true,
    selling_points: [
      { title: '高性能推理', description: 'A100 40GB 显存，支持 70B 参数模型实时推理' },
      { title: '开箱即用', description: '预装 OpenClaw 全套软件，30 分钟完成部署' },
      { title: '数据安全', description: '完全本地化运行，数据不出域' },
    ],
    configuration: '<p><strong>处理器：</strong>Intel Xeon Gold 6338 × 2<br><strong>显卡：</strong>NVIDIA A100 40GB × 2<br><strong>内存：</strong>512GB DDR4 ECC<br><strong>存储：</strong>4TB NVMe SSD</p>',
    published_at: '2026-02-01T08:00:00Z'
  },
  {
    id: 2, title: 'OpenClaw Mini', slug: 'openclaw-mini',
    summary: '轻量级 AI 推理盒子，搭载 NVIDIA RTX 4090，适合中小企业和开发者本地部署 OpenClaw 7B/13B 模型。',
    scenario: '适合中小企业、高校研究机构和个人开发者，性价比极高的本地 AI 部署方案。',
    buy_link: 'https://shop.tokenstar.ai/products/openclaw-mini', featured: true,
    selling_points: [
      { title: '高性价比', description: 'RTX 4090 24GB，支持 13B 模型流畅推理' },
      { title: '体积小巧', description: '迷你机箱设计，桌面级部署' },
      { title: '低功耗', description: '整机功耗仅 350W，7×24 小时稳定运行' },
    ],
    configuration: '<p><strong>处理器：</strong>AMD Ryzen 9 7950X<br><strong>显卡：</strong>NVIDIA RTX 4090 24GB<br><strong>内存：</strong>128GB DDR5<br><strong>存储：</strong>2TB NVMe SSD</p>',
    published_at: '2026-01-28T08:00:00Z'
  },
  {
    id: 3, title: 'OpenClaw Cloud Starter', slug: 'openclaw-cloud-starter',
    summary: '阿里云托管版 OpenClaw，按需付费，无需硬件投入，5 分钟快速接入，适合初创团队和 PoC 验证。',
    scenario: '适合初创企业、快速验证场景，无需前期硬件投入，按 API 调用量付费。',
    buy_link: 'https://cloud.tokenstar.ai/starter', featured: true,
    selling_points: [
      { title: '零硬件投入', description: '云端托管，无需购买服务器' },
      { title: '按需付费', description: '按 API 调用量计费，灵活控制成本' },
      { title: '快速接入', description: '5 分钟完成 API 接入，立即开始开发' },
    ],
    configuration: '<p><strong>算力：</strong>阿里云 A10 GPU 集群<br><strong>SLA：</strong>99.9% 可用性保障<br><strong>延迟：</strong>P99 < 2s<br><strong>并发：</strong>支持 1000+ QPS</p>',
    published_at: '2026-01-25T08:00:00Z'
  },
  {
    id: 4, title: 'OpenClaw Cluster Enterprise', slug: 'openclaw-cluster-enterprise',
    summary: '大规模 AI 推理集群方案，支持横向扩展至 100+ 节点，适合大型企业和云服务商构建 AI 基础设施。',
    scenario: '适合大型企业、运营商和云服务商，构建高可用、高并发的 AI 推理基础设施。',
    buy_link: 'https://shop.tokenstar.ai/products/cluster-enterprise', featured: false,
    selling_points: [
      { title: '弹性扩展', description: '支持 10-1000 节点弹性扩缩容' },
      { title: '高可用', description: '99.99% SLA，自动故障转移' },
      { title: '统一管理', description: '可视化集群管理控制台' },
    ],
    configuration: '<p><strong>最小规模：</strong>10 节点起步<br><strong>单节点显卡：</strong>H100 80GB × 8<br><strong>网络：</strong>InfiniBand 400Gb/s<br><strong>存储：</strong>分布式 Ceph 集群</p>',
    published_at: '2026-01-20T08:00:00Z'
  },
  {
    id: 5, title: 'OpenClaw 昇腾版', slug: 'openclaw-ascend',
    summary: '基于华为昇腾 910B 的国产 AI 推理方案，完全自主可控，满足信创要求，性能媲美 A100。',
    scenario: '适合政府、央企、军工等对国产化有严格要求的客户，完全满足信创采购标准。',
    buy_link: 'https://shop.tokenstar.ai/products/openclaw-ascend', featured: false,
    selling_points: [
      { title: '完全国产化', description: '昇腾 910B 芯片，满足信创要求' },
      { title: '高性能', description: '性能媲美 NVIDIA A100，推理速度快' },
      { title: '完整生态', description: '支持 OpenClaw 全系列功能' },
    ],
    configuration: '<p><strong>AI 芯片：</strong>华为昇腾 910B × 4<br><strong>处理器：</strong>鲲鹏 920<br><strong>内存：</strong>256GB<br><strong>操作系统：</strong>欧拉 OS</p>',
    published_at: '2026-01-15T08:00:00Z'
  },
  {
    id: 6, title: 'OpenClaw 边缘推理盒', slug: 'openclaw-edge',
    summary: '专为边缘计算场景设计的轻量级推理设备，支持断网离线运行，适合工厂、医院、零售等场景。',
    scenario: '适合工厂车间、医院科室、零售门店等边缘场景，无需网络连接即可本地推理。',
    buy_link: 'https://shop.tokenstar.ai/products/openclaw-edge', featured: false,
    selling_points: [
      { title: '断网可用', description: '完全离线运行，不依赖网络' },
      { title: '工业级可靠', description: '宽温设计，IP65 防护等级' },
      { title: '低延迟', description: '本地推理延迟 < 100ms' },
    ],
    configuration: '<p><strong>AI 芯片：</strong>NVIDIA Jetson AGX Orin<br><strong>内存：</strong>64GB LPDDR5<br><strong>存储：</strong>512GB NVMe<br><strong>功耗：</strong>60W</p>',
    published_at: '2026-01-10T08:00:00Z'
  },
]

export const mockEvents = [
  {
    id: 1, title: 'OpenClaw 开发者大会 2026', slug: 'devcon-2026',
    type: 'public', status: 'open',
    start_time: '2026-03-15T09:00:00Z', end_time: '2026-03-15T18:00:00Z',
    location: '北京国家会议中心', signup_deadline: '2026-03-10T23:59:59Z',
    summary: '年度最大规模 AI 开发者盛会，汇聚 50+ 技术专家，共探 AI Agent 未来发展趋势。',
    agenda: '<h3>上午场</h3><p>09:00 - 开幕式与主题演讲<br>10:00 - OpenClaw 2.0 技术深度解析<br>11:00 - Skills 生态建设分享</p><h3>下午场</h3><p>14:00 - 企业实践案例分享<br>16:00 - 开发者工作坊<br>17:30 - 颁奖典礼</p>',
    featured: true
  },
  {
    id: 2, title: 'OpenClaw 企业 AI 训练营（第 3 期）', slug: 'bootcamp-3',
    type: 'bootcamp', status: 'upcoming',
    start_time: '2026-04-01T09:00:00Z', end_time: '2026-04-03T18:00:00Z',
    location: '上海张江 AI 园区', signup_deadline: '2026-03-25T23:59:59Z',
    summary: '三天密集训练营，从零到一掌握 OpenClaw 企业级应用开发，含实战项目与专家辅导。',
    agenda: '<h3>Day 1</h3><p>OpenClaw 基础与架构<br>Skills 开发实战</p><h3>Day 2</h3><p>企业知识库搭建<br>多 Agent 协作</p><h3>Day 3</h3><p>项目实战<br>成果展示与答辩</p>',
    featured: true
  },
  {
    id: 4, title: 'OpenClaw 北京企业闭门交流会', slug: 'beijing-enterprise-2026',
    type: 'enterprise', status: 'upcoming',
    start_time: '2026-03-20T14:00:00Z', end_time: '2026-03-20T18:00:00Z',
    location: '北京望京 SOHO T1',
    signup_deadline: '2026-03-15T23:59:59Z',
    summary: '面向北京地区大型企业 AI 负责人的闭门交流会，深度探讨 OpenClaw 在金融、政务、制造领域的落地实践。',
    agenda: '<h3>议程</h3><p>14:00 签到入场</p><p>14:30 OpenClaw 企业 AI 战略解读</p><p>15:30 标杆案例分享</p><p>16:30 圆桌讨论</p><p>17:30 自由交流</p>',
    gallery: [],
    recap_content: null,
    cover_image: null,
    featured: true
  },
  {
    id: 3, title: 'OpenClaw 深圳城市沙龙', slug: 'shenzhen-salon-2026',
    type: 'public', status: 'finished',
    start_time: '2026-01-20T14:00:00Z', end_time: '2026-01-20T18:00:00Z',
    location: '深圳南山科技园', signup_deadline: '2026-01-18T23:59:59Z',
    summary: '深圳城市开发者沙龙，聚焦 AI Agent 在硬件与 IoT 场景的创新应用，已圆满结束。',
    agenda: '<h3>议程</h3><p>14:00 - 签到<br>14:30 - 主题分享<br>16:00 - 圆桌讨论<br>17:30 - 自由交流</p>',
    recap_content: '<p>本次沙龙吸引了 200+ 开发者参与，分享了 5 个精彩案例...</p>',
    featured: false
  },
]

export const mockCases = [
  {
    id: 1, title: '某头部银行智能客服系统：接待量提升 400%', slug: 'bank-customer-service',
    summary: '基于 OpenClaw 构建的智能客服系统，日均接待量从 2 万次提升至 10 万次，客户满意度达 96%。',
    featured: true, published_at: '2026-02-10T08:00:00Z',
    category: { name: '金融', slug: 'finance' }, tags: [{ name: '客服', slug: 'customer-service' }],
    content: '<p>案例详情...</p>'
  },
  {
    id: 2, title: '三甲医院 AI 辅助诊断：诊断准确率提升至 97.3%', slug: 'hospital-ai-diagnosis',
    summary: '基于 OpenClaw 多模态能力构建的辅助诊断系统，在影像识别和病历分析方面达到专家级水平。',
    featured: true, published_at: '2026-02-05T08:00:00Z',
    category: { name: '医疗', slug: 'healthcare' }, tags: [{ name: '医疗AI', slug: 'medical-ai' }],
    content: '<p>案例详情...</p>'
  },
  {
    id: 3, title: '某制造企业 AI 质检系统：不良率降低 85%', slug: 'manufacturing-quality',
    summary: '利用 OpenClaw 视觉分析能力构建的自动化质检系统，实现 24 小时无人値守，产品不良率大幅降低。',
    featured: true, published_at: '2026-01-28T08:00:00Z',
    category: { name: '制造', slug: 'manufacturing' }, tags: [{ name: '质检', slug: 'quality' }],
    content: '<p>案例详情...</p>'
  },
  {
    id: 4, title: '头部电商平台 AI 选品助手：GMV 提升 23%', slug: 'ecommerce-ai-selection',
    summary: '基于 OpenClaw 构建的智能选品与营销文案生成系统，帮助商家提升选品效率和转化率。',
    featured: false, published_at: '2026-01-20T08:00:00Z',
    category: { name: '电商', slug: 'ecommerce' }, tags: [{ name: '电商', slug: 'ecommerce' }],
    content: '<p>案例详情...</p>'
  },
  {
    id: 5, title: '某省级政务平台 AI 办事助手：办理时效提升 60%', slug: 'government-ai-service',
    summary: '基于 OpenClaw 构建的政务智能助手，支持自然语言查询政策、自动填写表单、进度跟踪等功能。',
    featured: false, published_at: '2026-01-15T08:00:00Z',
    category: { name: '政务', slug: 'government' }, tags: [{ name: '政务', slug: 'gov' }],
    content: '<p>案例详情...</p>'
  },
  {
    id: 6, title: '在线教育平台 AI 学习助手：完课率提升 45%', slug: 'education-ai-tutor',
    summary: '基于 OpenClaw 构建的个性化学习助手，根据学生学习进度动态调整内容，显著提升学习效果。',
    featured: false, published_at: '2026-01-10T08:00:00Z',
    category: { name: '教育', slug: 'education' }, tags: [{ name: '教育', slug: 'education' }],
    content: '<p>案例详情...</p>'
  },
]

export const mockKnowledge = [
  {
    id: 1, title: 'OpenClaw 快速入门指南', slug: 'quick-start',
    summary: '5 分钟快速上手 OpenClaw，从安装到运行第一个 AI Agent，适合零基础开发者。',
    featured: true, published_at: '2026-02-15T08:00:00Z',
    category: { name: '入门教程', slug: 'beginner' }, tags: [{ name: '入门', slug: 'beginner' }],
    content: '<h2>安装 OpenClaw</h2><pre><code>pip install openclaw</code></pre><h2>运行第一个 Agent</h2><pre><code>from openclaw import Agent\nagent = Agent()\nresult = agent.run("你好，介绍一下你自己")\nprint(result)</code></pre>'
  },
  {
    id: 2, title: 'Skills 开发完全指南', slug: 'skills-development-guide',
    summary: '从零开始开发 OpenClaw Skills，包含 API 规范、测试方法、发布流程和最佳实践。',
    featured: true, published_at: '2026-02-12T08:00:00Z',
    category: { name: '开发指南', slug: 'dev-guide' }, tags: [{ name: 'Skills', slug: 'skills' }],
    content: '<p>Skills 开发详情...</p>'
  },
  {
    id: 3, title: 'OpenClaw 企业知识库搭建实战', slug: 'enterprise-knowledge-base',
    summary: '详细介绍如何基于 OpenClaw RAG 能力构建企业私有知识库，包含文档处理、向量化、检索优化全流程。',
    featured: false, published_at: '2026-02-08T08:00:00Z',
    category: { name: '实战教程', slug: 'practice' }, tags: [{ name: 'RAG', slug: 'rag' }, { name: '知识库', slug: 'kb' }],
    content: '<p>知识库搭建详情...</p>'
  },
  {
    id: 4, title: 'Multi-Agent 协作架构设计', slug: 'multi-agent-architecture',
    summary: '深入解析 OpenClaw Multi-Agent 协作机制，包含任务分解、Agent 通信、结果聚合等核心概念。',
    featured: false, published_at: '2026-02-05T08:00:00Z',
    category: { name: '架构设计', slug: 'architecture' }, tags: [{ name: 'Multi-Agent', slug: 'multi-agent' }],
    content: '<p>Multi-Agent 架构详情...</p>'
  },
  {
    id: 5, title: 'OpenClaw API 完整参考手册', slug: 'api-reference',
    summary: '完整的 OpenClaw API 参考文档，包含所有接口说明、参数定义、返回值格式和代码示例。',
    featured: false, published_at: '2026-02-01T08:00:00Z',
    category: { name: 'API 文档', slug: 'api-docs' }, tags: [{ name: 'API', slug: 'api' }],
    content: '<p>API 参考详情...</p>'
  },
  {
    id: 6, title: 'OpenClaw 私有化部署运维手册', slug: 'private-deploy-ops',
    summary: '企业私有化部署完整运维指南，包含安装、配置、监控、备份、升级和故障排查全流程。',
    featured: false, published_at: '2026-01-28T08:00:00Z',
    category: { name: '运维指南', slug: 'ops' }, tags: [{ name: '部署', slug: 'deploy' }, { name: '运维', slug: 'ops' }],
    content: '<p>运维手册详情...</p>'
  },
]

export const mockBlogs = [
  {
    id: 1, title: '2026 年 AI Agent 技术趋势深度解析', slug: '2026-ai-agent-trends',
    summary: '深度分析 2026 年 AI Agent 技术发展趋势，包括多模态融合、自主规划、工具使用和安全对齐等核心方向。',
    featured: true, published_at: '2026-02-22T08:00:00Z',
    category: { name: '技术洞察', slug: 'insights' }, tags: [{ name: 'AI趋势', slug: 'ai-trends' }],
    content: '<p>2026 年 AI Agent 技术趋势...</p>'
  },
  {
    id: 2, title: '从 RPA 到 AI Agent：企业自动化的范式转变', slug: 'rpa-to-ai-agent',
    summary: '深入探讨 AI Agent 如何替代传统 RPA，在复杂业务场景中实现更高层次的智能自动化。',
    featured: false, published_at: '2026-02-18T08:00:00Z',
    category: { name: '行业观察', slug: 'industry' }, tags: [{ name: 'RPA', slug: 'rpa' }, { name: '自动化', slug: 'automation' }],
    content: '<p>RPA vs AI Agent 详情...</p>'
  },
  {
    id: 3, title: '大模型推理优化：量化、蒸馏与投机解码', slug: 'llm-inference-optimization',
    summary: '系统介绍大模型推理优化技术，包括 INT4/INT8 量化、知识蒸馏和投机解码，帮助降低推理成本。',
    featured: false, published_at: '2026-02-14T08:00:00Z',
    category: { name: '技术深度', slug: 'tech-deep' }, tags: [{ name: '推理优化', slug: 'inference' }, { name: '量化', slug: 'quantization' }],
    content: '<p>推理优化技术详情...</p>'
  },
  {
    id: 4, title: 'OpenClaw vs LangChain：企业级 AI Agent 框架对比', slug: 'openclaw-vs-langchain',
    summary: '全面对比 OpenClaw 与 LangChain 在性能、易用性、生态和企业支持方面的差异，帮助企业做出选型决策。',
    featured: false, published_at: '2026-02-10T08:00:00Z',
    category: { name: '技术对比', slug: 'comparison' }, tags: [{ name: 'LangChain', slug: 'langchain' }, { name: '框架对比', slug: 'framework' }],
    content: '<p>框架对比详情...</p>'
  },
  {
    id: 5, title: 'AI Agent 安全：提示词注入攻击与防御实践', slug: 'ai-agent-security',
    summary: '深入分析 AI Agent 面临的安全威胁，重点介绍提示词注入攻击原理及 OpenClaw 的防御机制。',
    featured: false, published_at: '2026-02-06T08:00:00Z',
    category: { name: '安全', slug: 'security' }, tags: [{ name: 'AI安全', slug: 'ai-security' }, { name: '提示词注入', slug: 'prompt-injection' }],
    content: '<p>AI 安全详情...</p>'
  },
  {
    id: 6, title: '构建生产级 AI Agent：从 Demo 到企业落地的 10 个关键点', slug: 'production-ai-agent',
    summary: '分享将 AI Agent 从原型推向生产环境的实战经验，涵盖稳定性、可观测性、成本控制等关键维度。',
    featured: false, published_at: '2026-02-02T08:00:00Z',
    category: { name: '实战经验', slug: 'practice' }, tags: [{ name: '生产部署', slug: 'production' }, { name: '最佳实践', slug: 'best-practice' }],
    content: '<p>生产级 AI Agent 详情...</p>'
  },
]
