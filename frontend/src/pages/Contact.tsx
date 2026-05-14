export default function Contact() {
  return (
    <section className="contact-grid">
      <div className="page-card">
        <p className="eyebrow">Liên hệ</p>
        <h2>Thông tin liên hệ và hỗ trợ.</h2>
        <div className="contact-list">
          <div className="contact-item">
            <strong>Điện thoại</strong>
            <span>0123-456-789</span>
          </div>
          <div className="contact-item">
            <strong>Email</strong>
            <span>contact@example.com</span>
          </div>
          <div className="contact-item">
            <strong>Giờ làm việc</strong>
            <span>08:00 - 18:00, Thứ 2 đến Thứ 7</span>
          </div>
        </div>
      </div>

      <div className="page-card">
        <p className="eyebrow">Mục tiêu giao diện</p>
        <h2>Ngắn gọn, rõ ràng và dễ chốt hành động.</h2>
        <p>
          Trang liên hệ không cần quá nhiều yếu tố. Nó chỉ cần giúp người dùng hiểu phải gọi ai, khi nào và
          có kênh nào khác nếu muốn đặt lịch nhanh.
        </p>

        <div className="highlight-band">
          <strong>Gợi ý cho báo cáo</strong>
          <span>
            Bạn có thể nói giao diện này ưu tiên luồng người dùng, thay vì chỉ làm đẹp bề mặt.
          </span>
        </div>
      </div>
    </section>
  )
}
