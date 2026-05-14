import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-card">
          <p className="eyebrow">Dịch vụ dọn nhà chuyên nghiệp</p>
          <h1>Không gian sạch sẽ, cuộc sống tiện nghi. Đặt lịch dọn nhà chỉ trong 30 giây</h1>
          <p className="hero-copy">
            Dịch vụ dọn nhà trọn gói, an toàn và tiện lợi cho mọi gia đình. Chúng tôi cam kết chất lượng,
            đúng hẹn và giá cả minh bạch.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/booking">
              Đặt lịch ngay
            </Link>
            <Link className="button-secondary" to="/contact">
              Liên hệ hỗ trợ
            </Link>
          </div>

          <div className="status-row">
            <div className="status-pill">
              <strong>Nhân viên uy tín</strong>
              <span>Đội ngũ được đào tạo bài bản, lý lịch rõ ràng.</span>
            </div>
            <div className="status-pill">
              <strong>Giá cả minh bạch</strong>
              <span>Chi phí hiển thị ngay khi đặt, không phát sinh.</span>
            </div>
            <div className="status-pill muted">
              <strong>Phục vụ nhanh chóng</strong>
              <span>Có mặt sau 60 phút đặt lịch.</span>
            </div>
          </div>
        </div>

        <aside className="hero-sidebar">
          <div className="info-card">
            <p className="eyebrow">Điểm mạnh</p>
            <h2>Giao diện có cấu trúc</h2>
            <div className="feature-list">
              <div className="feature-item">
                <strong>Hero rõ mục tiêu</strong>
                <span>Ngay lập tức biết website làm gì và phải bấm vào đâu.</span>
              </div>
              <div className="feature-item">
                <strong>CTA nổi bật</strong>
                <span>Đặt lịch và xem thêm thông tin đều có đường đi rõ ràng.</span>
              </div>
              <div className="feature-item">
                <strong>Thiết kế thống nhất</strong>
                <span>Màu sắc, bo góc và bóng đổ được dùng đồng bộ giữa các trang.</span>
              </div>
              <div className="feature-item">
                <strong>Tương thích mobile</strong>
                <span>Layout tự co giãn để nhìn ổn trên màn hình nhỏ.</span>
              </div>
            </div>
          </div>

          <div className="highlight-band">
            <strong>Gợi ý cho đồ án</strong>
            <span>
              Nếu bạn cần trình bày, trang này có thể dùng làm landing page chính, còn các route khác giữ
              vai trò trang phụ.
            </span>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <div className="page-card">
          <p className="eyebrow">Luồng sử dụng</p>
          <h2>Người dùng đi từ xem dịch vụ đến đặt lịch trong vài bước.</h2>
          <ol className="benefit-list">
            <li className="benefit-item">
              <strong>1. Xem trang chủ</strong>
              <span>Hiểu ngay dịch vụ, quy mô dự án và lý do sản phẩm tồn tại.</span>
            </li>
            <li className="benefit-item">
              <strong>2. Chọn gói dịch vụ</strong>
              <span>Những gói cần thiết được đưa vào form đặt lịch.</span>
            </li>
            <li className="benefit-item">
              <strong>3. Gửi form</strong>
              <span>Frontend gọi API backend để tạo booking thật.</span>
            </li>
            <li className="benefit-item">
              <strong>4. Xác nhận</strong>
              <span>Người dùng nhận phản hồi thành công hoặc lỗi ngay trên giao diện.</span>
            </li>
          </ol>
        </div>

        <div className="page-card">
          <p className="eyebrow">Tóm tắt dự án</p>
          <h2>Thiết kế hiện tại phù hợp để demo lẫn deploy.</h2>
          <div className="stat-grid">
            <div className="metric-card">
              <strong>4</strong>
              <span>route chính</span>
            </div>
            <div className="metric-card">
              <strong>1</strong>
              <span>luồng đặt lịch</span>
            </div>
            <div className="metric-card">
              <strong>2</strong>
              <span>môi trường deploy</span>
            </div>
          </div>
          <p className="decor-quote">
            Một landing page tốt cho đồ án không cần quá nhiều hiệu ứng. Cái cần nhất là trật tự, điểm nhấn
            và cảm giác có chủ đích.
          </p>
        </div>
      </section>
    </>
  )
}
