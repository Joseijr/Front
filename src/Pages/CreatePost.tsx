import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/Auth";

const API_BASE = (() => {
  const raw = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  return raw.replace(/\/$/, "").replace(/\/auth$/, "");
})();

const categories = ["Electrónicos", "Llaves", "Ropa", "Documentos", "Otros"];

function CreatePost() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [postType, setPostType] = useState<"Perdido" | "Encontrado">("Perdido");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !token || token === "null" || token === "undefined") {
      logout();
      setError("Debes iniciar sesión para crear una publicación.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!title.trim() || !description.trim()) {
        setError("El título y la descripción son obligatorios.");
        return;
      }

      if (!image) {
        setError("La imagen es obligatoria para crear la publicación.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("postType", postType);
      formData.append("authorUsername", user.username);
      formData.append("user_id", user.id);
      if (image) {
        formData.append("image", image);
      }

      console.log("CreatePost payload", {
        title: title.trim(),
        description: description.trim(),
        category,
        postType,
        authorUsername: user.username,
        user_id: user.id,
        image: image ? image.name : null,
      });
      console.log("CreatePost FormData entries", Array.from(formData.entries()));

      const response = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
        }
        const body = await response.json().catch(() => null);
        console.error("CreatePost API response error", response.status, response.statusText, body);

        const validationErrors = Array.isArray(body?.errors)
          ? body.errors.map((issue: any) => {
            if (typeof issue === 'string') return issue;
            if (issue?.message) return issue.message;
            if (issue?.path) return `${issue.path.join('.')}: ${issue.message}`;
            return JSON.stringify(issue);
          })
          : [];

        const message = [body?.message, ...validationErrors].filter(Boolean).join(' - ');
        throw new Error(message || `Error al crear la publicación (${response.status})`);
      }

      setSuccess("Publicación creada correctamente.");
      setTitle("");
      setDescription("");
      setCategory(categories[0]);
      setPostType("Perdido");
      setImage(null);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la publicación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 px-4 py-8 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white">Crear nueva publicación</h1>
          <p className="mt-2 text-zinc-400">Agrega la información del objeto y una foto para publicarlo.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPostType("Perdido")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${postType === "Perdido"
                    ? "bg-red-500 text-white"
                    : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-white"
                  }`}
              >
                Perdido
              </button>
              <button
                type="button"
                onClick={() => setPostType("Encontrado")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${postType === "Encontrado"
                    ? "bg-emerald-500 text-white"
                    : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-white"
                  }`}
              >
                Encontrado
              </button>
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Ej. Celular perdido"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
              >
                {categories.map((option) => (
                  <option key={option} value={option} className="bg-zinc-900 text-white">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Describe qué pasó y dónde lo perdisteEncontraste..."
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setImage(file);
                }}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            {error ? <div className="rounded-2xl border border-red-600 bg-red-950 px-4 py-3 text-sm text-red-200">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-600 bg-emerald-950 px-4 py-3 text-sm text-emerald-200">{success}</div> : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition disabled:opacity-50"
              >
                {loading ? "Publicando..." : "Publicar objeto"}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex w-full items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:border-white transition"
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreatePost;