import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '服务条款',
  description: 'TokenStar 服务条款 — 使用本网站前请仔细阅读本服务条款。',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/30 text-xs text-purple-400 mb-4">
            法律文件
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">服务条款</h1>
          <p className="text-gray-400 text-sm">
            生效日期：2026-02-28 &nbsp;·&nbsp; 更新日期：2026-02-28
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose-legal">

          <p className="lead">
            欢迎使用 TokenStar·AI星球（以下简称"本网站"或"我们"）。在使用本网站提供的内容与服务前，请你仔细阅读本服务条款。你访问或使用本网站，即视为你已理解并同意本条款。
          </p>

          {/* Section 1 */}
          <section className="legal-section">
            <h2>1. 服务说明</h2>
            <p>本网站提供包括但不限于：</p>
            <ul>
              <li>OpenClaw 相关资讯、版本动态、行业解读</li>
              <li>教程/知识库/FAQ</li>
              <li>Skills 索引与使用说明（信息展示与导航）</li>
              <li>案例分享与实战方法</li>
              <li>培训活动信息与报名入口</li>
              <li>硬件与云方案的推荐与外链跳转（导购性质）</li>
            </ul>
            <p>本网站可能随时更新或调整栏目与内容形式。</p>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2>2. 内容与信息免责声明</h2>
            <ul>
              <li>本网站内容主要用于信息分享与学习交流，不构成任何形式的法律、财务、投资或医疗建议。</li>
              <li>对于引用的第三方资料、开源项目、外部链接内容，我们会尽力核对，但不对其准确性、完整性、及时性作绝对保证。</li>
              <li>你应自行判断并承担使用相关内容与工具所产生的风险。</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2>3. 外链购买与第三方服务责任边界</h2>
            <p>本网站的"硬件/云方案购买"采用外链跳转至第三方平台或外部商城完成交易：</p>
            <ul>
              <li>本网站不直接参与第三方平台的交易过程，不承担第三方平台的发货、售后、退款、发票等义务；</li>
              <li>第三方平台的商品信息、服务质量、价格与库存以其页面展示为准；</li>
              <li>你与第三方平台之间的纠纷应由你与第三方平台协商解决。</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2>4. 报名与联系</h2>
            <p>
              你在培训活动报名或合作咨询中提交的信息，应保证真实、合法、准确。
              我们可能通过你提供的联系方式与你沟通活动信息或服务进展。若你希望停止接收相关联系，可随时联系我们处理。
            </p>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2>5. 知识产权与转载规范</h2>
            <ul>
              <li>本网站自行创作的内容（包括但不限于文字、图形、排版设计等）受法律保护。未经许可不得用于商业转载或镜像。</li>
              <li>允许在注明来源与链接的前提下进行合理引用与非商业分享；</li>
              <li>对于第三方版权内容，其权利归原作者或权利人所有；如有侵权请联系我们处理。</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="legal-section">
            <h2>6. 用户行为规范</h2>
            <p>你使用本网站时不得从事以下行为：</p>
            <ul>
              <li>发布或传播违法、侵权、恶意、虚假、骚扰性内容</li>
              <li>试图干扰网站运行、进行漏洞攻击、爬取敏感数据、绕过安全机制</li>
              <li>冒用他人身份、提交虚假报名信息或恶意刷量</li>
              <li>侵犯他人知识产权、隐私或其他合法权益</li>
            </ul>
            <p>如你违反上述规范，我们有权采取限制访问、删除内容、拒绝服务等措施，并保留追究法律责任的权利。</p>
          </section>

          {/* Section 7 */}
          <section className="legal-section">
            <h2>7. 服务中断与变更</h2>
            <p>
              我们会尽力保障网站稳定运行，但因不可抗力、网络故障、系统维护、第三方服务异常等原因导致的中断或损失，我们在法律允许范围内不承担责任。
              我们也可能根据运营需要对服务进行升级、调整或停止，必要时会以合理方式通知。
            </p>
          </section>

          {/* Section 8 */}
          <section className="legal-section">
            <h2>8. 责任限制</h2>
            <p>
              在法律允许的最大范围内，本网站对因使用或无法使用本网站服务而导致的间接损失、附带损失或利润损失不承担责任。
              你应对使用本网站内容、工具与外链服务的行为承担相应责任。
            </p>
          </section>

          {/* Section 9 */}
          <section className="legal-section">
            <h2>9. 条款更新</h2>
            <p>
              我们可能更新本服务条款。更新后的条款将在本页面展示并注明更新日期。你继续使用本网站即视为接受更新后的条款。
            </p>
          </section>

          {/* Section 10 */}
          <section className="legal-section">
            <h2>10. 联系我们</h2>
            <p>如你对本条款有任何疑问或投诉建议，可通过以下方式联系：</p>
            <div className="contact-card">
              <div className="contact-row">
                <span className="contact-label-text">联系电话</span>
                <span className="contact-value-text">400-692-1123</span>
              </div>
              <div className="contact-row">
                <span className="contact-label-text">商务合作邮箱</span>
                <a href="mailto:business@tokenstar.ai" className="contact-link">business@tokenstar.ai</a>
              </div>
              <div className="contact-row">
                <span className="contact-label-text">技术支持邮箱</span>
                <a href="mailto:support@tokenstar.ai" className="contact-link">support@tokenstar.ai</a>
              </div>
              <div className="contact-row">
                <span className="contact-label-text">公司地址</span>
                <span className="contact-value-text">北京市朝阳区新源南路6号京城大厦36楼</span>
              </div>
              <div className="contact-row">
                <span className="contact-label-text">官方网站</span>
                <a href="https://www.tokenstar.ai" className="contact-link" target="_blank" rel="noopener noreferrer">https://www.tokenstar.ai</a>
              </div>
            </div>
          </section>

          {/* Footer nav */}
          <div className="legal-footer-nav">
            <Link href="/privacy" className="legal-nav-link">查看隐私政策 →</Link>
            <Link href="/about" className="legal-nav-link">联系我们</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
