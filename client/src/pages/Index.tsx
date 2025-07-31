import { useCafeData } from '../hooks/useCafeData';
import { DashboardHeader } from '../components/DashboardHeader';
import { SummaryCards } from '../components/SummaryCards';
import { LiveSalesTable } from '../components/LiveSalesTable';
import { SalesChart } from '../components/SalesChart';
import { InventorySection } from '../components/InventorySection';
import { AttendanceSection } from '../components/AttendanceSection';
import { FeedbackSection } from '../components/FeedbackSection';

const Index = () => {
  const { data, loading, error, refetch } = useCafeData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 bg-primary/10 animate-pulse mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Loading Cafe Bluez Dashboard
            </h2>
            <p className="text-muted-foreground/80">Fetching real-time cafe operations data</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/10">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <DashboardHeader 
          lastUpdated={data.lastUpdated}
          isLoading={loading}
          error={error}
          onRefresh={refetch}
        />
        
        <div className="animate-fade-in">
          <SummaryCards data={data} />
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SalesChart data={data} />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <LiveSalesTable data={data} />
          <InventorySection data={data} />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AttendanceSection data={data} />
          <div>
            <FeedbackSection data={data} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 text-center">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground/80 font-medium">
              Cafe Bluez Dashboard • Real-time updates every 60 seconds
            </p>
            <p className="text-xs text-muted-foreground/60">
              Built with precision for efficient cafe management
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-primary/80 font-mono">System Online</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;