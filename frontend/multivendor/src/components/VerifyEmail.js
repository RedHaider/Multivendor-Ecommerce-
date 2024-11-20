import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function VerifyEmail() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/verify-email/${uidb64}/${token}/`);
        setMessage("Your email has been successfully verified! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      } catch (error) {
        setMessage("Email verification failed. The link may be invalid or expired.");
      }
    };
    verifyEmail();
  }, [uidb64, token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
