export type AspectRatioOption = "16:9" | "9:16";

export type FontOption = {
	label: string;
	value: string; // CSS font-family stack or class name hook
};

export const FONT_OPTIONS: FontOption[] = [
	{ label: "Inter", value: "font-inter" },
	{ label: "Sora", value: "font-sora" },
	{ label: "JetBrains Mono", value: "font-jetbrains" },
	{ label: "Lora", value: "font-lora" },
	{ label: "Outfit", value: "font-outfit" },
	{ label: "Roboto Mono", value: "font-robotomono" },
];

export type GradientOption = {
	id: string;
	label: string;
	className: string; // Tailwind utility gradient background
};

export const GRADIENTS: GradientOption[] = [
	{
		id: "sunset-glow",
		label: "Sunset Glow",
		className:
            "bg-[oklch(0.99_0_0)] bg-[radial-gradient(1200px_800px_at_0%_0%,oklch(0.78_0.16_30)_0%,oklch(0.99_0_0)_60%),radial-gradient(1000px_700px_at_100%_0%,oklch(0.82_0.13_70)_0%,oklch(0.99_0_0)_60%),radial-gradient(900px_700px_at_50%_100%,oklch(0.92_0.08_20)_0%,oklch(0.99_0_0)_60%)]",
	},
	{
		id: "ocean-breeze",
		label: "Ocean Breeze",
		className:
            "bg-[oklch(0.99_0_0)] bg-[radial-gradient(900px_700px_at_0%_0%,oklch(0.88_0.06_210)_0%,oklch(0.99_0_0)_60%),radial-gradient(900px_700px_at_100%_0%,oklch(0.9_0.09_180)_0%,oklch(0.99_0_0)_60%),radial-gradient(1200px_900px_at_50%_100%,oklch(0.96_0.02_230)_0%,oklch(0.99_0_0)_60%)]",
	},
	{
		id: "violet-mist",
		label: "Violet Mist",
		className:
            "bg-[oklch(0.99_0_0)] bg-[radial-gradient(1000px_800px_at_0%_100%,oklch(0.86_0.12_300)_0%,oklch(0.99_0_0)_60%),radial-gradient(1100px_800px_at_100%_100%,oklch(0.9_0.08_330)_0%,oklch(0.99_0_0)_60%),radial-gradient(1000px_800px_at_50%_0%,oklch(0.98_0.01_0)_0%,oklch(0.99_0_0)_60%)]",
	},
];

export type CardStyleOption = {
	id: string;
	label: string;
	className: string; // Tailwind classes applied to the card container
};

export const CARD_STYLES: CardStyleOption[] = [
	{
		id: "glass",
		label: "Verre dépoli",
		className:
			"backdrop-blur-md bg-white/10 border-white/30 shadow-[0_10px_40px_rgba(255,255,255,0.2)] card-glass",
	},
	{
		id: "soft",
		label: "Ombre douce",
		className: "bg-white/90 dark:bg-black/40 border border-border shadow-2xl card-soft",
	},
	{
		id: "outline",
		label: "Bordure nette",
		className: "bg-background border-2 border-primary/30 shadow-[0_2px_10px_rgba(0,0,0,0.06)] card-outline",
	},
];

export const DEFAULT_MARKDOWN = `# Titre

Tapez votre prompt ici. Utilisez le gras, l'italique, les listes et les titres.

- Texte en **gras**
- Texte en _italique_
- [Lien](https://example.com)
`;

export type AppState = {
	markdown: string;
	font: string; // value from FONT_OPTIONS
	gradientId: string; // id from GRADIENTS
	cardStyleId: string; // id from CARD_STYLES
	aspect: AspectRatioOption;
	transparent: boolean;
	fontSize: "sm" | "md" | "lg";
};

export const DEFAULT_STATE: AppState = {
	markdown: DEFAULT_MARKDOWN,
	font: FONT_OPTIONS[0].value,
	gradientId: GRADIENTS[0].id,
	cardStyleId: CARD_STYLES[0].id,
	aspect: "16:9",
	transparent: false,
	fontSize: "md",
};

export const STORAGE_KEY = "sniper-post-prompt-gpt5::state";


