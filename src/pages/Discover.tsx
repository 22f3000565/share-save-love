import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Package, Search, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data
const mockFoodItems = [
  {
    id: 1,
    foodType: "Cooked Meals",
    quantity: "15 servings",
    location: "Green Leaf Restaurant, 123 Main St",
    pickupTime: "2:00 PM - 5:00 PM",
    description: "Fresh vegetarian meals, includes rice and curry",
    donor: "Green Leaf Restaurant",
    distance: "0.5 km away",
    status: "available",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    id: 2,
    foodType: "Bakery Items",
    quantity: "20 pastries",
    location: "Sweet Dreams Bakery, 45 Oak Ave",
    pickupTime: "6:00 PM - 8:00 PM",
    description: "Assorted fresh pastries and bread from today",
    donor: "Sweet Dreams Bakery",
    distance: "1.2 km away",
    status: "available",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  },
  {
    id: 3,
    foodType: "Fresh Vegetables",
    quantity: "5 kg mixed vegetables",
    location: "Community Garden, Park Road",
    pickupTime: "3:00 PM - 6:00 PM",
    description: "Organic seasonal vegetables",
    donor: "Community Garden",
    distance: "2.0 km away",
    status: "available",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400",
  },
  {
    id: 4,
    foodType: "Packaged Foods",
    quantity: "30 meal kits",
    location: "Food Hub Center, Downtown",
    pickupTime: "4:00 PM - 7:00 PM",
    description: "Pre-packaged meal kits with instructions",
    donor: "Food Hub NGO",
    distance: "0.8 km away",
    status: "available",
    image: null,
  },
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [claimedItems, setClaimedItems] = useState<number[]>([]);

  const handleClaim = (id: number) => {
    setClaimedItems([...claimedItems, id]);
    toast.success("Food claimed successfully! Check My Orders for details.");
  };

  const filteredItems = mockFoodItems.filter(
    (item) =>
      item.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Discover Available Food</h1>
            <p className="text-muted-foreground text-lg">
              Find and claim surplus food near you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by food type, location, or donor..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Food Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const isClaimed = claimedItems.includes(item.id);
              return (
                <Card
                  key={item.id}
                  className={`border-2 transition-all hover:shadow-lg ${
                    isClaimed ? "opacity-60" : ""
                  }`}
                >
                  {item.image && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.foodType}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{item.foodType}</h3>
                        <p className="text-sm text-muted-foreground">{item.donor}</p>
                      </div>
                      <Badge
                        variant={isClaimed ? "secondary" : "default"}
                        className="rounded-full"
                      >
                        {isClaimed ? "Reserved" : "Available"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="font-medium">{item.quantity}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{item.location}</p>
                        <p className="text-muted-foreground text-xs">{item.distance}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{item.pickupTime}</span>
                    </div>

                    {item.description && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full rounded-full bg-gradient-to-r from-primary to-primary/90"
                      onClick={() => handleClaim(item.id)}
                      disabled={isClaimed}
                    >
                      {isClaimed ? "Reserved" : "Claim Food"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <Card className="border-2">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No food items found matching your search. Try different keywords!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Info Banner */}
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Can't find what you need?</h3>
                  <p className="text-sm text-muted-foreground">
                    Check back regularly as new food items are posted throughout the day
                  </p>
                </div>
                <Button variant="outline" className="rounded-full">
                  Set Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discover;
