"use client";

import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CARD_STYLES, GRADIENTS } from "@/lib/presets";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
	markdown: string;
	font: string;
	gradientId: string;
	cardStyleId: string;
	transparent: boolean;
	fontSize: "sm" | "md" | "lg";
	aspect: "16:9" | "9:16";
};

export const PreviewCanvas = forwardRef<HTMLDivElement, Props>(function PreviewCanvas(
	{ markdown, font, gradientId, cardStyleId, transparent, fontSize, aspect },
	ref
) {
	const gradient = GRADIENTS.find((g) => g.id === gradientId)?.className ?? "";
	const cardStyle = CARD_STYLES.find((c) => c.id === cardStyleId)?.className ?? "";

	const wrapperSize = aspect === "16:9" ? "aspect-[16/9]" : "aspect-[9/16]";
	const fontSizeClass = fontSize === "sm" ? "text-base" : fontSize === "lg" ? "text-2xl" : "text-xl";

	return (
		<div
			ref={ref}
			className={cn(
				"relative w-full overflow-hidden rounded-lg border",
				wrapperSize,
				transparent ? "bg-transparent" : gradient
			)}
		>
			<div className="absolute inset-0 grid place-items-center p-4">
				<Card className={cn("max-w-[900px] w-full", cardStyle, font, fontSizeClass)}>
					<CardContent className="prose prose-zinc dark:prose-invert max-w-none py-6">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
					</CardContent>
				</Card>
			</div>
		</div>
	);
});


