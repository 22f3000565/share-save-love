import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Package, Award, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data
const mockOrders = [
  {
    id: 1,
    foodType: "Cooked Meals",
    quantity: "15 servings",
    location: "Green Leaf Restaurant, 123 Main St",
    pickupTime: "2:00 PM - 5:00 PM",
    donor: "Green Leaf Restaurant",
    status: "pending",
    claimedAt: "2 hours ago",
    points: 15,
  },
  {
    id: 2,
    foodType: "Bakery Items",
    quantity: "20 pastries",
    location: "Sweet Dreams Bakery, 45 Oak Ave",
    pickupTime: "6:00 PM - 8:00 PM",
    donor: "Sweet Dreams Bakery",
    status: "completed",
    claimedAt: "1 day ago",
    completedAt: "Yesterday",
    points: 20,
  },
  {
    id: 3,
    foodType: "Fresh Vegetables",
    quantity: "5 kg mixed vegetables",
    location: "Community Garden, Park Road",
    pickupTime: "3:00 PM - 6:00 PM",
    donor: "Community Garden",
    status: "completed",
    claimedAt: "3 days ago",
    completedAt: "3 days ago",
    points: 10,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleComplete = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: "completed", completedAt: "Just now" }
          : order
      )
    );
    toast.success("Order marked as completed! Points added to your account.");
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const totalPoints = completedOrders.reduce((sum, order) => sum + order.points, 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">My Orders</h1>
            <p className="text-muted-foreground text-lg">
              Track your food claims and impact
            </p>
          </div>

          {/* Rewards Card */}
          <Card className="border-2 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{totalPoints} Points</h3>
                    <p className="text-sm text-muted-foreground">
                      You've saved {completedOrders.length} meals!
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full">
                  View Rewards
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Orders Tabs */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">
                Active Orders ({pendingOrders.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedOrders.length})
              </TabsTrigger>
            </TabsList>

            {/* Pending Orders */}
            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingOrders.length === 0 ? (
                <Card className="border-2">
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      No active orders. Browse available food to get started!
                    </p>
                    <Button className="rounded-full" asChild>
                      <a href="/discover">Discover Food</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map((order) => (
                  <Card key={order.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {order.foodType}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            From {order.donor} • Claimed {order.claimedAt}
                          </p>
                        </div>
                        <Badge variant="default" className="rounded-full">
                          Pending Pickup
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4 text-primary" />
                        <span className="font-medium">{order.quantity}</span>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{order.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{order.pickupTime}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <Award className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">
                          Earn {order.points} points upon completion
                        </span>
                      </div>

                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-primary to-primary/90"
                        onClick={() => handleComplete(order.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Completed Orders */}
            <TabsContent value="completed" className="space-y-4 mt-6">
              {completedOrders.length === 0 ? (
                <Card className="border-2">
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No completed orders yet. Claim some food to get started!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                completedOrders.map((order) => (
                  <Card key={order.id} className="border-2 bg-muted/30">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {order.foodType}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            From {order.donor} • Completed {order.completedAt}
                          </p>
                        </div>
                        <Badge variant="secondary" className="rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{order.quantity}</span>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{order.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm pt-2 border-t">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">
                          +{order.points} points earned
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Impact Banner */}
          {completedOrders.length > 0 && (
            <Card className="border-2 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="py-6 text-center">
                <h3 className="font-semibold mb-2">Your Impact</h3>
                <p className="text-sm text-muted-foreground">
                  You've helped save approximately{" "}
                  <span className="font-bold text-primary">
                    {completedOrders.reduce((sum, order) => {
                      const servings = parseInt(order.quantity) || 1;
                      return sum + servings;
                    }, 0)}{" "}
                    servings
                  </span>{" "}
                  of food from going to waste. Keep up the amazing work!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
