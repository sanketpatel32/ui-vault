import { File, Folder, Tree, type TreeViewElement } from "./file-tree";

// Demo from the official magicui docs example
// (https://magicui.design/docs/components/file-tree).
const ELEMENTS: TreeViewElement[] = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          { id: "3", isSelectable: true, name: "layout.tsx" },
          { id: "4", isSelectable: true, name: "page.tsx" },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          { id: "6", isSelectable: true, name: "header.tsx" },
          { id: "7", isSelectable: true, name: "footer.tsx" },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [{ id: "9", isSelectable: true, name: "utils.ts" }],
      },
    ],
  },
];

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative flex h-[300px] w-full max-w-xs flex-col overflow-hidden rounded-lg border border-border bg-panel">
        <Tree
          className="overflow-hidden rounded-md p-2"
          initialSelectedId="7"
          initialExpandedItems={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          elements={ELEMENTS}
        >
          <Folder element="src" value="1">
            <Folder value="2" element="app">
              <File value="3">
                <p>layout.tsx</p>
              </File>
              <File value="4">
                <p>page.tsx</p>
              </File>
            </Folder>
            <Folder value="5" element="components">
              <File value="6">
                <p>header.tsx</p>
              </File>
              <File value="7">
                <p>footer.tsx</p>
              </File>
            </Folder>
            <Folder value="8" element="lib">
              <File value="9">
                <p>utils.ts</p>
              </File>
            </Folder>
          </Folder>
        </Tree>
      </div>
    </div>
  );
}
