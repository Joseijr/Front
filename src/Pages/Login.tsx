import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/Login/LoginForm";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/Auth";

function Login() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (carnet: string, password: string) => {
        console.log("Login submitted", { carnet, password: password ? "[REDACTED]" : "" });

        try {
            await login(carnet, password);
            navigate("/");
        } catch (error) {
            console.error("Login page error:", error);
            setErrorMessage(error instanceof Error ? error.message : "Error en el inicio de sesión");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <LoginForm onSubmit={handleLogin} />
            {errorMessage ? (
                <div className="mx-auto max-w-md px-4 text-center text-red-400">
                    {errorMessage}
                </div>
            ) : null}
            <Footer />                
        </div>
    );
}

export default Login;
