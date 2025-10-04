
export const provisionTypes = ["Food", "Water", "Medical", "Parts", "Research"];

export const provisionsData = {
  storageCapacity: 20000,
  storageUsed: 15850,
  storageUsagePercentage: Math.round((15850 / 20000) * 100),
  nextDelivery: {
    date: "Sol 351",
    status: "In Transit",
    eta: "6 Sols",
  },
  lastDelivery: {
    date: "Sol 320",
    status: "Delivered",
  },
  inventory: [
    { id: "fd001", name: "Nutrient Paste", type: "Food", quantity: 500, unit: "kg", status: "Safe" },
    { id: "fd002", name: "Dehydrated Vegetables", type: "Food", quantity: 200, unit: "kg", status: "Safe" },
    { id: "wt001", name: "Potable Water", type: "Water", quantity: 10000, unit: "L", status: "Safe" },
    { id: "md001", name: "First-Aid Kits", type: "Medical", quantity: 50, unit: "units", status: "Safe" },
    { id: "md002", name: "Painkillers", type: "Medical", quantity: 2000, unit: "pills", status: "Inspect" },
    { id: "pt001", name: "CO2 Scrubber Filters", type: "Parts", quantity: 150, unit: "units", status: "Safe" },
    { id: "pt002", name: "Solar Panel Wipes", type: "Parts", quantity: 500, unit: "units", status: "Safe" },
    { id: "rs001", name: "Soil Sample Bags", type: "Research", quantity: 3000, unit: "bags", status: "Safe" },
    { id: "fd003", name: "Emergency Rations", type: "Food", quantity: 100, unit: "kg", status: "Safe" },
    { id: "wt002", name: "Sterilization Tablets", type: "Water", quantity: 5000, unit: "tabs", status: "Safe" },
  ],
  log: [
    { id: 1, event: "Delivery from ESA-C3 arrived.", timestamp: "Sol 320, 14:00" },
    { id: 2, event: "Request #511: 2x CO2 Filters (Approved)", timestamp: "Sol 344, 09:00" },
    { id: 3, event: "Automated consumption report: 5kg Nutrient Paste.", timestamp: "Sol 344, 12:00" },
    { id: 4, event: "Request #512: 1x First-Aid Kit (Pending)", timestamp: "Sol 344, 18:00" },
    { id: 5, event: "Low stock alert: Painkillers (2000 remaining).", timestamp: "Sol 345, 08:00" },
  ],
};
