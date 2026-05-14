import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const loc = useLocation()
  const isActive = (path: string) => (loc.pathname === path ? 'nav-link active' : 'nav-link')

  return (
    <nav className="site-nav">
      <ul>
        <li>
          <Link className={isActive('/')} to="/">
            BTLDevOps
          </Link>
        </li>
        <li>
          <Link className={isActive('/')} to="/">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link className={isActive('/booking')} to="/booking">
            Đặt lịch
          </Link>
        </li>
        <li>
          <Link className={isActive('/about')} to="/about">
            Giới thiệu
          </Link>
        </li>
        <li>
          <Link className={isActive('/contact')} to="/contact">
            Liên hệ
          </Link>
        </li>
      </ul>
    </nav>
  )
}
