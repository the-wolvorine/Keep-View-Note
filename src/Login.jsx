import db from "./config"
import React, {useState, useEffect} from "react";

function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

function loginClicked()
{
    alert("login clicked"+userEmail+" "+userPassword)
}
return (
    <div>
        Email:
        <div>
        <input type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        />
    </div>

Password:
    <div>
        <input type="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        />
    </div>

    <div>
        <button onClick={loginClicked} >
            Login
        </button>
    </div>

    </div>
)

}

export default Login;