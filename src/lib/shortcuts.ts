import { useEffect } from "react";

export function useGlobalShortcuts(onSave: () => void, onExport: () => void) {
	useEffect(() => {
		if (typeof window === "undefined") return;
		const handler = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
				e.preventDefault();
				onSave();
			}
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
				e.preventDefault();
				onExport();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onSave, onExport]);
}


