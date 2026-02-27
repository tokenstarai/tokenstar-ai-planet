'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, CheckCircle, Send } from 'lucide-react'

interface EventSignupFormProps {
  eventStatus: string
  eventTitle: string
}

export default function EventSignupForm({ eventStatus, eventTitle }: EventSignupFormProps) {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', company: '', role: '', note: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // 模拟提交（实际接入 Payload CMS API 时替换此处）
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (eventStatus === 'finished') {
    return (
      <div className="glass rounded-2xl p-6 border border-white/10 text-center">
        <div className="text-gray-400 text-sm mb-4">此活动已结束</div>
        <Link href="/events" className="btn-outline">
          查看更多活动
        </Link>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-6 border border-pink-500/20 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-pink-400" />
        立即报名
      </h3>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">报名成功！</h4>
          <p className="text-sm text-gray-400">我们将在 1-2 个工作日内与您联系确认报名信息。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入您的姓名' },
            { name: 'phone', label: '手机号', type: 'tel', required: true, placeholder: '请输入手机号' },
            { name: 'email', label: '邮箱', type: 'email', required: true, placeholder: '请输入邮箱地址' },
            { name: 'company', label: '公司', type: 'text', required: false, placeholder: '请输入公司名称' },
            { name: 'role', label: '职位', type: 'text', required: false, placeholder: '请输入您的职位' },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-xs text-gray-400 mb-1">
                {field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={(formData as any)[field.name]}
                onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs text-gray-400 mb-1">备注</label>
            <textarea
              placeholder="有什么想告诉我们的？"
              value={formData.note}
              onChange={e => setFormData(prev => ({ ...prev, note: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                提交报名
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
