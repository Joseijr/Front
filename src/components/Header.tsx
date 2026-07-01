import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import NotificationsDropdown from "./NotificationsDropdown";

function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <header className="bg-zinc-900 py-3">
            <div className="max-w-7xl mx-1 flex items-center justify-between">

                {/* Logo */}

                <div className="flex items-center gap-3">
                    <img src="src/assets/Logo.svg" alt="Logo" className="w-8 h-8" />
                    <div>

                        <h1 className="text-3xl font-bold text-red-500">Lost and Post</h1>
                        <p className="text-lg text-white">Objetos perdidos</p>
                    </div>
                </div>

                {/* Nav */}
                <div className="text-white">

                    <nav className="flex gap-8">
                        <Link to="/" className="hover:text-red-500 hover:scale-105 transition-transform">
                            Inicio
                        </Link>
                        {user ? (
                            <Link to="/create-post" className="hover:text-red-500 hover:scale-105 transition-transform">
                                Crear Post
                            </Link>
                        ) : null}
                        <Link to="/profile" className="hover:text-red-500 hover:scale-105 transition-transform line-through">
                            Mis Posts
                        </Link>

                        {!user ? (
                            <>
                                <Link to="/login" className="hover:text-red-500 hover:scale-105 transition-transform">
                                    Login
                                </Link>
                                <Link to="/register" className="hover:text-red-500 hover:scale-105 transition-transform">
                                    Register
                                </Link>
                            </>
                        ) : null}
                    </nav>
                </div>

                {/* Acciones */}
                <div className="relative flex items-center gap-4">
                    {/* <input
                        type="text"
                        placeholder="Buscar objetos..."
                        className="bg-zinc-800 rounded-full px-4 py-2 w-64"
                    /> */}

                    <button className="bg-white text-black px-5 py-2 rounded-full font-medium">
                        Reportar
                    </button>

                    <NotificationsDropdown user={user} />

                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-full font-medium hover:bg-red-500 hover:text-white transition"
                        >
                            {user ? user.username : "Perfil"}
                            <span>▾</span>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-zinc-950 border border-zinc-700 shadow-xl overflow-hidden z-20">
                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-3 text-sm text-white hover:bg-zinc-800"
                                >
                                    Ver Perfil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-zinc-800"
                                >
                                    Cerrar Sesión
                                </button>
                                <div className="border-t border-zinc-800" />
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-zinc-800"
                                >
                                    Otra acción
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;