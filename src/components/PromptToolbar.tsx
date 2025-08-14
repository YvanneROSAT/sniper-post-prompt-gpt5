import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

type Props = {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onH: (level: 1 | 2 | 3) => void;
  onBullet: () => void;
  onOrdered: () => void;
};

export function PromptToolbar({ onBold, onItalic, onUnderline, onH, onBullet, onOrdered }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle onClick={onBold} aria-label="Gras"><Bold className="h-4 w-4" /></Toggle>
      <Toggle onClick={onItalic} aria-label="Italique"><Italic className="h-4 w-4" /></Toggle>
      <Toggle onClick={onUnderline} aria-label="Souligné"><Underline className="h-4 w-4" /></Toggle>
      <ToggleGroup type="single" aria-label="Titres">
        <ToggleGroupItem value="h1" onClick={() => onH(1)}>H1</ToggleGroupItem>
        <ToggleGroupItem value="h2" onClick={() => onH(2)}>H2</ToggleGroupItem>
        <ToggleGroupItem value="h3" onClick={() => onH(3)}>H3</ToggleGroupItem>
      </ToggleGroup>
      <Button variant="outline" size="sm" onClick={onBullet}><List className="h-4 w-4" /></Button>
      <Button variant="outline" size="sm" onClick={onOrdered}><ListOrdered className="h-4 w-4" /></Button>
    </div>
  );
}


