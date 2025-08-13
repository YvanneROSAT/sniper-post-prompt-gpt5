"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { PromptEditor } from "@/components/PromptEditor";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { DEFAULT_STATE, STORAGE_KEY, AppState } from "@/lib/presets";
import { toPng } from "html-to-image";
import { useGlobalShortcuts } from "@/lib/shortcuts";

export default function Home() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const exportPng = useCallback(async () => {
    if (!previewRef.current) return;
    const node = previewRef.current;
    const width = state.aspect === "16:9" ? 1920 : 1080;
    const height = state.aspect === "16:9" ? 1080 : 1920;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      width,
      height,
      backgroundColor: state.transparent ? "transparent" : undefined,
    });
    const link = document.createElement("a");
    link.download = `prompt-${state.aspect.replace(":", "x")}.png`;
    link.href = dataUrl;
    link.click();
  }, [state]);

  // shortcuts
  useGlobalShortcuts(
    () => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    },
    exportPng
  );

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Sniper Post Prompt gpt-5</h1>
      </header>
      <div className="grid grow grid-cols-1 gap-4 p-4 md:grid-cols-[360px_1fr]">
        <aside className="flex flex-col gap-4">
          <div className="rounded-lg border">
            <SettingsPanel
              font={state.font}
              setFont={(font) => setState((s) => ({ ...s, font }))}
              gradientId={state.gradientId}
              setGradientId={(gradientId) => setState((s) => ({ ...s, gradientId }))}
              cardStyleId={state.cardStyleId}
              setCardStyleId={(cardStyleId) => setState((s) => ({ ...s, cardStyleId }))}
              aspect={state.aspect}
              setAspect={(aspect) => setState((s) => ({ ...s, aspect }))}
              transparent={state.transparent}
              setTransparent={(transparent) => setState((s) => ({ ...s, transparent }))}
              fontSize={state.fontSize}
              setFontSize={(fontSize) => setState((s) => ({ ...s, fontSize }))}
              onExport={exportPng}
            />
          </div>
          <div className="rounded-lg border p-3">
            <div ref={previewRef}>
              <PreviewCanvas
                markdown={state.markdown}
                font={state.font}
                gradientId={state.gradientId}
                cardStyleId={state.cardStyleId}
                transparent={state.transparent}
                fontSize={state.fontSize}
                aspect={state.aspect}
              />
            </div>
          </div>
        </aside>

        <section className="rounded-lg border p-3">
          <PromptEditor
            value={state.markdown}
            onChange={(markdown) => setState((s) => ({ ...s, markdown }))}
          />
        </section>
      </div>
    </main>
  );
}
