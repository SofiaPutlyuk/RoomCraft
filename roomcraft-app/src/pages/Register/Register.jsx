import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ModalAlert } from "./ModalAlert";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { MdLock } from "react-icons/md";

export const Register = ({setUser}) => {
    const intialState = {
        name: "",
        email: "",
        password: "",
        verify: "",
    };
    const navigate = useNavigate();

    function reducer(state, action) {
        switch (action.type) {
            case "UPDATE_FORM":
                return {
                    ...state,
                    [action.field]: action.value,
                };
            case "RESET_FORM":
                return intialState;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, intialState);
    const [alert, setAlert] = useState("");

    const handleChange = (field) => (e) => {
        dispatch({ type: "UPDATE_FORM", field, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!state.name || !state.email || !state.password || !state.verify) {
            setAlert("Please fill in all fields");
            return;
        }

        if (state.password.length < 8) {
            setAlert("Password must be at least 8 characters long");
            return;
        }

        if (!state.email.includes("@")) {
            setAlert("Email must contain sign @");
            return;
        }

        if (state.password !== state.verify) {
            setAlert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some((u) => u.email === state.email)) {
            setAlert("User with this email already exists");
            return;
        }

        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setUser(newUser);
        setAlert("Successful registration!");
        dispatch({ type: "RESET_FORM" });
        setTimeout(() => {
            navigate("/create-character");
        }, 1000);
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>

                <div className="input-group">
                    <FaUserAlt className="icon" />
                    <input
                        type="text"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleChange("name")}
                    />
                </div>

                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange("email")}
                    />
                </div>

                <div className="input-group">
                    <MdLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange("password")}
                    />
                </div>

                <div className="input-group">
                    <MdLock className="icon" />
                    <input
                        type="password"
                        placeholder="Verify Password"
                        value={state.verify}
                        onChange={handleChange("verify")}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {alert && <ModalAlert message={alert} onClose={() => setAlert("")} />}
        </div>
    );
};
