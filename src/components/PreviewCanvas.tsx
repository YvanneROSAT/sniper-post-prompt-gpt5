"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
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
    // editorMode supprimé: simple uniquement
};

export const PreviewCanvas = forwardRef<HTMLDivElement, Props>(function PreviewCanvas(
    { markdown, font, gradientId, cardStyleId, transparent, fontSize, aspect },
    ref
) {
    const gradient = GRADIENTS.find((g) => g.id === gradientId)?.className ?? "";
    const cardStyle = CARD_STYLES.find((c) => c.id === cardStyleId)?.className ?? "";

    const containerRef = useRef<HTMLDivElement | null>(null);
    const baseRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);

    const baseWidth = aspect === "16:9" ? 1920 : 1080;
    const baseHeight = aspect === "16:9" ? 1080 : 1920;
    const fontSizeClass = fontSize === "sm" ? "text-[16px] md:text-[18px]" : fontSize === "lg" ? "text-[22px] md:text-[24px]" : "text-[18px] md:text-[20px]";

    useImperativeHandle(ref, () => baseRef.current as HTMLDivElement, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const cw = el.clientWidth;
            const ch = el.clientHeight;
            if (cw === 0 || ch === 0) return;
            const s = Math.min(cw / baseWidth, ch / baseHeight);
            setScale(s);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [baseWidth, baseHeight]);

    return (
        <div ref={containerRef} className="relative h-full w-full overflow-hidden">
            <div
                ref={baseRef}
                style={{
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                }}
                className={cn(
                    "mx-auto border bg-white",
                    transparent ? "bg-white" : cn("bg-white", gradient)
                )}
            >
                <div className="grid h-full w-full place-items-center p-4">
                    <Card className={cn("w-[70%]", cardStyle, font, fontSizeClass)}>
                        <CardContent className="max-w-none py-6 markdown-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </ReactMarkdown>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
});


