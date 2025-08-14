"use client";

import { PromptToolbar } from "./PromptToolbar";

type Props = {
    value: string;
    onChange: (markdown: string) => void;
};

export function SimpleEditor({ value, onChange }: Props) {
    const applyWrap = (syntaxBefore: string, syntaxAfter: string = syntaxBefore) => {
        const ta = document.getElementById("simple-editor-ta") as HTMLTextAreaElement | null;
        if (!ta) return;
        const start = ta.selectionStart ?? 0;
        const end = ta.selectionEnd ?? 0;
        const selected = value.slice(start, end);
        const next = value.slice(0, start) + syntaxBefore + selected + syntaxAfter + value.slice(end);
        onChange(next);
        requestAnimationFrame(() => {
            const pos = start + syntaxBefore.length + selected.length + syntaxAfter.length;
            ta.focus();
            ta.setSelectionRange(pos, pos);
        });
    };

    const onBold = () => applyWrap("**");
    const onItalic = () => applyWrap("_");
    const onUnderline = () => applyWrap("<u>", "</u>");
    const onH = (level: 1 | 2 | 3) => {
        const ta = document.getElementById("simple-editor-ta") as HTMLTextAreaElement | null;
        if (!ta) return;
        const start = ta.selectionStart ?? 0;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const prefix = "#".repeat(level) + " ";
        const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
        onChange(next);
        requestAnimationFrame(() => {
            const pos = lineStart + prefix.length;
            ta.focus();
            ta.setSelectionRange(pos, pos);
        });
    };
    const onBullet = () => {
        const ta = document.getElementById("simple-editor-ta") as HTMLTextAreaElement | null;
        if (!ta) return;
        const start = ta.selectionStart ?? 0;
        const end = ta.selectionEnd ?? 0;
        const before = value.slice(0, start);
        const selected = value.slice(start, end);
        const after = value.slice(end);
        const lines = (selected || value.slice(value.lastIndexOf("\n", start - 1) + 1, value.indexOf("\n", start) === -1 ? value.length : value.indexOf("\n", start))).split("\n");
        const bulletLines = lines.map((l) => (l.startsWith("- ") ? l : `- ${l}`)).join("\n");
        const next = selected ? before + bulletLines + after : value.replace(lines.join("\n"), bulletLines);
        onChange(next);
        requestAnimationFrame(() => {
            const pos = (before + bulletLines).length;
            ta.focus();
            ta.setSelectionRange(pos, pos);
        });
    };
    const onOrdered = () => {
        const ta = document.getElementById("simple-editor-ta") as HTMLTextAreaElement | null;
        if (!ta) return;
        const start = ta.selectionStart ?? 0;
        const end = ta.selectionEnd ?? 0;
        const before = value.slice(0, start);
        const selected = value.slice(start, end);
        const after = value.slice(end);
        const lines = (selected || value.slice(value.lastIndexOf("\n", start - 1) + 1, value.indexOf("\n", start) === -1 ? value.length : value.indexOf("\n", start))).split("\n");
        const orderedLines = lines.map((l, i) => (l.match(/^\d+\.\s/) ? l : `${i + 1}. ${l}`)).join("\n");
        const next = selected ? before + orderedLines + after : value.replace(lines.join("\n"), orderedLines);
        onChange(next);
        requestAnimationFrame(() => {
            const pos = (before + orderedLines).length;
            ta.focus();
            ta.setSelectionRange(pos, pos);
        });
    };

    return (
        <div className="flex h-full flex-col gap-2">
            <div className="flex items-center gap-2">
                <PromptToolbar onBold={onBold} onItalic={onItalic} onUnderline={onUnderline} onH={onH} onBullet={onBullet} onOrdered={onOrdered} />
            </div>
            <textarea
                id="simple-editor-ta"
                className="w-full h-full resize-none bg-transparent outline-none border-0 p-0 prose prose-zinc dark:prose-invert"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Saisissez votre prompt..."
            />
        </div>
    );
}


