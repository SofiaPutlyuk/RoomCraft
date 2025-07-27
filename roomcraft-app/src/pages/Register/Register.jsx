import { useState, useReducer } from "react"
import { useNavigate } from "react-router-dom";
import { ModalAlert } from "./ModalAlert";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
export const Register = () => {
    const intialState = {
        name: "",
        email: "",
        password: "",
        verify: "",
    }
      const navigate = useNavigate();
    function reducer(state, action) {
        switch (action.type) {
            case "UPDATE_FORM":
                return {
                    ...state,
                    [action.field]: action.value
                }
            case "SEND":
                return state;
            case "RESET_FORM":
                return intialState;
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, intialState)
    const [alert, setAlert] = useState("");
    const handleChange = (field) => (e) => {
        dispatch({ type: "UPDATE_FORM", field, value: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!state.name || !state.email || !state.password || !state.verify) {
            setAlert("Please fill in all fields");
            return;
        }
       if (state.password.length < 8) {
        setAlert("Password must be at least 8 characters long");
        return;
    }
        if (!state.email.includes("@")) {
            setAlert("Email must contain sign @")
            return;
        }
        dispatch({ type: "SEND" })
        localStorage.setItem("userData", JSON.stringify(state));
        setAlert("Successful")
         dispatch({ type: "RESET_FORM" });
       setTimeout(() => {
            navigate("/create-character");
        }, 1000);
    }
    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Create Your Account</h2>
                <div className="input-group">
                    <FaUserAlt className="icon" />
                    <input type="text" placeholder="Name" value={state.name} onChange={handleChange("name")} />
                </div>

                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" value={state.email} onChange={handleChange("email")} />
                </div>

                <div className="input-group">
                    <MdLock className="icon" />
                    <input type="password" placeholder="Password" value={state.password} onChange={handleChange("password")} />
                </div>

                <div className="input-group">
                    <MdLock className="icon" />
                    <input type="password" placeholder="Verify" value={state.verify} onChange={handleChange("verify")} />
                </div>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            {alert && <ModalAlert message={alert} onClose={() => setAlert("")} />}
        </div>
    )
}