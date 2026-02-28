'use client'

import { useState } from 'react'
import { Send, CheckCircle, Building2, User, Phone, Mail, MessageSquare } from 'lucide-react'

type FormData = {
  company: string
  name: string
  role: string
  phone: string
  email: string
  scale: string
  deploymentType: string
  message: string
}

const initialForm: FormData = {
  company: '',
  name: '',
  role: '',
  phone: '',
  email: '',
  scale: '',
  deploymentType: '',
  message: '',
}

export function ConsultationForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // 模拟提交延迟（实际可对接 API）
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm border transition-all outline-none
    dark:bg-white/5 bg-white
    dark:border-white/12 border-gray-200
    dark:text-white text-gray-900
    dark:placeholder-gray-600 placeholder-gray-400
    dark:focus:border-blue-500/60 focus:border-blue-400
    dark:focus:bg-white/8 focus:bg-blue-50/30`

  const labelClass = 'block text-xs dark:text-gray-400 text-gray-500 mb-1.5'

  if (submitted) {
    return (
      <section className="mb-14" id="consultation-form">
        <div className="glass rounded-2xl border dark:border-green-500/30 border-green-200 p-10 text-center">
          <div className="w-14 h-14 rounded-full dark:bg-green-500/15 bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 dark:text-green-400 text-green-600" />
          </div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">提交成功！</h3>
          <p className="dark:text-gray-400 text-gray-500 text-sm max-w-md mx-auto mb-6">
            我们的企业部署顾问将在 1 个工作日内与您联系，为您量身定制部署方案。
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(initialForm) }}
            className="text-sm dark:text-blue-400 text-blue-600 hover:underline"
          >
            重新填写
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-14" id="consultation-form">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="w-5 h-5 dark:text-blue-400 text-blue-600" />
        <h2 className="text-xl font-bold dark:text-white text-gray-900">预约企业部署评估</h2>
      </div>
      <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">填写以下信息，我们的企业部署顾问将在 1 个工作日内与您联系。</p>

      <div className="glass rounded-2xl border dark:border-blue-500/20 border-blue-200 p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* 公司名称 */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                <Building2 className="inline w-3.5 h-3.5 mr-1" />
                公司名称 <span className="text-red-400">*</span>
              </label>
              <input
                type="text" name="company" required
                placeholder="请输入公司全称"
                value={form.company} onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* 联系人姓名 */}
            <div>
              <label className={labelClass}>
                <User className="inline w-3.5 h-3.5 mr-1" />
                联系人姓名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text" name="name" required
                placeholder="您的姓名"
                value={form.name} onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* 职位 */}
            <div>
              <label className={labelClass}>职位 / 部门</label>
              <input
                type="text" name="role"
                placeholder="如：CTO / AI 负责人 / 运营总监"
                value={form.role} onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* 手机号 */}
            <div>
              <label className={labelClass}>
                <Phone className="inline w-3.5 h-3.5 mr-1" />
                手机号 <span className="text-red-400">*</span>
              </label>
              <input
                type="tel" name="phone" required
                placeholder="请输入手机号"
                value={form.phone} onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* 邮箱 */}
            <div>
              <label className={labelClass}>
                <Mail className="inline w-3.5 h-3.5 mr-1" />
                企业邮箱
              </label>
              <input
                type="email" name="email"
                placeholder="your@company.com"
                value={form.email} onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* 企业规模 */}
            <div>
              <label className={labelClass}>企业规模 <span className="text-red-400">*</span></label>
              <select
                name="scale" required
                value={form.scale} onChange={handleChange}
                className={inputClass}
              >
                <option value="">请选择企业规模</option>
                <option value="50以下">50 人以下</option>
                <option value="50-150">50 – 150 人</option>
                <option value="150-500">150 – 500 人</option>
                <option value="500-2000">500 – 2000 人</option>
                <option value="2000以上">2000 人以上</option>
              </select>
            </div>

            {/* 感兴趣的部署方案 */}
            <div>
              <label className={labelClass}>感兴趣的部署方案</label>
              <select
                name="deploymentType"
                value={form.deploymentType} onChange={handleChange}
                className={inputClass}
              >
                <option value="">请选择（可选）</option>
                <option value="box-pro-s">Box Pro S（入门版）</option>
                <option value="box-pro-m">Box Pro M（成长版）</option>
                <option value="box-pro-l">Box Pro L（大型定制）</option>
                <option value="cloud-starter">Cloud Starter</option>
                <option value="cloud-pro">Cloud Pro</option>
                <option value="workstation">Workstation 终端</option>
                <option value="undecided">尚未确定，需要顾问建议</option>
              </select>
            </div>

            {/* 补充说明 */}
            <div className="sm:col-span-2">
              <label className={labelClass}>补充说明（可选）</label>
              <textarea
                name="message" rows={3}
                placeholder="请描述您的业务场景、核心需求或希望解决的问题…"
                value={form.message} onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  提交中…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  提交咨询申请
                </>
              )}
            </button>
            <p className="text-xs dark:text-gray-600 text-gray-400">
              提交即表示您同意我们的
              <a href="/privacy" className="dark:text-blue-400 text-blue-600 hover:underline mx-0.5">隐私政策</a>
              ，我们承诺不向第三方分享您的信息。
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
