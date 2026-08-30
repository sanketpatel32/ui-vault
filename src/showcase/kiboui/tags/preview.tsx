import { CheckIcon } from "lucide-react";
import { useState } from "react";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/tags).

const tags = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "php", label: "PHP" },
  { id: "go", label: "Go" },
];

export default function Preview() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }

    setSelected((prev) => prev.filter((v) => v !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }

    setSelected((prev) => [...prev, value]);
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Tags className="max-w-[300px]">
          <TagsTrigger>
            {selected.map((tag) => (
              <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
                {tags.find((t) => t.id === tag)?.label}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput placeholder="Search tag..." />
            <TagsList>
              <TagsEmpty />
              <TagsGroup>
                {tags.map((tag) => (
                  <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                    {tag.label}
                    {selected.includes(tag.id) && (
                      <CheckIcon className="text-muted-foreground" size={14} />
                    )}
                  </TagsItem>
                ))}
              </TagsGroup>
            </TagsList>
          </TagsContent>
        </Tags>
        <p className="text-muted-fg text-xs">
          Selected tags:{" "}
          <span className="font-medium text-fg">
            {selected.map((s) => tags.find((t) => t.id === s)?.label).join(", ") || "none"}
          </span>
        </p>
      </div>
    </div>
  );
}
