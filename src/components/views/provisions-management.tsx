
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Circle,
  Truck,
  PackageCheck,
  Clock,
  Send,
  Wrench,
  HeartPulse,
  Apple,
  Droplets,
  Package,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { provisionsData, provisionTypes } from "@/lib/provisions-data";

export function ProvisionsManagement() {
  const [provisions, setProvisions] = React.useState(provisionsData.inventory);
  const [filter, setFilter] = React.useState("All");
  const { toast } = useToast();

  const filteredProvisions =
    filter === "All"
      ? provisions
      : provisions.filter((p) => p.type === filter);

  const handleRequestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = formData.get("quantity");
    const category = formData.get("category");
    const purpose = formData.get("purpose");
    
    toast({
      title: "Request Submitted",
      description: `Requested ${quantity} of ${category} for: ${purpose}`,
    });
    event.currentTarget.reset();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Safe":
        return <Circle className="h-3 w-3 text-green-500 fill-green-500" />;
      case "Inspect":
        return <Circle className="h-3 w-3 text-yellow-500 fill-yellow-500" />;
      default:
        return <Circle className="h-3 w-3 text-gray-500" />;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "Food": return <Apple className="h-4 w-4 text-muted-foreground" />;
      case "Water": return <Droplets className="h-4 w-4 text-muted-foreground" />;
      case "Medical": return <HeartPulse className="h-4 w-4 text-muted-foreground" />;
      case "Parts": return <Wrench className="h-4 w-4 text-muted-foreground" />;
      default: return <Package className="h-4 w-4 text-muted-foreground" />;
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Provisions Management
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Capacity</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provisionsData.storageUsagePercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {provisionsData.storageUsed} / {provisionsData.storageCapacity} units used
            </p>
            <Progress value={provisionsData.storageUsagePercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Supply Delivery</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provisionsData.nextDelivery.date}</div>
            <p className="text-xs text-muted-foreground">
              ETA: {provisionsData.nextDelivery.eta} - Status: {provisionsData.nextDelivery.status}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Delivery</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provisionsData.lastDelivery.date}</div>
            <p className="text-xs text-muted-foreground">
              Status: {provisionsData.lastDelivery.status}
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Inventory</CardTitle>
                    <CardDescription>Current stock of all provisions.</CardDescription>
                </div>
                <div className="w-48">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                        <SelectValue placeholder="Filter by type..." />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        {provisionTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProvisions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            {item.type}
                          </div>
                        </TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={item.status === 'Safe' ? 'success' : 'outline'} className="flex items-center gap-2 w-24 justify-center">
                            {getStatusIcon(item.status)}
                            {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Request Provisions</CardTitle>
                    <CardDescription>Request items from storage for your tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleRequestSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" name="quantity" type="number" defaultValue="1" min="1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" defaultValue="Parts">
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {provisionTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose / Item Name</Label>
                            <Input id="purpose" name="purpose" placeholder="e.g., 'Repairing air filter' or 'Snacks'" />
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Request
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction Log</CardTitle>
                </CardHeader>
                <CardContent>
                <ScrollArea className="h-48">
                    <div className="space-y-3 pr-4">
                    {provisionsData.log.map((entry) => (
                        <div key={entry.id} className="text-sm">
                        <p className="font-medium">{entry.event}</p>
                        <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
