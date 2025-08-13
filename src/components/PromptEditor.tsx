"use client";

import { useEffect } from "react";
import { useEditor, Milkdown, MilkdownProvider } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import { gfm } from "@milkdown/preset-gfm";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { clipboard } from "@milkdown/plugin-clipboard";
import { history } from "@milkdown/plugin-history";
import { Editor, defaultValueCtx, editorViewOptionsCtx, editorViewCtx, rootCtx } from "@milkdown/core";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Undo2 } from "lucide-react";

type Props = {
	value: string;
	onChange: (markdown: string) => void;
};

// Basic toolbar for undo/redo (Milkdown exposes commands via keyboard too)
export function PromptEditor({ value, onChange }: Props) {
    const editor = useEditor((root) => {
		return Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, root);
				ctx.set(defaultValueCtx, value);
				ctx.update(editorViewOptionsCtx, (prev) => ({
					...prev,
					attributes: { class: "prose prose-zinc dark:prose-invert max-w-none focus:outline-none" },
				}));
			})
            .config(nord)
            .use(gfm)
            .use(clipboard)
            .use(history)
            .use(listener);
	});

    // Sync markdown changes using listener plugin
    useEffect(() => {
        if (!editor) return;
        editor.get()?.action((ctx) => {
            const l = ctx.get(listenerCtx);
            l.markdownUpdated((_, markdown) => onChange(markdown));
        });
    }, [editor, onChange]);

    // Update editor when external value changes (e.g., reset)
	useEffect(() => {
		if (!editor) return;
		editor.get()?.action((ctx) => {
			const view = ctx.get(editorViewCtx);
			const { state } = view;
			const tr = state.tr;
			tr.delete(0, state.doc.content.size);
			tr.insertText(value, 0);
			view.dispatch(tr);
		});
	}, [value, editor]);

	return (
		<div className="flex h-full flex-col gap-2">
			<div className="flex items-center gap-1">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button type="button" size="icon" variant="ghost" aria-label="Annuler (Ctrl+Z)">
								<Undo2 className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Annuler (Ctrl+Z)</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className="min-h-[320px] grow rounded-lg border bg-background/60 p-3">
				<MilkdownProvider>
					<Milkdown />
				</MilkdownProvider>
			</div>
		</div>
	);
}


