import { useEffect, useState } from "react";
import axios from "axios";
import './StudentList.css';

function StudentList() {
    const API_URL = "http://localhost:3001/students";
    const [students, setStudents] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

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

    const handleAddMember = async () => {
        if (!fullName || !email) return alert("Bạn đã nhập thiếu thông tin");

        await axios.post(API_URL, {
            name: fullName,
            email: email,
        });

        await fetchAPI();

        setFullName("");
        setEmail("");
        alert("Bạn đã thêm sinh viên thành công");
    };

    const handleDeleteMember = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchAPI();
    };

    return (
        <div className="student-list-container">
            <h1 className="student-list-title">Danh sách sinh viên Fit-up</h1>

            {/* Form nhập */}
            <div className="student-form">
                <input
                    type="text"
                    placeholder="Hãy nhập tên sinh viên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Hãy nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="add-student-btn" onClick={handleAddMember}>
                    Thêm sinh viên
                </button>
            </div>

            {/* Bảng sinh viên */}
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Email sinh viên</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn">Sửa</button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteMember(student.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;