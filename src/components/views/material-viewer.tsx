import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const materials = [
  { name: "Regolith Concrete", type: "Structure", description: "Martian soil mixed with binders to create a strong, radiation-shielding concrete." },
  { name: "ETFE Polymer", type: "Dome", description: "A highly transparent and durable polymer for inflatable structures and windows." },
  { name: "Basalt Fiber", type: "Reinforcement", description: "High-tensile strength fibers produced from melted Martian rock." },
  { name: "Silica Aerogel", type: "Insulation", description: "Extremely low-density solid used for thermal insulation." },
  { name: "PVDF Piezoelectric Film", type: "Energy", description: "A flexible polymer film that generates electricity from pressure variations during dust storms." },
  { name: "Gallium Arsenide Solar Cells", type: "Energy", description: "Highly efficient solar cells resistant to radiation and temperature swings." },
]

export function MaterialViewer() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Material Viewer
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Construction Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.name} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{material.name}</h3>
                    <Badge variant="secondary">{material.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
