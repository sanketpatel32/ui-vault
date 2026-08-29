import { Footer1 } from "./footer-1";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Blocks", href: "#" },
      { label: "Registry", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Footer1
        logo={<span className="text-xl">🍉</span>}
        brandName="Watermelon UI"
        newsletterTitle="Stay in the loop"
        newsletterDescription="Get the newest blocks dropped in your inbox."
        linkGroups={linkGroups}
        copyright="© 2026 Watermelon UI. All rights reserved."
      />
    </div>
  );
}
