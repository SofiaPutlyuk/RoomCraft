import { useState } from "react";

export const LoginModal = ({ isOpen, onRequestClose, onLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find(u => u.email === formData.email);
        if (!foundUser) {
            setError("User does not exist. Please sign up.");
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        onLogin({ name: foundUser.email.split("@")[0] });
        onRequestClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onRequestClose}>×</button>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-btn">Log in</button>
                </form>
            </div>
        </div>
    );
};
