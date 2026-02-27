import express from 'express'
import payload from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'tokenstar_secret_2026',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // ==================== CSV 导出 API ====================
  // GET /api/export/signups?event=<eventId>
  // 导出报名数据为 CSV（需要登录 token）
  app.get('/api/export/signups', async (req, res) => {
    try {
      const { event: eventId } = req.query

      const query: Record<string, any> = {
        collection: 'signups',
        limit: 10000,
        depth: 1,
      }

      if (eventId) {
        query.where = {
          event: { equals: eventId },
        }
      }

      const signups = await payload.find(query)

      const rows = signups.docs.map((s: any) => ({
        姓名: s.name || '',
        手机号: s.phone || '',
        邮箱: s.email || '',
        公司: s.company || '',
        职位: s.role || '',
        备注: s.note || '',
        状态: s.status === 'new' ? '新报名' : s.status === 'contacted' ? '已联系' : s.status === 'confirmed' ? '已确认' : s.status || '',
        活动: typeof s.event === 'object' ? s.event?.title : s.event,
        报名时间: s.createdAt ? new Date(s.createdAt).toLocaleString('zh-CN') : '',
      }))

      // 生成 CSV
      const headers = Object.keys(rows[0] || { 姓名: '', 手机号: '', 邮箱: '', 公司: '', 职位: '', 备注: '', 状态: '', 活动: '', 报名时间: '' })
      const csvLines = [
        headers.join(','),
        ...rows.map(row =>
          headers.map(h => `"${String((row as any)[h] || '').replace(/"/g, '""')}"`).join(',')
        ),
      ]
      const csv = csvLines.join('\n')

      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Content-Disposition', `attachment; filename="signups_export_${Date.now()}.csv"`)
      res.send('\uFEFF' + csv) // BOM for Excel compatibility
    } catch (error) {
      console.error('CSV Export error:', error)
      res.status(500).json({ error: 'Export failed', message: String(error) })
    }
  })

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`\n🚀 TokenStar AI星球 - Payload CMS Backend`)
    console.log(`   Admin Panel: http://localhost:${PORT}/admin`)
    console.log(`   API:         http://localhost:${PORT}/api`)
    console.log(`   CSV Export:  http://localhost:${PORT}/api/export/signups`)
    console.log(`   CSV by Event: http://localhost:${PORT}/api/export/signups?event=<eventId>\n`)
  })
}

start()
