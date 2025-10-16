import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Building2, Heart, Award } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ProfileType = "user" | "restaurant" | "ngo" | null;

const Profile = () => {
  const [selectedType, setSelectedType] = useState<ProfileType>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    preferences: "",
    organization: "",
    verification: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile created successfully!");
    navigate("/discover");
  };

  if (!selectedType) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Choose Your Profile Type</h1>
              <p className="text-muted-foreground text-lg">
                Select the option that best describes you to get started
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer border-2 hover:border-primary transition-all hover:shadow-lg group"
                onClick={() => setSelectedType("user")}
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">General User</CardTitle>
                  <CardDescription className="text-center">
                    Claim available food and help reduce waste in your community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Find nearby food</li>
                    <li>• Track your claims</li>
                    <li>• Earn reward points</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer border-2 hover:border-secondary transition-all hover:shadow-lg group"
                onClick={() => setSelectedType("restaurant")}
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Building2 className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-center">Restaurant</CardTitle>
                  <CardDescription className="text-center">
                    Share surplus food and make a positive impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Post excess food</li>
                    <li>• Manage pickups</li>
                    <li>• Build reputation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer border-2 hover:border-accent transition-all hover:shadow-lg group"
                onClick={() => setSelectedType("ngo")}
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-center">NGO</CardTitle>
                  <CardDescription className="text-center">
                    Claim larger donations to serve communities in need
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Access bulk donations</li>
                    <li>• Coordinate pickups</li>
                    <li>• Track impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedType(null)}
                  className="rounded-full"
                >
                  ← Back
                </Button>
                <div className="flex-1 text-center">
                  <CardTitle className="text-2xl">
                    {selectedType === "user" && "General User Profile"}
                    {selectedType === "restaurant" && "Restaurant Profile"}
                    {selectedType === "ngo" && "NGO Profile"}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Complete your profile to get started
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {selectedType === "user" ? "Full Name" : "Organization Name"} *
                  </Label>
                  <Input
                    id="name"
                    placeholder={
                      selectedType === "user" ? "John Doe" : "Enter your organization name"
                    }
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Enter your address or area"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information *</Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Phone number or email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>

                {selectedType === "user" && (
                  <div className="space-y-2">
                    <Label htmlFor="preferences">Dietary Preferences (Optional)</Label>
                    <Textarea
                      id="preferences"
                      placeholder="e.g., Vegetarian, Vegan, No nuts, etc."
                      value={formData.preferences}
                      onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                    />
                  </div>
                )}

                {selectedType === "restaurant" && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">Food Type Commonly Shared</Label>
                    <Textarea
                      id="organization"
                      placeholder="e.g., Cooked meals, Bakery items, Fresh produce"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                )}

                {selectedType === "ngo" && (
                  <div className="space-y-2">
                    <Label htmlFor="verification">Verification ID / Registration Number</Label>
                    <Input
                      id="verification"
                      placeholder="Enter your organization ID"
                      value={formData.verification}
                      onChange={(e) => setFormData({ ...formData, verification: e.target.value })}
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={() => setSelectedType(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-full bg-gradient-to-r from-primary to-primary/90"
                  >
                    Create Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6 flex items-center justify-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Start Earning Rewards</div>
                  <div className="text-sm text-muted-foreground">
                    Get points for every meal you share or claim
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
