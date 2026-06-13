import { Link } from "react-router-dom"
function Header() {
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
                <nav className="flex gap-8">
                    <Link to="/" className="hover:text-red-500 hover:scale-105 transition-transform">
                        Inicio
                    </Link>
                    <a href="/posts" className="hover:text-red-500 line-through ">
                        Mis Posts
                    </a>

                    {/* Temporal para probar links */}
                
                    
                    <Link to="/login" className="hover:text-red-500 hover:scale-105 transition-transform">
                        Login
                    </Link>
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-4">
                    {/* <input
                        type="text"
                        placeholder="Buscar objetos..."
                        className="bg-zinc-800 rounded-full px-4 py-2 w-64"
                    /> */}

                    <button className="bg-white text-black px-5 py-2 rounded-full font-medium">
                        Reportar Objeto
                    </button>

                    <button>🔔</button>
                    <button>👤</button>
                </div>

            </div>
        </header>
    );
}

export default Header;