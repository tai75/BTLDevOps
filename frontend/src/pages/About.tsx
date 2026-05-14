export default function About() {
  return (
    <section className="about-grid">
      <div className="page-card">
        <p className="eyebrow">Giới thiệu</p>
        <h2>Sứ mệnh của BTL Clean</h2>
        <p>
          Chuyên cung cấp giải pháp vệ sinh nhà ở thông minh, giúp khách hàng tiết kiệm thời gian và tận
          hưởng không gian sống sạch sẽ, tiện nghi hơn mỗi ngày.
        </p>

        <p className="decor-quote">
          Chúng tôi tin rằng một ngôi nhà sạch sẽ không chỉ là nơi ở thoải mái, mà còn là nền tảng cho cuộc
          sống khỏe mạnh và năng suất hơn.
        </p>
      </div>

      <div className="page-card">
        <p className="eyebrow">Con số ấn tượng</p>
        <h2>Niềm tin được xây dựng từ kết quả thực tế</h2>
        <div className="stat-grid">
          <div className="metric-card">
            <strong>1000+</strong>
            <span>Khách hàng tin dùng</span>
          </div>
          <div className="metric-card">
            <strong>50+</strong>
            <span>Nhân viên chuyên nghiệp</span>
          </div>
          <div className="metric-card">
            <strong>5+</strong>
            <span>Năm kinh nghiệm trong ngành</span>
          </div>
        </div>
      </div>
    </section>
  )
}
