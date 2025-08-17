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
    const getFontSizeClass = () => {
        const baseSize = fontSize === "sm" ? 16 : fontSize === "lg" ? 22 : 18;
        const boost = aspect === "16:9" ? 2 : 0; // Légerement plus gros 
        return `text-[${baseSize + boost}px]`;
    };
    const fontSizeClass = getFontSizeClass();

    useImperativeHandle(ref, () => baseRef.current as HTMLDivElement, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const cw = el.clientWidth;
            const ch = el.clientHeight;
            if (cw === 0 || ch === 0) return;
            
            // Scaling adaptatif mobile first
            const baseScale = Math.min(cw / baseWidth, ch / baseHeight);
            
            // Scaling différencié selon la taille d'écran et le format
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
            
            let s = baseScale;
            if (aspect === "16:9") {
                if (isMobile) {
                    s = baseScale * 1.2; // +20% sur mobile pour 16:9
                } else if (isTablet) {
                    s = baseScale * 1.4; // +40% sur tablet pour 16:9  
                } else {
                    s = baseScale * 1.2; // +60% sur desktop pour 16:9
                }
            } else {
                s = baseScale; // 9:16 garde le scaling normal
            }
            setScale(s);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [baseWidth, baseHeight, aspect]);

    return (
        <div ref={containerRef} className={cn(
            "relative h-full w-full overflow-hidden flex items-center justify-center"
        )}>
            <div
                ref={baseRef}
                style={{
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                }}
                className={cn(
                    "bg-white",
                    transparent ? "bg-transparent !border-0" : cn("bg-white border", gradient)
                )}
            >
                <div className="h-full w-full flex items-center justify-center p-4">
                    <Card className={cn(
                        "preview-content !flex-none !py-0 !gap-0",
                        aspect === "16:9" ? "w-[88%]" : "w-[80%]", // +10% pour 16:9
                        cardStyle, 
                        font, 
                        fontSizeClass
                    )}>
                    <CardContent className="max-w-none !px-6 py-6 markdown-body">
                        {markdown.trim() ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </ReactMarkdown>
                        ) : (
                            <div className="text-gray-400 italic text-center py-8">
                                <p className="text-lg mb-2">🎨 Aperçu de votre prompt</p>
                                <p className="text-sm">Commencez à taper dans l&apos;éditeur pour voir le résultat ici</p>
                            </div>
                        )}
                    </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
});


