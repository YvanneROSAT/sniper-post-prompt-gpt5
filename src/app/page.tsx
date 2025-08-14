"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SimpleEditor } from "@/components/PromptEditor";
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
      pixelRatio: 1,
      width,
      height,
      backgroundColor: state.transparent ? "transparent" : "#ffffff",
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
  const editorValue = state.markdown;

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="border-b px-4 py-3 app-header mb-3">
        <h1 className="text-lg font-semibold">Sniper Post Prompt</h1>
      </header>
      {/* Paramètres à gauche (initial), contenu à droite */}
      <div className="grid grow grid-cols-1 gap-4 p-0 md:grid-cols-[360px_1fr]">
        {/* Colonne gauche: paramètres */}
        <aside className="flex flex-col gap-4 panel-params rounded-lg border p-2">
          <div>
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
        </aside>

        {/* Colonne droite: éditeur + preview côte à côte (éditeur 30%, preview 70%) */}
        <section className="rounded-none md:rounded-lg border md:p-3 p-0 panel-card">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_7fr] h-[calc(100dvh-60px)] md:h-[calc(100dvh-120px)]">
            <div className="rounded-none md:rounded-md border p-2 overflow-auto panel-editor">
              <SimpleEditor
                value={editorValue}
                onChange={(markdown) => setState((s) => ({ ...s, markdown }))}
              />
            </div>
            <div className="rounded-none md:rounded-md border p-2 overflow-hidden panel-preview">
              <PreviewCanvas
                ref={previewRef}
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
        </section>
      </div>
    </main>
  );
}
