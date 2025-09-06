import LoginPage from "../containers/Login";
import RegisterPage from "../containers/RegisterPage";
import StudentList from "./StudentList";
import Info from "./Info";
import TableList from "./TableList";   // <-- import mới
import { Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './Body.css';


function Layout() {
    const location = useLocation();
    // Ẩn header/footer trên trang login ("/") và register ("/register")
    const showHeaderFooter = location.pathname !== "/" && location.pathname !== "/register";

    return (
        <>
            {showHeaderFooter && <Header />}
            <Outlet />
            {showHeaderFooter && <Footer />}
        </>
    );
}

function Body() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* Không dùng Layout */}
                <Route element={<Layout />}>
                    <Route path="/info" element={<Info />} />
                    <Route path="/studentlist" element={<StudentList />} />
                    <Route path="/tablelist" element={<TableList />} />
                </Route>
            </Routes>
        </main>
    );
}


export default Body;
