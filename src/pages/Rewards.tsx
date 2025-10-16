import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Trophy, Tag, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user points
const USER_POINTS = 450;

// Mock coupons data
const availableCoupons = [
  {
    id: 1,
    partner: "Green Leaf Restaurant",
    offer: "10% off your next meal",
    pointsRequired: 100,
    expiresIn: "30 days",
    category: "restaurant",
  },
  {
    id: 2,
    partner: "Sweet Dreams Bakery",
    offer: "Free dessert with any main course",
    pointsRequired: 150,
    expiresIn: "45 days",
    category: "bakery",
  },
  {
    id: 3,
    partner: "Fresh Market",
    offer: "₹200 off on grocery purchase above ₹1000",
    pointsRequired: 200,
    expiresIn: "60 days",
    category: "grocery",
  },
  {
    id: 4,
    partner: "Organic Farm Store",
    offer: "15% discount on all vegetables",
    pointsRequired: 120,
    expiresIn: "30 days",
    category: "grocery",
  },
  {
    id: 5,
    partner: "Pizza Palace",
    offer: "Buy 1 Get 1 Free on medium pizzas",
    pointsRequired: 250,
    expiresIn: "20 days",
    category: "restaurant",
  },
  {
    id: 6,
    partner: "Coffee Corner",
    offer: "Free coffee with any breakfast combo",
    pointsRequired: 80,
    expiresIn: "15 days",
    category: "cafe",
  },
];

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(USER_POINTS);
  const [redeemedCoupons, setRedeemedCoupons] = useState<number[]>([]);
  const [myCoupons, setMyCoupons] = useState<any[]>([]);

  const handleRedeem = (coupon: any) => {
    if (userPoints >= coupon.pointsRequired) {
      setUserPoints(userPoints - coupon.pointsRequired);
      setRedeemedCoupons([...redeemedCoupons, coupon.id]);
      const couponCode = `FS${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setMyCoupons([
        ...myCoupons,
        {
          ...coupon,
          code: couponCode,
          redeemedAt: new Date().toLocaleDateString(),
        },
      ]);
      toast.success(`Coupon redeemed! Your code: ${couponCode}`);
    } else {
      toast.error("Not enough points to redeem this offer!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-secondary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Rewards & Coupons</h1>
            <p className="text-muted-foreground text-lg">
              Redeem your points for exclusive offers from our partner restaurants
            </p>
          </div>

          {/* Points Card */}
          <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Reward Points</p>
                    <p className="text-4xl font-bold text-primary">{userPoints}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary fill-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Keep sharing food to earn more points!
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="available" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="available">Available Offers</TabsTrigger>
              <TabsTrigger value="mycoupons">My Coupons</TabsTrigger>
            </TabsList>

            {/* Available Offers */}
            <TabsContent value="available" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCoupons.map((coupon) => {
                  const isRedeemed = redeemedCoupons.includes(coupon.id);
                  const canRedeem = userPoints >= coupon.pointsRequired;

                  return (
                    <Card
                      key={coupon.id}
                      className={`border-2 transition-all hover:shadow-lg ${
                        isRedeemed ? "opacity-60" : ""
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{coupon.partner}</CardTitle>
                            <CardDescription className="mt-2">
                              {coupon.offer}
                            </CardDescription>
                          </div>
                          <Gift className="h-5 w-5 text-primary flex-shrink-0" />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-secondary" />
                            <span className="font-bold text-lg text-primary">
                              {coupon.pointsRequired} pts
                            </span>
                          </div>
                          <Badge variant="outline" className="rounded-full">
                            {coupon.category}
                          </Badge>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Valid for {coupon.expiresIn}
                        </div>

                        <Button
                          className="w-full rounded-full"
                          onClick={() => handleRedeem(coupon)}
                          disabled={!canRedeem || isRedeemed}
                          variant={canRedeem && !isRedeemed ? "default" : "outline"}
                        >
                          {isRedeemed ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Redeemed
                            </>
                          ) : canRedeem ? (
                            "Redeem Now"
                          ) : (
                            `Need ${coupon.pointsRequired - userPoints} more pts`
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* My Coupons */}
            <TabsContent value="mycoupons" className="space-y-6">
              {myCoupons.length === 0 ? (
                <Card className="border-2">
                  <CardContent className="py-12 text-center">
                    <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      You haven't redeemed any coupons yet. Browse available offers to get started!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {myCoupons.map((coupon, index) => (
                    <Card key={index} className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">{coupon.partner}</CardTitle>
                        <CardDescription>{coupon.offer}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-background p-4 rounded-lg border-2 border-dashed">
                          <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
                          <p className="text-2xl font-bold text-primary tracking-wider">
                            {coupon.code}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Redeemed on:</span>
                          <span className="font-medium">{coupon.redeemedAt}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Valid for {coupon.expiresIn}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Info Card */}
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="py-6">
              <h3 className="font-semibold mb-2">How to Earn More Points?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Share surplus food: +50 points per successful donation</li>
                <li>• Claim and pickup food: +20 points per order</li>
                <li>• Complete your first 10 donations: +100 bonus points</li>
                <li>• Refer a friend: +75 points when they make their first share</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
