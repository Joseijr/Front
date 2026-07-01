import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FiltersSection from "../components/FiltersSection";
import Card from "../components/Card";
import { useAuth } from "../hooks/Auth";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/auth$/, "");

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  postType?: string;
  authorUsername: string;
  imageUrl: string | null;
  created_at: string;
}

function Home() {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAscending, setIsAscending] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"Todos" | "Perdido" | "Encontrado">("Todos");

  useEffect(() => {
    if (!token || token === "null" || token === "undefined") {
      setError("Inicia sesión para ver las publicaciones.");
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            logout();
          }
          const body = await response.json().catch(() => null);
          const message = body?.message || "No se pudieron cargar las publicaciones.";
          throw new Error(message);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedType !== "Todos") {
      filtered = filtered.filter((post) => post.postType === selectedType);
    }

    return filtered;
  }, [posts, selectedCategory, selectedType]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
  }, [isAscending, filteredPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 px-4 py-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Lost & Post</h1>
              <p className="text-zinc-400 mt-2">Publicaciones globales. Explora los objetos perdidos o encontrados.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/create-post"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
              >
                Crear publicación
              </Link>
              <button
                onClick={() => setIsAscending((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 px-5 py-3 text-sm font-semibold text-white hover:border-white transition"
              >
                {isAscending ? "Ordenar de nuevo a antiguo" : "Ordenar de antiguo a nuevo"}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <FiltersSection
              filters={["Electrónicos", "Llaves", "Ropa", "Documentos", "Otros"]}
              selectedFilter={selectedCategory}
              onSelectFilter={setSelectedCategory}
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="text-center text-zinc-400">Cargando publicaciones...</div>
            ) : error ? (
              <div className="rounded-3xl border border-red-600 bg-zinc-950 p-6 text-red-300">{error}</div>
            ) : sortedPosts.length === 0 ? (
              <div className="rounded-3xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-300">
                No hay publicaciones todavía. Crea una nueva publicando un objeto.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedPosts.map((post) => (
                  <Card
                    key={post.id}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    author={post.authorUsername}
                    date={new Date(post.created_at).toLocaleString()}
                    imageUrl={post.imageUrl}
                    postType={post.postType}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;