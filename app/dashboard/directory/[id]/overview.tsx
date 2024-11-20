// Add a new card for Pages in the overview section
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle className="text-lg">Pages</CardTitle>
    <Button variant="ghost" size="sm" asChild>
      <Link href={`/dashboard/directory/${directoryId}/pages`}>
        View All
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Home</span>
        </div>
        <Badge>Published</Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">About Us</span>
        </div>
        <Badge>Published</Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Contact</span>
        </div>
        <Badge variant="secondary">Draft</Badge>
      </div>
    </div>
  </CardContent>
</Card>

// ... rest of the file remains the same