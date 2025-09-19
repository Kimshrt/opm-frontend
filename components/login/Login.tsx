"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Login failed");
            } else {
                // Handle successful login (e.g., redirect, set cookie, etc.)
                window.location.href = "/aboutme";
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={e => setRememberMe(e.target.checked)}
                            style={{ marginRight: "0.5rem" }}
                        />
                        Remember Me
                    </label>
                </div>
                {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
                <button type="submit" disabled={loading} style={{ width: "100%" }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;