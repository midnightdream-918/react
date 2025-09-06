import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Login.css';

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:3001/account");
            const account = res.data.find(
                (acc) => acc.userName === userName && acc.password === password
            );

            if (account) {
                alert("Đăng nhập thành công!");
                navigate("/studentlist");
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server!");
        }
    };

    return (
        <div className="login-container">
            <form className="login-card login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Đăng nhập</h2>
                <p className="login-subtitle">Vui lòng nhập thông tin để đăng nhập</p>
                <div className="form-group">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        placeholder="Nhập tên đăng nhập..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Đăng nhập
                </button>

                <div className="signup-link">
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;