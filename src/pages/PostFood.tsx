import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Package, Upload, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PostFood = () => {
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
    pickupTime: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Food posted successfully! Others can now claim it.");
    navigate("/discover");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Share Surplus Food</h1>
            <p className="text-muted-foreground text-lg">
              Help reduce waste by sharing your extra food with those who need it
            </p>
          </div>

          {/* Main Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Food Details</CardTitle>
              <CardDescription>
                Provide information about the food you want to share
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food Type */}
                <div className="space-y-2">
                  <Label htmlFor="foodType">Food Type *</Label>
                  <Select
                    value={formData.foodType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, foodType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cooked">Cooked Meals</SelectItem>
                      <SelectItem value="bakery">Bakery Items</SelectItem>
                      <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                      <SelectItem value="fruits">Fresh Fruits</SelectItem>
                      <SelectItem value="packaged">Packaged Foods</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity / Servings *</Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="quantity"
                      placeholder="e.g., 10 servings, 5 kg, 20 items"
                      className="pl-10"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Pickup Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter pickup address"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Be specific so people can easily find you
                  </p>
                </div>

                {/* Pickup Time */}
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time Window *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="pickupTime"
                      placeholder="e.g., 2:00 PM - 5:00 PM today"
                      className="pl-10"
                      value={formData.pickupTime}
                      onChange={(e) =>
                        setFormData({ ...formData, pickupTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Any special instructions, dietary information, or storage requirements..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="foodImage">Food Image (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                    {!imagePreview ? (
                      <>
                        <input
                          type="file"
                          id="foodImage"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="foodImage"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Click to upload image</p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG up to 5MB
                            </p>
                          </div>
                        </label>
                      </>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Food preview"
                          className="max-h-64 mx-auto rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adding a photo helps receivers see what you're offering
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-full bg-gradient-to-r from-primary to-primary/90"
                  >
                    Post Food
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Earn Reward Points</h3>
                <p className="text-sm text-muted-foreground">
                  Every meal you share earns you points and helps build a better community!
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Make an Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Your contribution helps reduce waste and feeds those in need. Thank you!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFood;
