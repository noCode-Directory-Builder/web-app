# DirectoryBuilder

A powerful no-code platform for creating and managing professional directories with AI-powered content generation, beautiful templates, and advanced features.

## Features

- 🎨 No-code page builder with drag-and-drop interface
- 📱 Responsive layouts for desktop, tablet, and mobile
- 🤖 AI-powered content generation
- 🔍 Advanced search and filtering
- 📊 Built-in analytics and reporting
- 💳 Integrated payment processing
- 🗺️ Location-based features with maps integration
- 📧 Email template management
- 👥 Team collaboration tools
- 🎯 SEO optimization tools
- 🔒 Role-based access control

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Rich Text**: TipTap
- **Drag & Drop**: @hello-pangea/dnd
- **Code Editor**: Monaco Editor
- **State Management**: Zustand
- **Maps**: Google Maps/Mapbox integration
- **Authentication**: Custom auth with JWT

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/directory-builder.git
cd directory-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── register/        # User registration
├── components/           # Reusable components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard-specific components
│   ├── directory/       # Directory-related components
│   ├── email/          # Email template components
│   ├── listings/       # Listing management components
│   ├── page-builder/   # Page builder components
│   └── ui/            # UI components (shadcn/ui)
├── lib/                # Utilities and helpers
│   ├── constants/     # Constants and configurations
│   └── validations/   # Zod schemas
└── public/            # Static assets
```

## Key Components

### Dashboard

- `DashboardLayout`: Main layout for authenticated users
- `DashboardOverview`: Analytics and statistics dashboard
- `DirectoryListings`: Listing management interface
- `CategoryManager`: Category and tag management
- `EmailBuilder`: Email template creation and management

### Directory Management

- `PageBuilder`: No-code page builder interface
- `BlockPicker`: Component selection for page builder
- `LivePreview`: Real-time page preview
- `StyleEditor`: CSS editor with Monaco
- `SearchFilterBuilder`: Custom search filter configuration

### Listing Management

- `ListingForm`: Create/edit listing interface
- `ImageUpload`: Multi-image upload with cover selection
- `LocationPicker`: Map-based location selector
- `OpeningHours`: Business hours configuration
- `ListingFeatures`: Feature selection interface

## Authentication

The application uses a custom authentication system with JWT tokens. Key components:

- `AuthProvider`: Context provider for auth state
- `useAuth`: Hook for accessing auth functionality
- `ProtectedRoute`: HOC for route protection

## Styling

- Tailwind CSS for utility-first styling
- CSS variables for theme customization
- Dark mode support
- Responsive design patterns

## API Integration

The application is designed to work with any backend that implements the required endpoints:

- Authentication endpoints
- Directory CRUD operations
- Listing management
- File upload
- Analytics data
- Email management

## Development Guidelines

1. **Component Creation**
   - Use TypeScript for type safety
   - Implement proper prop validation
   - Add JSDoc comments for complex functions
   - Follow the component naming convention

2. **State Management**
   - Use Zustand for global state
   - React Query for server state
   - Local state for component-specific data

3. **Testing**
   - Write unit tests for utilities
   - Component tests with React Testing Library
   - E2E tests with Cypress

4. **Code Style**
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Follow conventional commits

## Performance Optimization

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Memoization of expensive computations
- Debounced search inputs
- Virtualized lists for large datasets

## Deployment

The application can be deployed to various platforms:

- Vercel (recommended)
- Netlify
- AWS
- Docker containers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@directorybuilder.com or join our Discord community.

## Roadmap

- [ ] AI-powered content suggestions
- [ ] Advanced analytics dashboard
- [ ] Mobile app integration
- [ ] Multi-language support
- [ ] Enhanced SEO tools
- [ ] Automated testing suite
- [ ] Performance monitoring
- [ ] Enhanced security features

## Acknowledgments

- shadcn/ui for the component library
- Vercel for hosting
- The Next.js team
- All contributors

## Security

Please report security vulnerabilities to security@directorybuilder.com.

For production deployments, ensure:

- Environment variables are properly set
- Authentication is properly configured
- API endpoints are secured
- Rate limiting is implemented
- CORS is configured correctly