import { useState } from "react";
import type { AuthUser } from "../hooks/Auth";
import { useNotifications } from "../hooks/useNotifications";

interface NotificationsDropdownProps {
    user: AuthUser | null;
}

function NotificationsDropdown({ user }: NotificationsDropdownProps) {
    const [open, setOpen] = useState(false);
    const notifications = useNotifications(user);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="relative rounded-full p-2 text-white transition hover:bg-zinc-800"
            >
                <span className="text-2xl">🔔</span>
                {notifications.length > 0 ? (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                        {notifications.length}
                    </span>
                ) : null}
            </button>

            {open ? (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-700 bg-zinc-950 p-3 shadow-2xl z-30">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">Notificaciones</p>
                        <span className="text-xs text-zinc-400">{notifications.length} nueva{notifications.length === 1 ? "" : "s"}</span>
                    </div>

                    {notifications.length > 0 ? (
                        <div className="space-y-2">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3"
                                >
                                    <p className="text-sm text-white">
                                        <span className="font-semibold text-red-400">{notification.claimantName}</span>{" "}
                                        {notification.message}
                                    </p>
                                    <p className="mt-2 text-xs text-zinc-400">{notification.detail}</p>
                                    <p className="mt-2 text-[11px] text-zinc-500">
                                        Referencia de tiempo: <span className="font-medium text-zinc-300">{notification.timeReference}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/70 p-3 text-sm text-zinc-400">
                            No tienes notificaciones por ahora.
                        </p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default NotificationsDropdown;
