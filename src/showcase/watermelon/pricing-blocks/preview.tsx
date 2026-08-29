import { Pricing1 } from "./pricing-1";

const plans = [
  {
    id: "starter",
    title: "Starter",
    description: "For personal projects",
    price: "$0",
    features: [{ text: "3 components" }, { text: "Community support" }],
    buttonText: "Start free",
  },
  {
    id: "pro",
    title: "Pro",
    description: "For shipping products",
    price: "$29",
    features: [
      { text: "Unlimited components" },
      { text: "Priority support" },
      { text: "Figma sources" },
    ],
    buttonText: "Go Pro",
    isPopular: true,
  },
  {
    id: "team",
    title: "Team",
    description: "For teams of any size",
    price: "$79",
    features: [{ text: "Everything in Pro" }, { text: "SSO and roles" }, { text: "Audit log" }],
    buttonText: "Contact sales",
  },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Pricing1 plans={plans} />
    </div>
  );
}
