import { useEffect, useState } from "react";

function StudentList() {
    const API_URL = "http://localhost:3001/students";

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);

    // Fetch data
    const fetchStudents = () => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Lỗi khi gọi API");
                return res.json();
            })
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Add student
    const handleAdd = () => {
        if (!name || !email) return alert("Vui lòng nhập đủ thông tin!");

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        }).then(() => {
            setName("");
            setEmail("");
            fetchStudents();
        });
    };

    // Delete student
    const handleDelete = (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa?")) return;

        fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
            fetchStudents();
        });
    };

    // Edit student (load data lên form)
    const handleEdit = (student) => {
        setEditId(student.id);
        setName(student.name);
        setEmail(student.email);
    };

    // Update student
    const handleUpdate = () => {
        fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        }).then(() => {
            setName("");
            setEmail("");
            setEditId(null);
            fetchStudents();
        });
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách sinh viên</h2>

            {/* Form thêm/sửa */}
            <div style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Tên sinh viên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email sinh viên"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {editId ? (
                    <button onClick={handleUpdate}>Cập nhật</button>
                ) : (
                    <button onClick={handleAdd}>Thêm</button>
                )}
                {editId && (
                    <button
                        onClick={() => {
                            setEditId(null);
                            setName("");
                            setEmail("");
                        }}
                    >
                        Hủy
                    </button>
                )}
            </div>

            {/* Danh sách sinh viên */}
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        <strong>{student.name}</strong> - {student.email}{" "}
                        <button onClick={() => handleEdit(student)}>Sửa</button>
                        <button onClick={() => handleDelete(student.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;