import { PageEditor } from "./page-editor";

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

const pages = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    type: "system",
    content: {
      blocks: [
        {
          id: "hero",
          type: "hero",
          data: {
            title: "Welcome to Our Directory",
            description: "Find the best local businesses in your area",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
          },
        },
        {
          id: "featured",
          type: "featured-listings",
          data: {
            title: "Featured Listings",
            count: 6,
          },
        },
      ],
    },
    styles: `/* Your styles here */`,
  },
  {
    id: "2",
    title: "About Us",
    slug: "/about",
    type: "custom",
    content: {
      blocks: [],
    },
    styles: `/* Your styles here */`,
  },
  {
    id: "3",
    title: "Terms & Conditions",
    slug: "/terms",
    type: "custom",
    content: {
      blocks: [],
    },
    styles: `/* Your styles here */`,
  },
  {
    id: "4",
    title: "Privacy Policy",
    slug: "/privacy",
    type: "custom",
    content: {
      blocks: [],
    },
    styles: `/* Your styles here */`,
  },
];

export function generateStaticParams() {
  // Generate all possible combinations of directory IDs and page IDs
  const params = [];
  for (const directory of directories) {
    for (const page of pages) {
      params.push({
        id: directory.id,
        pageId: page.id,
      });
    }
  }
  return params;
}

export default function EditPagePage({ params }: { params: { id: string; pageId: string } }) {
  const directory = directories.find(d => d.id === params.id);
  const page = pages.find(p => p.id === params.pageId);
  
  if (!directory || !page) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <PageEditor directory={directory} page={page} />;
}