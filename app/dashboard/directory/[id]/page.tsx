import { DirectoryPageClient } from "./page.client";

// Mock data - in a real app, this would come from your API
const directories = [
  {
    id: "1",
    name: "Restaurant Directory",
    type: "restaurants",
  },
  {
    id: "2",
    name: "Local Business Guide",
    type: "businesses",
  },
];

const topListings = [
  {
    id: 1,
    name: "Central Cafe",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    views: 1250,
    category: "Restaurant",
  },
  {
    id: 2,
    name: "Urban Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    views: 980,
    category: "Fitness",
  },
  {
    id: 3,
    name: "Green Garden Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    views: 450,
    category: "Restaurant",
  },
];

const recentListings = [
  {
    id: 4,
    name: "Downtown Bistro",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    views: 120,
    category: "Restaurant",
  },
  {
    id: 5,
    name: "Yoga Studio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    views: 85,
    category: "Fitness",
  },
  {
    id: 6,
    name: "Art Gallery",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    views: 65,
    category: "Arts",
  },
];

const topPosts = [
  {
    id: 1,
    title: "Top 10 Restaurants in the City",
    views: 2500,
    publishDate: "2024-03-01",
    excerpt: "Discover the best dining experiences our city has to offer...",
  },
  {
    id: 2,
    title: "Hidden Gems for Food Lovers",
    views: 1800,
    publishDate: "2024-02-28",
    excerpt: "Explore these lesser-known but amazing restaurants...",
  },
  {
    id: 3,
    title: "Ultimate Restaurant Guide 2024",
    views: 1500,
    publishDate: "2024-02-25",
    excerpt: "Everything you need to know about dining out this year...",
  },
];

const recentPosts = [
  {
    id: 4,
    title: "New Restaurant Openings This Month",
    views: 350,
    publishDate: "2024-03-10",
    excerpt: "Check out these exciting new additions to the food scene...",
  },
  {
    id: 5,
    title: "Best Brunch Spots for Weekend",
    views: 280,
    publishDate: "2024-03-09",
    excerpt: "Start your weekend right with these amazing brunch locations...",
  },
  {
    id: 6,
    title: "Local Food Events Coming Up",
    views: 150,
    publishDate: "2024-03-08",
    excerpt: "Don't miss these upcoming food festivals and events...",
  },
];

// Add generateStaticParams for static site generation
export function generateStaticParams() {
  return directories.map((directory) => ({
    id: directory.id,
  }));
}

export default function DirectoryPage({ params }: { params: { id: string } }) {
  const directory = directories.find(d => d.id === params.id);
  
  if (!directory) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Directory Not Found</h2>
          <p className="text-muted-foreground">
            The directory you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DirectoryPageClient 
      directory={directory}
      topListings={topListings}
      recentListings={recentListings}
      topPosts={topPosts}
      recentPosts={recentPosts}
    />
  );
}