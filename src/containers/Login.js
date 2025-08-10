function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Đăng nhập</h2>
                <form>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input type="text" placeholder="Tên đăng nhập" />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="Mật khẩu" />
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
