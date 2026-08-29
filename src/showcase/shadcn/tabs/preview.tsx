import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export default function Preview() {
  return (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="mt-2 text-xs text-muted-fg leading-relaxed">
          Manage your account preferences, billing, and profile details.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="mt-2 text-xs text-muted-fg leading-relaxed">
          Change your security credentials and multi-factor authentication.
        </p>
      </TabsContent>
    </Tabs>
  );
}
