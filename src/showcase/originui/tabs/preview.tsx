import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="p-6">
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">Overview</TabsTrigger>
            <TabsTrigger value="two">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="pt-3 text-sm">
            Overview tab content.
          </TabsContent>
          <TabsContent value="two" className="pt-3 text-sm">
            Settings tab content.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
