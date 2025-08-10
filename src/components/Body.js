import LoginPage from "../containers/Login";
function Body() {
    const a = 5;
    const fullName = 'Ning';
    let age = 20;
    let className = 'MisB';
    let uniName = 'NEU';
    const logined = true;
    const loginStatus = logined ? "Da dang nhap" : "Chua dang nhap"
    return (
        logined ? (<div>
            <h1>Giá trị a: {a}</h1>
            <h2>Họ và tên: {fullName}</h2>
            <p>Tuổi: {age}</p>
            <p>Lớp: {className}</p>
            <p>Trường: {uniName}</p>
        </div>
        )
            :
            (<LoginPage></LoginPage>)
    )
}

export default Body;
