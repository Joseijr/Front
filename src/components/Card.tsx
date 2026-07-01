import { useState } from "react";

type ClaimState = "idle" | "requested" | "confirmed";

interface CardProps {
    title: string;
    category: string;
    description: string;
    author: string;
    date: string;
    imageUrl: string | null;
    postType?: string;
    showActions?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

function Card(props: CardProps) {
    const [showContact, setShowContact] = useState(false);
    const [claimState, setClaimState] = useState<ClaimState>("idle");
    const showActions = props.showActions && (props.onEdit || props.onDelete);

    const cardStateClasses =
        claimState === "requested"
            ? "border-amber-600 bg-amber-950/15 shadow-amber-950/30"
            : claimState === "confirmed"
                ? "border-emerald-600 bg-emerald-950/15 shadow-emerald-950/30"
                : "border-zinc-800 bg-zinc-900";

    return (
        <div className={`group relative w-full overflow-hidden rounded-2xl border shadow-lg transition-transform hover:scale-[1.01] ${cardStateClasses}`}>
            <div className="relative h-72 bg-zinc-950">
                {props.imageUrl ? (
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-900 text-zinc-500">
                        Sin imagen
                    </div>
                )}

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                        {props.category}
                    </span>
                    {claimState === "requested" ? (
                        <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-zinc-950">
                            Solicitado
                        </span>
                    ) : null}
                    {claimState === "confirmed" ? (
                        <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
                            Reclamado
                        </span>
                    ) : null}
                    {props.postType ? (
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${props.postType === "Encontrado" ? "bg-emerald-600 text-white" : "bg-zinc-800 text-white"}`}>
                            {props.postType}
                        </span>
                    ) : null}
                </div>

                {showActions ? (
                    <div className="absolute inset-0 flex items-start justify-end gap-2 bg-black/40 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        {props.onEdit ? (
                            <button
                                type="button"
                                onClick={props.onEdit}
                                className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white"
                            >
                                Editar
                            </button>
                        ) : null}
                        {props.onDelete ? (
                            <button
                                type="button"
                                onClick={props.onDelete}
                                className="rounded-full bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400"
                            >
                                Eliminar
                            </button>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className="p-5 text-white">
                <h2 className="mb-2 text-2xl font-semibold">{props.title}</h2>
                <p className="mb-4 line-clamp-3 text-zinc-300">{props.description}</p>

                <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-zinc-300">
                    <div className="flex items-center justify-between gap-2">
                        <span>{claimState === "confirmed" ? "Estado del objeto" : "¿Es tuyo?"}</span>
                        {showActions ? (
                            claimState === "requested" ? (
                                <button
                                    type="button"
                                    onClick={() => setClaimState("confirmed")}
                                    className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                                >
                                    Confirmar reclamo
                                </button>
                            ) : (
                                <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                                    {claimState === "confirmed" ? "Confirmado" : "Sin reclamos"}
                                </span>
                            )
                        ) : (
                            <button
                                type="button"
                                onClick={() => setClaimState("requested")}
                                disabled={claimState !== "idle"}
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${claimState === "idle"
                                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                                    : "cursor-not-allowed bg-zinc-700 text-zinc-300"}`}
                            >
                                {claimState === "idle" ? "Reclamar" : claimState === "requested" ? "Solicitud enviada" : "Reclamado"}
                            </button>
                        )}
                    </div>
                    {claimState === "requested" ? (
                        <p className="mt-2 text-xs text-amber-400">Tu solicitud fue enviada al creador del post y está pendiente de confirmación.</p>
                    ) : null}
                    {claimState === "confirmed" ? (
                        <p className="mt-2 text-xs text-emerald-400">El creador confirmó que este objeto ya fue reclamado y retirado.</p>
                    ) : null}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-400">
                    <span>Por {props.author}</span>
                    <button
                        type="button"
                        onClick={() => setShowContact(true)}
                        className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-200 hover:border-white hover:text-white"
                    >
                        Información
                    </button>
                </div>
            </div>

            {showContact ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-sm rounded-3xl border border-zinc-700 bg-zinc-900 p-5 shadow-2xl">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-white">Información de contacto</p>
                                <p className="mt-1 text-sm text-zinc-400">Este usuario puede responderte para coordinar la entrega.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowContact(false)}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-700"
                            >
                                Cerrar
                            </button>
                        </div>

                        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                            <p className="text-sm text-zinc-400">Teléfono</p>
                            <p className="mt-1 text-lg font-semibold text-white">+504 9999-9999</p>
                        </div>

                        <div className="mt-3 rounded-2xl border border-amber-700/40 bg-amber-950/30 p-3 text-sm text-amber-200">
                            <p className="font-semibold">Tiempo de publicación</p>
                            <p className="mt-1">Esta publicación podrá eliminarse automáticamente luego de la duración configurada desde el backend.</p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Card;