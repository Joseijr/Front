import { useMemo } from "react";
import type { AuthUser } from "./Auth";

export interface NotificationItem {
    id: string;
    claimantId?: string;
    claimantName: string;
    message: string;
    timeReference: string;
    detail: string;
}

export function useNotifications(user: AuthUser | null) {
    return useMemo<NotificationItem[]>(() => {
        if (!user) {
            return [];
        }

        return [
            {
                id: `notification-${user.id ?? "current-user"}`,
                claimantId: user.id,
                claimantName: user.username || user.id || "Usuario",
                message: "reclamó tu objeto y quiere contactarte para coordinar la entrega.",
                timeReference: "durationToDelete",
                detail: "Tu publicación permanecerá activa hasta que el tiempo de expiración termine y luego se eliminará automáticamente.",
            },
        ];
    }, [user]);
}
