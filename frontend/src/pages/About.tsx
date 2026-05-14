export default function About() {
  return (
    <section className="about-grid">
      <div className="page-card">
        <p className="eyebrow">Giới thiệu</p>
        <h2>Dịch vụ dọn nhà chuyên nghiệp, tận tâm với khách hàng</h2>
        <p>
          Chúng tôi cung cấp dịch vụ dọn nhà trọn gói cho các hộ gia đình và văn phòng. Đội ngũ được đào tạo
          chuyên nghiệp, sử dụng hóa chất an toàn và thiết bị hiện đại để đảm bảo không gian sạch sẽ và
          an toàn cho gia đình bạn.
        </p>

        <p className="decor-quote">
          Sứ mệnh của chúng tôi là mang đến không gian sống sạch, giúp bạn tiết kiệm thời gian và tận hưởng
          cuộc sống tiện nghi hơn.
        </p>
      </div>

      <div className="page-card">
        <p className="eyebrow">Dịch vụ</p>
        <h2>Gói dịch vụ linh hoạt, giá minh bạch</h2>
        <div className="benefit-list">
          <div className="benefit-item">
            <strong>Dọn thường</strong>
            <span>Dọn vệ sinh định kỳ, lau chùi, hút bụi, sắp xếp đồ đạc.</span>
          </div>
          <div className="benefit-item">
            <strong>Dọn sâu</strong>
            <span>Dọn kỹ từng ngóc ngách, làm sạch cửa sổ, đáy tủ, khu vực bếp.</span>
          </div>
          <div className="benefit-item">
            <strong>Chuyển nhà</strong>
            <span>Dọn sạch trước và sau khi chuyển nhà, giao nhận trả lại không gian mới sạch sẽ.</span>
          </div>
          <div className="benefit-item">
            <strong>Đặt theo giờ</strong>
            <span>Đặt linh hoạt theo khung giờ phù hợp với bạn.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
