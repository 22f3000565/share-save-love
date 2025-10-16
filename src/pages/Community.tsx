import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Upload, Image as ImageIcon, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock community posts
const mockPosts = [
  {
    id: 1,
    author: "Green Leaf Restaurant",
    avatar: "GL",
    timestamp: "2 hours ago",
    category: "story",
    content: "Today we shared 50 meals with a local shelter! Feeling grateful to be part of this amazing community. Together we're making a real difference! 🌱",
    image: null,
    likes: 45,
    comments: 12,
    isLiked: false,
  },
  {
    id: 2,
    author: "Sarah Community Helper",
    avatar: "SC",
    timestamp: "5 hours ago",
    category: "tip",
    content: "Pro tip: Store leftover rice in shallow containers so it cools faster and stays fresh longer. This prevents waste and keeps food safe! #SustainabilityTips",
    image: null,
    likes: 28,
    comments: 7,
    isLiked: false,
  },
  {
    id: 3,
    author: "City Food Bank",
    avatar: "CF",
    timestamp: "1 day ago",
    category: "event",
    content: "📣 Announcing our Monthly Food Drive this Saturday, 9 AM - 5 PM at Central Park! We're collecting non-perishable items to distribute to families in need. Join us!",
    image: null,
    likes: 89,
    comments: 23,
    isLiked: true,
  },
  {
    id: 4,
    author: "Mike's Kitchen",
    avatar: "MK",
    timestamp: "2 days ago",
    category: "story",
    content: "Rescued 20kg of perfectly good vegetables from going to waste today. Made delicious soup for 100 people at the community center. This is what FoodSaver is all about! ❤️",
    image: null,
    likes: 67,
    comments: 19,
    isLiked: false,
  },
];

const Community = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleComment = (postId: number) => {
    toast.info("Comment feature coming soon!");
  };

  const handleShare = (postId: number) => {
    toast.success("Post link copied to clipboard!");
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast.error("Please write something before posting!");
      return;
    }

    const newPostObj = {
      id: posts.length + 1,
      author: "You",
      avatar: "YU",
      timestamp: "Just now",
      category: "story",
      content: newPost,
      image: postImage,
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setPostImage(null);
    toast.success("Post shared with the community!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredPosts =
    activeTab === "all" ? posts : posts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">FoodSaver Community</h1>
            <p className="text-muted-foreground text-lg">
              Share stories, tips, and connect with fellow food heroes
            </p>
          </div>

          {/* Stats Banner */}
          <Card className="border-2 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="py-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">2,450</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div>
                  <Heart className="h-6 w-6 mx-auto mb-2 text-secondary fill-secondary" />
                  <p className="text-2xl font-bold">15,340</p>
                  <p className="text-xs text-muted-foreground">Meals Saved</p>
                </div>
                <div>
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Post */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    YU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your food saving story, sustainability tips, or community events..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="flex gap-2">
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="post-image">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full cursor-pointer"
                    asChild
                  >
                    <span>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Photo
                    </span>
                  </Button>
                </label>
                {postImage && (
                  <Badge variant="secondary" className="rounded-full">
                    Image attached
                  </Badge>
                )}
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-primary to-primary/90"
                onClick={handleCreatePost}
              >
                <Upload className="h-4 w-4 mr-2" />
                Post
              </Button>
            </CardFooter>
          </Card>

          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="story">Stories</TabsTrigger>
              <TabsTrigger value="tip">Tips</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        {post.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post content"
                        className="rounded-lg w-full object-cover max-h-96"
                      />
                    )}
                  </CardContent>

                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-2 ${post.isLiked ? "text-secondary" : ""}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                          />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare(post.id)}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {filteredPosts.length === 0 && (
            <Card className="border-2">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No posts in this category yet. Be the first to share!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
