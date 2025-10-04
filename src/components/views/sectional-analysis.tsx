import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"

const areaData = [
    { component: "Level 1 Floor Area", area: "150.0 m²" },
    { component: "Level 2 Floor Area", area: "120.0 m²" },
    { component: "Greenhouse #1", area: "45.5 m²" },
    { component: "Greenhouse #2", area: "45.5 m²" },
    { component: "Total Habitable Area", area: "361.0 m²" },
]

export function SectionalAnalysis() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Sectional Analysis
        </h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline">Toggle Cross-Section</Button>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Area Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead className="text-right">Area</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {areaData.map((item) => (
                        <TableRow key={item.component}>
                            <TableCell className="font-medium">{item.component}</TableCell>
                            <TableCell className="text-right font-mono">{item.area}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      <div className="p-4 border-2 border-dashed rounded-lg flex items-center justify-center min-h-96">
          <p className="text-muted-foreground">3D cross-section view coming soon</p>
      </div>
    </div>
  )
}
