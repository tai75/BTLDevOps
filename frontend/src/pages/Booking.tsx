import { useEffect, useState } from 'react'

type ServicePackage = {
  id: number
  package_name: string
  description: string | null
  duration_minutes: number
  base_price: string
}

export default function Booking() {
  const apiBaseUrl = import.meta.env.VITE_API_URL as string | undefined
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    servicePackageId: '',
    serviceAddress: '',
    preferredDate: '',
    preferredTime: '',
    numberOfRooms: '1',
    notes: '',
  })
  const [services, setServices] = useState<ServicePackage[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      if (!apiBaseUrl) return
      try {
        const r = await fetch(`${apiBaseUrl}/api/services`)
        const j = await r.json()
        setServices(j.data ?? [])
      } catch {
        // ignore
      }
    }
    void load()
  }, [apiBaseUrl])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((c) => ({ ...c, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!apiBaseUrl) {
      setMessage('Thiếu VITE_API_URL')
      return
    }

    setMessage('Đang gửi...')
    try {
      const res = await fetch(`${apiBaseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email || undefined,
          servicePackageId: Number(form.servicePackageId),
          serviceAddress: form.serviceAddress,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          numberOfRooms: Number(form.numberOfRooms),
          notes: form.notes || undefined,
        }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.message || 'Lỗi')
      setMessage('Đặt lịch thành công')
      setForm({ fullName: '', phone: '', email: '', servicePackageId: '', serviceAddress: '', preferredDate: '', preferredTime: '', numberOfRooms: '1', notes: '' })
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Lỗi khi gửi')
    }
  }

  return (
    <section className="booking-layout">
      <aside className="page-card">
        <div className="section-head">
          <p className="eyebrow">Form đặt lịch</p>
          <h2>Ghi nhận lịch dọn nhà</h2>
        </div>

        <p>
          Trang này được thiết kế để người dùng điền thông tin nhanh, dễ đọc và có cảm giác rõ ràng khi
          gửi form. Nếu backend sẵn sàng, đây là phần tương tác quan trọng nhất của giao diện.
        </p>

        <div className="benefit-list">
          <div className="benefit-item">
            <strong>Rõ ràng</strong>
            <span>Các trường nhập được nhóm theo logic để tránh cảm giác rối.</span>
          </div>
          <div className="benefit-item">
            <strong>Thực dụng</strong>
            <span>Form đúng với API hiện có, không thêm bước thừa.</span>
          </div>
          <div className="benefit-item">
            <strong>Thuyết trình tốt</strong>
            <span>Bạn có thể giải thích đây là UI có cấu trúc, không phải form demo đơn giản.</span>
          </div>
          <div className="benefit-item">
            <strong>Responsive</strong>
            <span>Layout tự co giãn, không vỡ trên máy tính bảng hay điện thoại.</span>
          </div>
        </div>

        <div className="highlight-band" style={{ marginTop: '18px' }}>
          <strong>Cam kết bảo mật</strong>
          <span>Thông tin khách hàng được bảo mật và chỉ dùng để liên hệ xác nhận lịch.</span>
        </div>
      </aside>

      <form onSubmit={handleSubmit} className="booking-panel">
        <div className="section-head">
          <p className="eyebrow">Nhập thông tin</p>
          <h2>Đặt lịch theo nhu cầu của bạn</h2>
        </div>

        <label>
          Họ và tên
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>

        <div className="field-row">
          <label>
            Số điện thoại
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
        </div>

        <label>
          Chọn gói dịch vụ
          <select name="servicePackageId" value={form.servicePackageId} onChange={handleChange} required>
            <option value="">-- Chọn một gói --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.package_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Địa chỉ dọn nhà
          <input name="serviceAddress" value={form.serviceAddress} onChange={handleChange} required />
        </label>

        <div className="field-row">
          <label>
            Ngày mong muốn
            <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} required />
          </label>

          <label>
            Giờ mong muốn
            <input name="preferredTime" type="time" value={form.preferredTime} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Số phòng
          <input name="numberOfRooms" type="number" min="1" value={form.numberOfRooms} onChange={handleChange} />
        </label>

        <label>
          Ghi chú
          <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} />
        </label>

        <button type="submit">Gửi yêu cầu đặt lịch</button>
        {message ? <p className="feedback">{message}</p> : null}
      </form>
    </section>
  )
}
