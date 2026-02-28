'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Globe, Github, Send, CheckCircle, Users, Target, Heart } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'partner' | 'contact'>('about')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      {/* 页面 Header：深色保留渐变光晕，浅色透明无断层 */}
      <div className={`page-header ${isDark ? 'bg-gradient-to-b from-indigo-900/20 to-transparent' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>关于 TokenStar</h1>
          <p className={`max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            面向中国用户的 OpenClaw 生态资源导航站，连接开发者、企业与 AI 未来。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Tabs */}
        <div className={`flex items-center gap-1 mb-10 rounded-xl p-1 w-fit ${isDark ? 'glass' : 'bg-gray-100 border border-gray-200'}`}>
          {[
            { key: 'about', label: '关于我们' },
            { key: 'partner', label: '合作伙伴' },
            { key: 'contact', label: '联系我们' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>我们是谁</h2>
              <div className={`space-y-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  TokenStar 是面向中国用户的 OpenClaw 生态资源导航站，致力于为中国开发者和企业提供最完整的 OpenClaw 资源与服务。
                </p>
                <p>
                  我们聚焦于 OpenClaw 新闻资讯、技术教程、Skills 生态、企业案例、硬件部署方案与培训活动，帮助更多人了解、学习和使用 OpenClaw，推动 AI Agent 技术在中国的普及与落地。
                </p>
                <p>
                  TokenStar 团队由一群热爱 AI 技术的工程师和产品人组成，我们相信 AI Agent 将深刻改变人类的工作与生活方式，而 OpenClaw 正是这场变革的重要推动力量。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Users, value: '10,000+', label: '社区成员' },
                  { icon: Target, value: '200+', label: '企业客户' },
                  { icon: Heart, value: '500+', label: 'Skills 生态' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className={`rounded-xl p-4 text-center ${
                      isDark
                        ? 'glass border border-white/5'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <stat.icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>我们的使命</h2>
              <div className="space-y-4">
                {[
                  {
                    title: '普及 AI Agent 知识',
                    description: '通过高质量的教程、文档和案例，降低 AI Agent 开发门槛，让更多人能够使用 OpenClaw。',
                  },
                  {
                    title: '构建开发者社区',
                    description: '连接全国 OpenClaw 开发者，促进技术交流与合作，共同推动 Skills 生态繁荣。',
                  },
                  {
                    title: '赋能企业 AI 转型',
                    description: '提供完整的企业级解决方案，从技术选型到落地实施，全程陪伴企业 AI 转型之路。',
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className={`rounded-xl p-5 ${
                      isDark
                        ? 'glass border border-white/5'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Partner Tab */}
        {activeTab === 'partner' && (
          <div>
            <div className="max-w-3xl mb-12">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>合作伙伴计划</h2>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                我们诚邀各类合作伙伴加入 TokenStar 生态，共同推动 OpenClaw 在中国的发展。
                无论您是技术服务商、硬件厂商、培训机构还是行业解决方案提供商，都欢迎与我们合作。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: '技术合作伙伴',
                  description: '与 TokenStar 共同开发 Skills、解决方案和技术集成，获得官方认证与推广支持。',
                  benefits: ['官方认证徽章', '技术资源支持', '联合营销推广', '优先技术对接'],
                },
                {
                  title: '渠道合作伙伴',
                  description: '作为 OpenClaw 授权经销商，为客户提供产品销售、部署和技术支持服务。',
                  benefits: ['产品销售授权', '销售培训支持', '市场推广资源', '专属折扣政策'],
                },
                {
                  title: '内容合作伙伴',
                  description: '与 TokenStar 共同创作高质量内容，包括教程、案例、技术文章等。',
                  benefits: ['内容联合出品', '流量导入支持', '品牌曝光机会', '社区推广资源'],
                },
              ].map(partner => (
                <div
                  key={partner.title}
                  className={`rounded-xl p-6 transition-all ${
                    isDark
                      ? 'glass border border-white/5 hover:border-blue-500/30'
                      : 'bg-white border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <h3 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{partner.title}</h3>
                  <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{partner.description}</p>
                  <ul className="space-y-2">
                    {partner.benefits.map(b => (
                      <li key={b} className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={`rounded-xl p-6 text-center ${isDark ? 'glass border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>有意向合作？</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>请通过以下方式联系我们的商务团队，我们将在 1-2 个工作日内回复。</p>
              <button
                onClick={() => setActiveTab('contact')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                联系商务团队
              </button>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>联系方式</h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Mail, label: '商务合作', value: 'business@tokenstar.ai' },
                  { icon: Mail, label: '技术支持', value: 'support@tokenstar.ai' },
                  { icon: Phone, label: '联系电话', value: '400-692-1123' },
                  { icon: MapPin, label: '公司地址', value: '北京市朝阳区新源南路6号京城大厦36楼' },
                  { icon: Globe, label: '官方网站', value: 'www.tokenstar.ai' },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 rounded-xl p-4 ${
                      isDark
                        ? 'glass border border-white/5'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-blue-500/20' : 'bg-blue-50'
                    }`}>
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      {/* 标签：中灰，辅助信息 */}
                      <div className={`text-xs contact-label ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {item.label}
                      </div>
                      {/* 值字段：高对比度，浅色主题下近黑色 */}
                      <div className={`text-sm font-medium contact-value ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`rounded-xl p-5 ${isDark ? 'glass border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>关注我们</h3>
                <div className="flex items-center gap-4">
                  {[
                    { label: '微信公众号', value: 'TokenStarAI' },
                    { label: '微博', value: '@TokenStar_AI' },
                    { label: '知乎', value: 'TokenStar' },
                  ].map(social => (
                    <div key={social.label} className="text-center">
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{social.label}</div>
                      <div className="text-xs text-blue-500 font-medium">{social.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>发送消息</h2>
              {submitted ? (
                <div className={`rounded-2xl p-10 text-center ${isDark ? 'glass border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>消息已发送！</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>感谢您的联系，我们将在 1-2 个工作日内回复您。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '您的姓名' },
                      { name: 'email', label: '邮箱', type: 'email', required: true, placeholder: '您的邮箱' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.name]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50'
                              : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { name: 'company', label: '公司', type: 'text', required: false, placeholder: '您的公司（选填）' },
                    { name: 'subject', label: '主题', type: 'text', required: true, placeholder: '请简述您的需求' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={(formData as any)[field.name]}
                        onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400'
                        }`}
                      />
                    </div>
                  ))}

                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      消息内容<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <textarea
                      required
                      placeholder="请详细描述您的需求或问题..."
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors resize-none ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        发送消息
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
