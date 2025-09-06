import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

function RegisterPage() {
    const [mssv, setMssv] = useState("");
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail.length > 0 && !isValidEmail(newEmail)) {
            setEmailError("Định dạng email chưa hợp lệ, email nên có định dạng name@yourdomain.com");
        } else {
            setEmailError("");
        }
    };

    const isStrongPassword = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isStrongPassword(newPassword) && newPassword.length > 0) {
            setPasswordError("Mật khẩu phải mạnh: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt!");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mssv || !fullName || !userName || !email || !password || !confirmPassword) {
            return alert("Vui lòng nhập đầy đủ thông tin!");
        }

        if (!isValidEmail(email)) {
            return alert("Email không đúng định dạng!");
        }

        if (password !== confirmPassword) {
            return alert("Mật khẩu xác nhận không khớp!");
        }

        if (!isStrongPassword(password)) {
            return alert("Mật khẩu phải mạnh: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt!");
        }

        try {
            await axios.post("http://localhost:3001/account", {
                mssv,
                fullName,
                userName,
                email,
                password,
            });
            alert("Đăng ký thành công! Bây giờ bạn có thể thử đăng nhập.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi đăng ký!");
        }
    };

    return (
        <div className="register-container">
            <form className="register-card register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Đăng ký</h2>
                <p className="register-subtitle">Vui lòng nhập thông tin để đăng ký</p>

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

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Mã sinh viên</label>
                        <input
                            type="text"
                            placeholder="Nhập mã sinh viên..."
                            value={mssv}
                            onChange={(e) => setMssv(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Nhập họ và tên..."
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Nhập email..."
                        value={email}
                        onChange={handleEmailChange}
                        className="form-input"
                        required
                    />
                    {emailError && <p className="error-text">{emailError}</p>} { }
                </div>

                <div className="form-group">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={handlePasswordChange}
                        className="form-input"
                        required
                    />
                    {passwordError && (
                        <div className="password-strength">
                            <div className="strength-bar">
                                <div className="strength-fill strength-weak"></div>
                            </div>
                            <p className="strength-text">{passwordError}</p>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <button type="submit" className="register-button">
                    Đăng ký
                </button>

                <div className="login-link">
                    Đã có tài khoản? <Link to="/">Đăng nhập</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;