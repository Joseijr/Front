import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useAuth } from "../hooks/Auth";
import { Link } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/auth$/, "");
const categoryOptions = ["Electrónicos", "Llaves", "Ropa", "Documentos", "Otros"];

interface Post {
    id: string;
    title: string;
    description: string;
    category: string;
    authorUsername: string;
    imageUrl: string | null;
    created_at: string;
}

function Profile() {
    const { user, token, logout } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", category: "" });
    const [image, setImage] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchUserPosts = async () => {
        if (!user || !token) {
            setPosts([]);
            return;
        }

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
                const message = body?.message || "No se pudieron cargar tus publicaciones.";
                throw new Error(message);
            }

            const data: Post[] = await response.json();
            const userPosts = data.filter((post) => post.authorUsername === user.username);
            setPosts(userPosts);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar tus publicaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [token, user]);

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            description: post.description,
            category: post.category,
        });
        setImage(null);
    };

    const canManagePost = (post: Post) => user?.username === post.authorUsername;

    const handleDelete = async (postId: string) => {
        if (!token) return;

        const confirmed = window.confirm("¿Seguro que querés eliminar esta publicación?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${API_BASE}/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.message || "No se pudo eliminar la publicación");
            }

            setPosts((current) => current.filter((post) => post.id !== postId));
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo eliminar la publicación");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editingPost || !token) return;

        const title = formData.title.trim();
        const description = formData.description.trim();
        const category = formData.category.trim();

        if (!title || !description || !category) {
            setError("Título, descripción y categoría son obligatorios.");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("authorUsername", user?.username || "");
            formData.append("user_id", user?.id || "");
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(`${API_BASE}/posts/${editingPost.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.message || "No se pudo actualizar la publicación");
            }

            const updatedPost = await response.json();
            setPosts((current) => current.map((post) => (post.id === editingPost.id ? updatedPost : post)));
            setEditingPost(null);
            setFormData({ title: "", description: "", category: "" });
            setImage(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo actualizar la publicación");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main className="max-w-5xl mx-auto px-4 py-10">
                {user ? (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-xl">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Mi Perfil</h1>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-zinc-950 p-6">
                                <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm mb-2">Usuario</p>
                                <p className="text-xl font-semibold">{user.username}</p>
                            </div>

                            <div className="rounded-2xl bg-zinc-950 p-6">
                                <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm mb-2">Carnet</p>
                                <p className="text-xl font-semibold">{user.carnet}</p>
                            </div>

                            <div className="rounded-2xl bg-zinc-950 p-6">
                                <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm mb-2">Registrado</p>
                                <p className="text-xl font-semibold">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-zinc-400">
                                Bienvenido a tu panel. Desde aquí puedes ver los datos de tu cuenta y continuar navegando por el dashboard.
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-2xl font-semibold text-white">Mis publicaciones</h2>
                                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                                    {posts.length} {posts.length === 1 ? "publicación" : "publicaciones"}
                                </span>
                            </div>

                            {editingPost && (
                                <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                                    <h3 className="mb-4 text-xl font-semibold text-white">Editar publicación</h3>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm text-zinc-400">Título</label>
                                            <input
                                                value={formData.title}
                                                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                                                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-2 text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-zinc-400">Categoría</label>
                                            <select
                                                value={formData.category}
                                                onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                                                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-2 text-white"
                                                required
                                            >
                                                {Array.from(new Set([...categoryOptions, formData.category]))
                                                    .filter(Boolean)
                                                    .map((option) => (
                                                        <option key={option} value={option} className="bg-zinc-900 text-white">
                                                            {option}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="mb-2 block text-sm text-zinc-400">Descripción</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                                            className="min-h-28 w-full rounded-xl border border-zinc-700 bg-black px-4 py-2 text-white"
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <label className="mb-2 block text-sm text-zinc-400">Foto (opcional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
                                            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-2 text-white"
                                        />
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="rounded-full bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400 disabled:opacity-70"
                                        >
                                            {saving ? "Guardando..." : "Guardar cambios"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingPost(null);
                                                setFormData({ title: "", description: "", category: "" });
                                                setImage(null);
                                            }}
                                            className="rounded-full border border-zinc-700 px-4 py-2 font-semibold text-zinc-300 hover:bg-zinc-800"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}

                            {loading ? (
                                <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
                                    Cargando tus publicaciones...
                                </div>
                            ) : error ? (
                                <div className="mt-4 rounded-2xl border border-red-600 bg-zinc-950 p-6 text-red-300">
                                    {error}
                                </div>
                            ) : posts.length === 0 ? (
                                <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
                                    Todavía no creaste publicaciones.
                                </div>
                            ) : (
                                <div className="mt-6 grid gap-6 md:grid-cols-2">
                                    {posts.map((post) => (
                                        <Card
                                            key={post.id}
                                            title={post.title}
                                            category={post.category}
                                            description={post.description}
                                            author={post.authorUsername}
                                            date={new Date(post.created_at).toLocaleString()}
                                            imageUrl={post.imageUrl}
                                            showActions={true}
                                            onEdit={canManagePost(post) ? () => handleEdit(post) : undefined}
                                            onDelete={canManagePost(post) ? () => handleDelete(post.id) : undefined}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-xl text-center">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">No estás autenticado</h1>
                        <p className="text-zinc-400 mb-6">Ingresá con tu carnet y contraseña para ver tu perfil.</p>
                        <Link
                            to="/login"
                            className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-400 transition"
                        >
                            Ir a Login
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Profile;