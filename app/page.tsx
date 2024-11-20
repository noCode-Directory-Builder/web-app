import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Building2, Globe, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">DirectoryBuilder</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Build Your Directory in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional directories with AI-powered content generation, beautiful templates,
            and powerful features - no coding required.
          </p>
          <Button size="lg" asChild>
            <Link href="/register" className="flex items-center">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <Building2 className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">No-Code Platform</h3>
            <p className="text-muted-foreground">
              Build and customize your directory with an intuitive drag-and-drop interface.
            </p>
          </Card>
          <Card className="p-6">
            <Rocket className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-muted-foreground">
              Generate SEO-optimized descriptions and metadata automatically.
            </p>
          </Card>
          <Card className="p-6">
            <Globe className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
            <p className="text-muted-foreground">
              Launch your directory on your own domain with SSL security included.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}