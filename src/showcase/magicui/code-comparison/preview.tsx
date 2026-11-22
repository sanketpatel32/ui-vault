import { CodeComparison } from "./code-comparison";

const BEFORE = `function greet(name) {
  console.log("hi " + name);
}`;

const AFTER = `function greet(name: string) {
  console.log(\`hi \${name}\`);
}`;

export default function Preview() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <CodeComparison
        beforeCode={BEFORE}
        afterCode={AFTER}
        language="typescript"
        filename="greet.ts"
        lightTheme="github-light"
        darkTheme="github-dark"
      />
    </div>
  );
}
