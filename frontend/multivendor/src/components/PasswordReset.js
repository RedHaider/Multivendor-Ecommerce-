import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const PasswordReset = () => {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                `${config.API_BASE_URL}/api/password-reset-confirm/${uidb64}/${token}/`,
                { password }
            );
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Set New Password</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordReset;
