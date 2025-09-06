import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './StudentList.css';

function TableList() {
    const API_URL = "http://localhost:3001/students";
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const fetchAPI = async () => {
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <div className="student-list-container">
            <h1 className="student-list-title">Danh sách sinh viên (dạng bảng)</h1>

            {/* Button chuyển sang thẻ */}
            <button
                className="switch-btn"
                onClick={() => navigate("/studentlist")}
                style={{ marginBottom: "15px" }}
            >
                Chuyển sang dạng thẻ
            </button>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Email sinh viên</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableList;
