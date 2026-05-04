import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Booking from './pages/Booking'
import About from './pages/About'
import Contact from './pages/Contact'
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
    <BrowserRouter>
      <NavBar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
