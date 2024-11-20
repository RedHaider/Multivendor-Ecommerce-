import React, { useState } from "react";
import axios from "axios";
import config from "../config";

const PasswordResetRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/password-reset/`, { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Email</button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;
