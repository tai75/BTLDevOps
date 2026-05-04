import { useEffect, useState } from 'react'
import './App.css'

type ServicePackage = {
  id: number
  package_name: string
  description: string | null
  duration_minutes: number
  base_price: string
}

type BookingFormState = {
  fullName: string
  phone: string
  email: string
  servicePackageId: string
  serviceAddress: string
  preferredDate: string
  preferredTime: string
  numberOfRooms: string
  notes: string
}

const initialFormState: BookingFormState = {
  fullName: '',
  phone: '',
  email: '',
  servicePackageId: '',
  serviceAddress: '',
  preferredDate: '',
  preferredTime: '',
  numberOfRooms: '1',
  notes: '',
}

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_URL as string | undefined
  const [form, setForm] = useState<BookingFormState>(initialFormState)
  const [services, setServices] = useState<ServicePackage[]>([])
  const [healthStatus, setHealthStatus] = useState('Đang kiểm tra...')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!apiBaseUrl) {
        setHealthStatus('Thiếu VITE_API_URL trong file .env')
        setMessage('Tạo file .env từ .env.example rồi chạy lại frontend.')
        setIsLoading(false)
        return
      }

      try {
        const [healthResponse, servicesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/health`),
          fetch(`${apiBaseUrl}/api/services`),
        ])

        const healthData = (await healthResponse.json()) as { status?: string }
        const servicesData = (await servicesResponse.json()) as {
          data?: ServicePackage[]
        }

        setHealthStatus(
          healthResponse.ok
            ? `API: ${healthData.status ?? 'ok'}`
            : 'API chưa phản hồi đúng',
        )
        setServices(servicesData.data ?? [])
      } catch {
        setHealthStatus('Không kết nối được backend')
        setMessage('Kiểm tra backend đang chạy và giá trị VITE_API_URL.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadData()
  }, [apiBaseUrl])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!apiBaseUrl) {
      setMessage('Thiếu cấu hình VITE_API_URL.')
      return
    }

    setMessage('Đang gửi lịch đặt...')

    try {
      const response = await fetch(`${apiBaseUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(result.message ?? 'Không đặt lịch được.')
      }

      setMessage('Đặt lịch thành công. Hệ thống đã ghi nhận yêu cầu.')
      setForm(initialFormState)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đặt lịch.')
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">House Cleaning Booking</p>
          <h1>Đặt lịch dọn nhà đơn giản, rõ ràng, không cần đăng nhập.</h1>
          <p className="hero-copy">
            Hệ thống tối giản cho đồ án DevOps: có frontend, backend API,
            MySQL, Docker và CI/CD.
          </p>
          <div className="status-row">
            <span className="status-pill">{healthStatus}</span>
            <span className="status-pill muted">
              {isLoading ? 'Đang tải dịch vụ...' : `${services.length} gói dịch vụ`}
            </span>
          </div>
        </div>

        <div className="info-card">
          <h2>Luồng hoạt động</h2>
          <ol>
            <li>Frontend gọi API `/api/health` để kiểm tra backend.</li>
            <li>Frontend lấy danh sách gói dọn nhà từ database.</li>
            <li>Người dùng gửi form để tạo booking mới.</li>
          </ol>
        </div>
      </section>

      <section className="content-grid">
        <div className="services-panel">
          <div className="section-head">
            <p className="eyebrow">Gói dịch vụ</p>
            <h2>Có thể mở rộng sau nhưng hiện tại giữ thật đơn giản</h2>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article key={service.id} className="service-card">
                <div>
                  <h3>{service.package_name}</h3>
                  <p>{service.description ?? 'Không có mô tả.'}</p>
                </div>
                <div className="service-meta">
                  <span>{service.duration_minutes} phút</span>
                  <strong>{Number(service.base_price).toLocaleString('vi-VN')} đ</strong>
                </div>
              </article>
            ))}
          </div>
        </div>

        <form className="booking-panel" onSubmit={handleSubmit}>
          <div className="section-head">
            <p className="eyebrow">Form đặt lịch</p>
            <h2>Ghi nhận lịch dọn nhà</h2>
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
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.package_name}
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
    </main>
  )
}

export default App
