export default function About() {
  return (
    <section className="about-grid">
      <div className="page-card">
        <p className="eyebrow">Giới thiệu</p>
        <h2>Ứng dụng demo đặt lịch dọn nhà phục vụ đồ án DevOps.</h2>
        <p>
          Dự án này không chỉ là một bài làm kỹ thuật, mà còn là một mô hình nhỏ cho cách tách frontend,
          backend, database và deploy thành các phần có thể quản lý rõ ràng.
        </p>

        <p className="decor-quote">
          Mục tiêu của frontend là tạo ra trải nghiệm đủ đẹp để thuyết trình, nhưng vẫn đơn giản để bạn
          bảo trì và sửa khi cần.
        </p>
      </div>

      <div className="page-card">
        <p className="eyebrow">Điểm nhấn</p>
        <h2>Những thứ giao diện đang thể hiện.</h2>
        <div className="benefit-list">
          <div className="benefit-item">
            <strong>Trình bày tốt hơn</strong>
            <span>Tạo ấn tượng rõ ràng khi demo trước lớp hoặc báo cáo.</span>
          </div>
          <div className="benefit-item">
            <strong>Dễ mở rộng</strong>
            <span>Bạn vẫn có thể thêm trang dịch vụ, blog, hoặc dashboard sau này.</span>
          </div>
          <div className="benefit-item">
            <strong>Phù hợp Vercel</strong>
            <span>SPA + rewrite fallback giúp deploy và refresh route ổn định.</span>
          </div>
          <div className="benefit-item">
            <strong>Khớp đồ án</strong>
            <span>Thể hiện được frontend, API, Docker và CI/CD trong một project thống nhất.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
