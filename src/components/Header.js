import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    const handleLogout = () => {
        alert("Đăng xuất thành công!");
        window.location.href = "/"; // Redirect về trang login
    };

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">My website</h1>
                <nav>
                    <ul className="nav-menu">
                        <li><Link to="/studentlist">Home</Link></li>
                        <li><Link to="/" onClick={handleLogout}>Đăng xuất</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;