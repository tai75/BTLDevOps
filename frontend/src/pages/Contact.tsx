export default function Contact() {
  return (
    <section className="contact-grid">
      <div className="page-card">
        <p className="eyebrow">Liên hệ</p>
        <h2>Văn phòng hỗ trợ khách hàng BTL Clean</h2>
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
          <div className="contact-item">
            <strong>Địa chỉ</strong>
            <span>456 Lê Lợi, Quận Hải Châu, Đà Nẵng</span>
          </div>
        </div>
      </div>

      <div className="contact-stack">
        <div className="page-card">
          <p className="eyebrow">Bản đồ văn phòng</p>
          <h2>Vị trí hỗ trợ khách hàng</h2>
          <figure className="map-card">
            <img
              className="map-image"
              src="https://placehold.co/800x450/e8d5c4/8a4b12?text=Văn+phòng+BTL+Clean,+Đà+Nẵng"
              alt="Bản đồ vị trí văn phòng BTL Clean tại Đà Nẵng"
            />
            <figcaption>Văn phòng tiếp nhận và hỗ trợ khách hàng của BTL Clean.</figcaption>
          </figure>
        </div>

        <div className="page-card">
          <p className="eyebrow">Gửi lời nhắn nhanh</p>
          <h2>Nhận phản hồi trong thời gian sớm nhất</h2>
          <form className="quick-message-form">
            <label>
              Họ tên
              <input type="text" name="name" placeholder="Nhập họ tên của bạn" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Nhập email liên hệ" />
            </label>
            <label>
              Nội dung tin nhắn
              <textarea name="message" rows={5} placeholder="Bạn cần tư vấn dịch vụ nào?" />
            </label>
            <button type="button">Gửi lời nhắn</button>
          </form>
        </div>
      </div>
    </section>
  )
}
