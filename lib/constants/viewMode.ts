// Modalità di visualizzazione di una lista (card a griglia vs riga a
// larghezza piena). Vive qui e non in components/common/ViewModeToggle.tsx
// perché quel file è "use client": ogni export di un modulo client diventa una
// client reference nel grafo server, quindi un server component che importasse
// parseViewMode da lì fallirebbe a runtime ("Attempted to call
// parseViewMode() from the server"). Il toggle e la pagina che legge il cookie
// condividono queste costanti passando da questo modulo neutro.

export type ViewMode = "card" | "row";

/** Vista usata quando l'utente non ne ha ancora scelta una. */
export const DEFAULT_VIEW_MODE: ViewMode = "row";

// Preferenza persistente: un cookie invece di localStorage perché la vista
// serve al server component che fa il fetch (app/(public)/ingredients/page.tsx)
// — leggendola lato server la prima pagina esce già nella vista giusta, senza
// il salto card→row che darebbe un valore letto solo dopo l'idratazione.
export const VIEW_MODE_COOKIE = "tm_view_mode";

export function parseViewMode(value: string | undefined | null): ViewMode | null {
  return value === "card" || value === "row" ? value : null;
}
