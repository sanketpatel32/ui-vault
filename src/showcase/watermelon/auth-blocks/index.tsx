import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AuthBlock() {
  return (
    <div className="w-72 rounded-2xl border border-border bg-panel p-5 shadow-md space-y-3">
      <div className="text-center">
        <h3 className="text-sm font-bold text-fg">Welcome back</h3>
        <p className="text-[11px] text-muted-fg mt-0.5">Enter your email to sign in</p>
      </div>
      <Input placeholder="name@example.com" className="text-xs" />
      <Button size="sm" className="w-full">
        Sign In with Email
      </Button>
    </div>
  );
}

export default AuthBlock;
