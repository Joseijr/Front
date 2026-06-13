import { useState } from "react";

interface LoginFormProps {
    onSubmit?: (carnet: string, password: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [carnet, setCarnet] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(carnet, password);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl">

                <img
                    src="src/assets/Logo.svg"
                    alt="Logo"
                    className="w-16 h-16 mx-auto mb-4"
                />

                <h1 className="text-4xl font-bold text-white mb-2 text-center">
                    Bienvenido de nuevo
                </h1>

                <p className="text-zinc-400 mb-8 text-center">
                    Recupera lo que es tuyo.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm text-zinc-300 mb-2">
                            Carnet Universitario
                        </label>

                        <input
                            type="text"
                            placeholder="C12345"
                            value={carnet}
                            onChange={(e) => setCarnet(e.target.value)}
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none border border-zinc-700 focus:border-white"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm text-zinc-300">
                                Contraseña
                            </label>

                            <button
                                type="button"
                                className="text-xs text-red-400 hover:text-red-300"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none border border-zinc-700 focus:border-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-3 rounded-full font-semibold hover:scale-[1.02] transition-all hover:bg-red-500 hover:text-white"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="text-center text-zinc-400 mt-8">
                    ¿No tienes una cuenta?{" "}
                    <button
                        type="button"
                        className="text-white font-semibold hover:text-red-500"
                    >
                        Regístrate gratis
                    </button>
                </p>

            </div>
        </div>
    );
}

export default LoginForm;