# Cafe Bluez Dashboard

A comprehensive full-stack React application for cafe management featuring real-time data visualization, inventory tracking, staff attendance monitoring, and customer feedback analysis.

## 🚀 Features

- **Real-time Dashboard**: Live updates every 60 seconds with modern animated UI
- **Sales Analytics**: Interactive charts showing sales trends and performance metrics
- **Inventory Management**: Track stock levels with low-stock alerts and reorder notifications
- **Staff Attendance**: Monitor employee check-ins/check-outs with status tracking
- **Customer Feedback**: Collect and analyze customer reviews and ratings
- **Responsive Design**: Mobile-first approach with dark theme optimization
- **Standalone HTML Version**: Complete portable dashboard in a single file

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom animations
- **Radix UI** components with shadcn/ui library
- **TanStack Query** for state management
- **Recharts** for data visualization
- **Wouter** for lightweight routing
- **Vite** for fast development builds

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL)
- **WebSocket** support for real-time updates

### Key Integrations
- **Google Sheets** API for data fallback
- **Webhook** integration for real-time data fetching
- **CSV Processing** with PapaParse

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cafe-bluez-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Add your database URL
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 🏗 Project Structure

```
cafe-bluez-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── types/         # TypeScript type definitions
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction layer
│   └── index.ts           # Server entry point
├── shared/                # Shared code between client/server
│   └── schema.ts          # Database schema definitions
├── cafe-dashboard.html    # Standalone HTML version
└── README.md
```

## 🎨 UI Features

### Modern Animations
- **Fade-in animations** for dashboard sections
- **Hover effects** with scale and glow transformations
- **Floating icons** with smooth animations
- **Gradient borders** for alert states
- **Loading screens** with animated spinners
- **Shimmer effects** for text elements

### Responsive Design
- **Mobile-first** approach
- **Grid layouts** that adapt to screen sizes
- **Touch-friendly** interactions
- **Optimized performance** on all devices

## 📊 Data Sources

The dashboard supports multiple data sources with automatic fallback:

1. **Primary**: Webhook endpoint (`http://localhost:5678/webhook-test/sheetaccess`)
2. **Fallback**: Google Sheets CSV export URLs
3. **Demo**: Built-in demo data for development

## 🔧 API Endpoints

- `GET /api/cafe-data` - Fetch complete dashboard data
- `POST /api/refresh` - Trigger manual data refresh
- `GET /api/health` - Health check endpoint

## 🎯 Key Components

### Dashboard Sections
- **Summary Cards**: Key metrics with animated counters
- **Sales Chart**: Interactive line chart showing trends
- **Live Sales Table**: Recent transactions with payment methods
- **Inventory Section**: Stock levels with reorder alerts
- **Attendance Section**: Staff check-in/out status
- **Feedback Section**: Customer reviews and ratings

### Data Processing
- **CSV Parsing**: Automatic parsing of Google Sheets data
- **Real-time Updates**: WebSocket integration for live data
- **Error Handling**: Graceful fallbacks and user notifications
- **Data Validation**: TypeScript schemas with Zod validation

## 🚀 Deployment

### Replit Deployment
The application is optimized for Replit deployment:

```bash
npm run build
npm start
```

### Production Build
```bash
# Build frontend
npm run build

# Start production server
npm run start
```

## 📱 Standalone Version

The project includes `cafe-dashboard.html` - a complete standalone version that:
- Contains all functionality in a single file
- Works offline without dependencies
- Includes embedded CSS and JavaScript
- Features the same modern UI and animations
- Uses Chart.js for visualizations

## 🔒 Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=development|production
PORT=5000
```

## 🧪 Development

### Hot Reloading
- Frontend: Vite HMR for instant updates
- Backend: tsx with file watching
- Full-stack integration with seamless development

### Code Quality
- **TypeScript** for type safety
- **ESLint** configuration
- **Prettier** for code formatting
- **Shared schemas** between frontend/backend

## 📈 Performance

- **Optimized builds** with Vite and esbuild
- **Code splitting** for smaller bundle sizes
- **Efficient caching** with TanStack Query
- **Minimal re-renders** with React optimization
- **Fast database queries** with Drizzle ORM

## 🎨 Theming

The application features a custom dark theme optimized for cafe environments:
- **Golden accents** (HSL 51, 100%, 50%)
- **Dark backgrounds** with gradient overlays
- **High contrast** for readability
- **Smooth transitions** and micro-interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Advanced analytics and reporting
- [ ] Multi-location support
- [ ] Employee scheduling integration
- [ ] Customer loyalty program
- [ ] Mobile app companion
- [ ] Advanced inventory forecasting
- [ ] Integration with POS systems
- [ ] Automated email/SMS notifications

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for efficient cafe management**