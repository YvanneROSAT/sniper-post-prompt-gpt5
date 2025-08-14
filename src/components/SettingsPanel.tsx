"use client";

import { } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CARD_STYLES, FONT_OPTIONS, GRADIENTS, AspectRatioOption } from "@/lib/presets";

type Props = {
	font: string;
	setFont: (v: string) => void;
	gradientId: string;
	setGradientId: (id: string) => void;
	cardStyleId: string;
	setCardStyleId: (id: string) => void;
	aspect: AspectRatioOption;
	setAspect: (a: AspectRatioOption) => void;
	transparent: boolean;
	setTransparent: (v: boolean) => void;
	fontSize: "sm" | "md" | "lg";
	setFontSize: (v: "sm" | "md" | "lg") => void;
	onExport: () => void;
};

export function SettingsPanel(props: Props) {
    const { font, setFont, gradientId, setGradientId, cardStyleId, setCardStyleId, aspect, setAspect, transparent, setTransparent, fontSize, setFontSize, onExport } = props;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
            <div>
				<Label>Police</Label>
				<Select value={font} onValueChange={setFont}>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Police" />
					</SelectTrigger>
					<SelectContent>
						{FONT_OPTIONS.map((f) => (
							<SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

            <div>
				<Label>Dégradé de fond</Label>
				<Select value={gradientId} onValueChange={setGradientId}>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Dégradé" />
					</SelectTrigger>
					<SelectContent>
						{GRADIENTS.map((g) => (
							<SelectItem key={g.id} value={g.id}>{g.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

            <div>
				<Label>Style de carte</Label>
				<Select value={cardStyleId} onValueChange={setCardStyleId}>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Style" />
					</SelectTrigger>
					<SelectContent>
						{CARD_STYLES.map((c) => (
							<SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

            <div>
                <Label>Taille de police</Label>
                	<Select value={fontSize} onValueChange={(v) => setFontSize(v as "sm" | "md" | "lg")}>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Taille" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="sm">Petite</SelectItem>
						<SelectItem value="md">Moyenne</SelectItem>
						<SelectItem value="lg">Grande</SelectItem>
					</SelectContent>
				</Select>
			</div>

            <div className="flex items-center gap-2">
				<Label>Fond transparent</Label>
				<Switch checked={transparent} onCheckedChange={setTransparent} />
			</div>

            <div>
				<Label>Format d&apos;export</Label>
				<div className="mt-2 grid grid-cols-2 gap-2">
					<Button variant={aspect === "16:9" ? "default" : "outline"} onClick={() => setAspect("16:9")}>16:9</Button>
					<Button variant={aspect === "9:16" ? "default" : "outline"} onClick={() => setAspect("9:16")}>9:16</Button>
				</div>
			</div>

            <div className="col-span-1 sm:col-span-2">
                <Button className="w-full" onClick={onExport}>Exporter en PNG</Button>
            </div>
		</div>
	);
}


