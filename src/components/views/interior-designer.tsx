import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InteriorDesigner() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 h-full flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Interior Designer
        </h2>
        <Button>Apply to 3D Model</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6 flex-1">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Habitat Level 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Drag & drop area coming soon</p>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Modules</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 text-center cursor-grab active:cursor-grabbing">Living Quarters</div>
                    <div className="border rounded-md p-4 text-center cursor-grab active:cursor-grabbing">Lab</div>
                    <div className="border rounded-md p-4 text-center cursor-grab active:cursor-grabbing">Greenhouse</div>
                    <div className="border rounded-md p-4 text-center cursor-grab active:cursor-grabbing">Storage</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Calculations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>Total Area: <span className="font-mono">0 m²</span></p>
                    <p>Total Volume: <span className="font-mono">0 m³</span></p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
