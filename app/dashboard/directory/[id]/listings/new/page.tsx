import { NewListingForm } from "./new-listing-form";

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

export function generateStaticParams() {
  return directories.map((directory) => ({
    id: directory.id,
  }));
}

export default function NewListingPage({ params }: { params: { id: string } }) {
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

  return <NewListingForm directory={directory} />;
}