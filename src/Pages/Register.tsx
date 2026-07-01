import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RegisterForm from "../components/Register/RegisterForm";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/Auth";

function Register() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (
        username: string,
        carnet: string,
        password: string,
        confirmPassword: string
    ) => {
        console.log("Register submitted", { username, carnet, password: password ? "[REDACTED]" : "", confirmPassword: confirmPassword ? "[REDACTED]" : "" });

        try {
            await register(username, carnet, password);
            navigate("/");
        } catch (error) {
            console.error("Register page error:", error);
            setErrorMessage(error instanceof Error ? error.message : "Error en el registro");
        }
    };

    return (
        <div className="min-h-screen text-white bg-black">
            <Header />
            <RegisterForm onSubmit={handleRegister} />
            {errorMessage ? (
                <div className="mx-auto max-w-md px-4 text-center text-red-400">
                    {errorMessage}
                </div>
            ) : null}
            <Footer />
        </div>
    );
}

export default Register;
