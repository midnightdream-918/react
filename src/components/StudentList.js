import { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
    const API_URL = "http://localhost:3001/students";
    const [students, setStudents] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    // Tách hàm fetch ra ngoài để tái sử dụng
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
            email: email
        });

        await fetchAPI();

        setFullName("");
        setEmail("");
        alert("Bạn đã thêm sinh viên thành công");
    };
    const handleDeleteMember = async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`)
        fetchAPI();
    }
    return (
        <div style={{ padding: 20 }}>
            <h1>Danh sách sinh viên Fit-up</h1>

            {/* Form nhập */}
            <div style={{ marginBottom: 20, display: "flex", gap: 5 }}>
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
                <button onClick={handleAddMember}>Thêm sinh viên</button>
            </div>

            {/* Danh sách sinh viên */}
            <ul>
                {students.map((student) => (
                    <li
                        key={student.id}
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            marginBottom: 5,
                        }}
                    >
                        <div>
                            <strong>
                                {student.id} - {student.name} - {student.email}
                            </strong>
                        </div>
                        <button>Sửa</button>
                        <button onClick={() => handleDeleteMember(student.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
