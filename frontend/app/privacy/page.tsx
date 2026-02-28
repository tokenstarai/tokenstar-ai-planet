import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '隐私政策',
  description: 'TokenStar 隐私政策 — 了解我们如何收集、使用、存储与保护您的个人信息。',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-500/30 text-xs text-blue-400 mb-4">
            法律文件
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">隐私政策</h1>
          <p className="text-gray-400 text-sm">
            生效日期：2026-02-28 &nbsp;·&nbsp; 更新日期：2026-02-28
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose-legal">

          <p className="lead">
            欢迎访问 TokenStar·AI星球（以下简称"本网站"或"我们"）。我们重视并保护用户的个人信息与隐私安全。本政策说明我们在你使用本网站服务过程中，如何收集、使用、存储、共享与保护你的信息，以及你享有的权利。
          </p>

          {/* Section 1 */}
          <section className="legal-section">
            <h2>1. 我们是谁</h2>
            <p>
              TokenStar·AI星球 是面向中国用户的 AI 生态资源门户，提供 OpenClaw 相关资讯、教程、案例、Skills 索引、培训活动信息以及硬件/云方案的外链导购与推荐。
            </p>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2>2. 我们收集的信息</h2>
            <p>我们遵循"最小必要"原则收集信息，主要包括：</p>

            <h3>2.1 你主动提供的信息</h3>
            <p>当你提交表单（例如培训活动报名、合作咨询、联系邮箱等）时，我们可能收集：</p>
            <ul>
              <li>姓名/称呼</li>
              <li>联系方式（电话、邮箱、微信等你填写的内容）</li>
              <li>公司/职位（如你填写）</li>
              <li>你的需求描述/留言内容</li>
              <li>你提交表单的时间与来源页面（用于跟进与统计）</li>
            </ul>
            <blockquote>
              注意：如你通过第三方表单服务提交信息，表单服务方也可能收集必要信息（见第 6 条）。
            </blockquote>

            <h3>2.2 自动收集的信息（访问日志）</h3>
            <p>当你访问本网站时，我们可能自动收集一些基础技术信息，用于保障网站安全、性能与统计分析，例如：</p>
            <ul>
              <li>IP 地址（可能被匿名化或截断处理）</li>
              <li>浏览器类型、设备型号、操作系统版本</li>
              <li>访问时间、访问页面、停留时长、来源链接（referrer）</li>
              <li>错误日志（用于排障）</li>
            </ul>

            <h3>2.3 本地存储信息（Cookie/LocalStorage）</h3>
            <p>为提供更好的体验，本网站可能使用 Cookie 或浏览器本地存储（LocalStorage）保存少量信息，例如：</p>
            <ul>
              <li>主题偏好（深色/浅色）与切换时间（用于记住你的显示设置）</li>
              <li>未来 PWA 功能所需的缓存与离线资源索引（如启用）</li>
            </ul>
            <p>这些信息一般不直接用于识别个人身份。</p>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2>3. 我们如何使用信息</h2>
            <p>我们可能将收集到的信息用于：</p>
            <ul>
              <li>提供与改进网站内容与功能（例如优化导航、提升阅读体验）</li>
              <li>处理你提交的报名/咨询并与你联系</li>
              <li>发送与你请求相关的通知（如课程确认、活动变更等）</li>
              <li>进行安全防护（反作弊、异常访问检测、故障排查）</li>
              <li>统计与分析（了解哪些内容更受欢迎，便于改进）</li>
            </ul>
            <p>我们不会将你的个人信息用于与上述目的无关的用途。</p>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2>4. 我们如何共享与披露信息</h2>
            <p>我们不会出售你的个人信息。仅在以下情形可能共享必要信息：</p>
            <ul>
              <li><strong>第三方基础设施与托管服务</strong>：如网站部署、CDN、安全防护等（例如 Cloudflare）。这些服务提供商可能在其正常运行过程中处理访问日志或网络请求数据。</li>
              <li><strong>第三方表单/统计服务</strong>：如你通过第三方表单提交报名信息，信息可能由表单服务方接收与存储。</li>
              <li><strong>法律法规要求</strong>：在法律法规或监管要求下，或应司法机关、行政机关要求提供。</li>
            </ul>
            <p>除非法律要求或为实现你请求的服务，我们不会向无关第三方披露你的个人信息。</p>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2>5. 外链与第三方网站</h2>
            <p>
              本网站可能包含跳转至第三方网站或外部商城的链接（用于硬件/云方案购买等）。
              第三方网站的隐私实践不受本政策约束。你在第三方网站上的行为与信息提供，将受其隐私政策与服务条款约束。建议你在使用前查看第三方的相关政策。
            </p>
          </section>

          {/* Section 6 */}
          <section className="legal-section">
            <h2>6. 数据存储与安全</h2>
            <p>
              我们采取合理措施保护你的信息，包括但不限于访问控制、传输加密（HTTPS）、安全配置等。
              但请理解：任何系统都无法保证 100% 安全。如果发生安全事件，我们将依据适用法律法规采取必要措施并进行告知（如需）。
            </p>

            <h3>6.1 保存期限</h3>
            <ul>
              <li>报名/咨询信息：在完成联系与服务目的所需期间保留，超出必要期限后将进行删除或匿名化处理（除法律法规另有要求）。</li>
              <li>访问日志：用于安全与统计，保留期限将以最小必要为原则。</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="legal-section">
            <h2>7. 你的权利</h2>
            <p>你可以在合理范围内请求：</p>
            <ul>
              <li>查询我们是否持有你的信息以及信息副本</li>
              <li>更正不准确的信息</li>
              <li>删除你的信息（在法律允许范围内）</li>
              <li>撤回已提供的同意（如适用）</li>
            </ul>
            <p>你可以通过本政策最后的联系方式联系我们。</p>
          </section>

          {/* Section 8 */}
          <section className="legal-section">
            <h2>8. 未成年人保护</h2>
            <p>
              本网站主要面向具备完全民事行为能力的用户。若你是未成年人，请在监护人同意与指导下使用本网站并提交信息。
            </p>
          </section>

          {/* Section 9 */}
          <section className="legal-section">
            <h2>9. 本政策的更新</h2>
            <p>
              我们可能根据业务变化或法律法规要求更新本政策。更新后将在本页面展示最新版本与更新日期。重大变更将以合理方式提示。
            </p>
          </section>

          {/* Section 10 */}
          <section className="legal-section">
            <h2>10. 联系我们</h2>
            <p>如你对本隐私政策有疑问或需行使你的权利，请通过以下方式联系我们：</p>
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
            <Link href="/terms" className="legal-nav-link">查看服务条款 →</Link>
            <Link href="/about" className="legal-nav-link">联系我们</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
