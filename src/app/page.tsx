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
    } catch (error) {
      console.warn('Erreur lors du chargement des données sauvegardées:', error);
      // on continue avec l'état pas défault
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde:', error);
    }
  }, [state]);

  const exportPng = useCallback(async () => {
    if (!previewRef.current) return;
    const node = previewRef.current;
    const width = state.aspect === "16:9" ? 1920 : 1080;
    const height = state.aspect === "16:9" ? 1080 : 1920;
    
    // Forcer temporairement des styles pour un centrage parfait
    const originalStyles = {
      transform: node.style.transform,
      transformOrigin: node.style.transformOrigin,
      display: node.style.display,
      alignItems: node.style.alignItems,
      justifyContent: node.style.justifyContent
    };
    
    // On applique les styles 
    node.style.transform = 'scale(1)';
    node.style.transformOrigin = 'center center';
    node.style.display = 'flex';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    
    try {
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
    } finally {
      // On restaure tous les styles de base 
      if (originalStyles.transform) {
        node.style.transform = originalStyles.transform;
      } else {
        node.style.removeProperty('transform');
      }
      if (originalStyles.transformOrigin) {
        node.style.transformOrigin = originalStyles.transformOrigin;
      } else {
        node.style.removeProperty('transform-origin');
      }
      if (originalStyles.display) {
        node.style.display = originalStyles.display;
      } else {
        node.style.removeProperty('display');
      }
      if (originalStyles.alignItems) {
        node.style.alignItems = originalStyles.alignItems;
      } else {
        node.style.removeProperty('align-items');
      }
      if (originalStyles.justifyContent) {
        node.style.justifyContent = originalStyles.justifyContent;
      } else {
        node.style.removeProperty('justify-content');
      }
    }
  }, [state]);

  // shortcuts
  useGlobalShortcuts(
    () => {
      try { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); 
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde manuelle:', error);
      }
    },
    exportPng
  );
  const editorValue = state.markdown;

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="border-b px-4 py-3 app-header mb-3">
        <h1 className="text-lg font-semibold">Sniper Post Prompt</h1>
      </header>
      {/* Layout mobile first responsive */}
      <div className="flex flex-col grow gap-4 p-2 lg:grid lg:grid-cols-[360px_1fr] lg:p-0">
        
        {/* Paramètres: en haut sur mobile, à gauche sur desktop */}
        <aside className="panel-params rounded-lg border p-2 lg:flex lg:flex-col lg:gap-4">
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
        </aside>

        {/* Contenu principal: stack vertical sur mobile, grid sur tablet+ */}
        <section className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_3fr] panel-card rounded-lg border p-2 md:p-3">
          
          {/* Éditeur */}
          <div className="h-[300px] md:h-[calc(100dvh-200px)] lg:h-[calc(100dvh-120px)] rounded-md border p-2 overflow-auto panel-editor">
            <SimpleEditor
              value={editorValue}
              onChange={(markdown) => setState((s) => ({ ...s, markdown }))}
            />
          </div>
          
          {/* Preview */}
          <div className="h-[300px] md:h-[calc(100dvh-200px)] lg:h-[calc(100dvh-120px)] rounded-md border p-2 overflow-hidden panel-preview">
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
          
        </section>
      </div>
    </main>
  );
}
