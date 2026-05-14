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
            <p className="eyebrow">Dịch vụ phổ biến</p>
            <h2>Khách hàng thường đặt nhất</h2>
            <div className="service-list compact">
              <div className="service-card">
                <div>
                  <h3>Gói cơ bản</h3>
                  <p>Quét dọn, lau chùi cơ bản hàng tuần.</p>
                  <strong className="service-price">200k/1 phòng</strong>
                </div>
              </div>
              <div className="service-card">
                <div>
                  <h3>Gói tiêu chuẩn</h3>
                  <p>Vệ sinh sâu, làm sạch toàn diện nhà mới/cũ.</p>
                  <strong className="service-price">400k/1 phòng</strong>
                </div>
              </div>
              <div className="service-card">
                <div>
                  <h3>Vệ sinh máy lạnh</h3>
                  <p>Bảo trì và làm sạch lưới lọc chuyên nghiệp.</p>
                  <strong className="service-price">Liên hệ</strong>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <div className="page-card">
          <p className="eyebrow">Phản hồi từ khách hàng</p>
          <h2>Những trải nghiệm tích cực từ người đã sử dụng dịch vụ</h2>
          <div className="testimonial-list">
            <div className="testimonial-item">
              <strong>Ngọc Anh, Quận 3</strong>
              <span>
                “Nhân viên đến đúng giờ, làm sạch kỹ và rất lịch sự. Nhà mình nhìn gọn gàng hẳn sau buổi
                dọn.”
              </span>
            </div>
            <div className="testimonial-item">
              <strong>Anh Minh, Thủ Đức</strong>
              <span>
                “Giá báo rõ ràng, không có phí phát sinh. Mình đặt gói tổng vệ sinh và rất hài lòng với kết
                quả.”
              </span>
            </div>
            <div className="testimonial-item">
              <strong>Chị Hương, Bình Thạnh</strong>
              <span>
                “Dịch vụ nhanh, gọn và chuyên nghiệp. Đặt lịch buổi sáng thì chiều đã có người tới hỗ trợ
                rất tiện.”
              </span>
            </div>
          </div>
        </div>

        <div className="page-card">
          <p className="eyebrow">Cam kết dịch vụ</p>
          <h2>Luôn hướng đến sự hài lòng của khách hàng</h2>
          <div className="benefit-list">
            <div className="benefit-item">
              <strong>Sạch sẽ kỹ lưỡng</strong>
              <span>Chăm chút từng khu vực để đảm bảo không gian sống dễ chịu hơn.</span>
            </div>
            <div className="benefit-item">
              <strong>Đúng lịch hẹn</strong>
              <span>Làm việc đúng thời gian khách hàng mong muốn, không chậm trễ.</span>
            </div>
            <div className="benefit-item">
              <strong>Tư vấn tận tâm</strong>
              <span>Luôn sẵn sàng tư vấn gói dịch vụ phù hợp theo nhu cầu thực tế.</span>
            </div>
            <div className="benefit-item">
              <strong>Hỗ trợ nhanh</strong>
              <span>Phản hồi sớm để khách hàng dễ dàng đặt lịch và chủ động sắp xếp.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
