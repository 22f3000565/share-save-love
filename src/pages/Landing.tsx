import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Leaf, Award, ArrowRight, CheckCircle, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-food-sharing.jpg";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { IconInput } from "@/components/ui/icon-input";
import { UserCreate } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

const Landing = () => {
  const { isAuthenticated, login, register } = useAuth();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    user_type: 'GENERAL' as const,
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData as UserCreate);
      }
      navigate('/discover');
      toast({
        title: isLoginMode ? "Logged in successfully" : "Registered successfully",
        description: "Welcome to FoodSaver!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Share food.{" "}
                <span className="text-primary">Reduce waste.</span>{" "}
                <span className="text-secondary">Spread love.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join our community of food heroes. Connect with nearby restaurants, neighbors, 
                and NGOs to save perfectly good food from going to waste.
              </p>
              {!isAuthenticated && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLoginMode && (
                    <>
                      <Input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </>
                  )}
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    icon={<Lock className="h-4 w-4" />}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all text-lg"
                  >
                    {isLoginMode ? "Login" : "Register"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="w-full"
                  >
                    {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
                  </Button>
                </form>
              )}
              {isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/discover">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all text-lg px-8"
                    >
                      Discover Food <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/post-food">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full text-lg px-8"
                    >
                      Share Food
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Community food sharing"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2 animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold">2.5K+</div>
              <div className="text-sm md:text-base opacity-90">Meals Saved</div>
            </div>
            <div className="text-center space-y-2 animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold">500+</div>
              <div className="text-sm md:text-base opacity-90">Active Users</div>
            </div>
            <div className="text-center space-y-2 animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold">150+</div>
              <div className="text-sm md:text-base opacity-90">Restaurants</div>
            </div>
            <div className="text-center space-y-2 animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold">30+</div>
              <div className="text-sm md:text-base opacity-90">NGO Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How FoodSaver Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to make a difference in your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-primary">STEP 1</div>
                  <h3 className="text-xl font-bold">Post Excess Food</h3>
                  <p className="text-muted-foreground">
                    Restaurants or individuals share available surplus food with details about type, quantity, and pickup location.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-secondary">STEP 2</div>
                  <h3 className="text-xl font-bold">Connect with Receivers</h3>
                  <p className="text-muted-foreground">
                    Users and NGOs discover nearby available food and claim items they need quickly and easily.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-accent">STEP 3</div>
                  <h3 className="text-xl font-bold">Track & Earn Rewards</h3>
                  <p className="text-muted-foreground">
                    Complete pickups, track your impact, and earn reward points for every meal you help save.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Join FoodSaver?
              </h2>
              <p className="text-muted-foreground text-lg">
                Be part of a movement that creates real impact in your community while reducing food waste.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Fight Hunger</div>
                    <div className="text-muted-foreground">Help those in need access nutritious meals</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Reduce Waste</div>
                    <div className="text-muted-foreground">Save perfectly good food from landfills</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Build Community</div>
                    <div className="text-muted-foreground">Connect with caring neighbors and local businesses</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Earn Recognition</div>
                    <div className="text-muted-foreground">Get rewarded for your positive impact</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-6 text-center space-y-2">
                  <Leaf className="h-12 w-12 mx-auto text-primary" />
                  <div className="text-2xl font-bold">Sustainable</div>
                  <p className="text-sm text-muted-foreground">Eco-friendly food sharing</p>
                </CardContent>
              </Card>
              <Card className="border-2 bg-gradient-to-br from-secondary/5 to-secondary/10">
                <CardContent className="pt-6 text-center space-y-2">
                  <Users className="h-12 w-12 mx-auto text-secondary" />
                  <div className="text-2xl font-bold">Community</div>
                  <p className="text-sm text-muted-foreground">Connect locally</p>
                </CardContent>
              </Card>
              <Card className="border-2 bg-gradient-to-br from-accent/5 to-accent/10">
                <CardContent className="pt-6 text-center space-y-2">
                  <Award className="h-12 w-12 mx-auto text-accent" />
                  <div className="text-2xl font-bold">Rewards</div>
                  <p className="text-sm text-muted-foreground">Earn points</p>
                </CardContent>
              </Card>
              <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="pt-6 text-center space-y-2">
                  <Heart className="h-12 w-12 mx-auto text-primary" />
                  <div className="text-2xl font-bold">Impact</div>
                  <p className="text-sm text-muted-foreground">Make a difference</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-secondary">
        <div className="container mx-auto px-4 text-center text-primary-foreground space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of food heroes in your community. Start sharing or claiming food today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/profile">
              <Button 
                size="lg" 
                className="rounded-full bg-background text-primary hover:bg-background/90 text-lg px-8"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/discover">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8"
              >
                Browse Available Food
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
