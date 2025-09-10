import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Rentals from "@/pages/Rentals";
import Partners from "@/pages/Partners";
import NotFound from "@/pages/NotFound";
import LiveMap from "@/pages/MapAndExplore";
import { AuthGuard, AuthProvider } from "@/hooks/useAuth";
import UserAccount from "@/pages/UserAccount";
import PartnerAccount from "@/pages/PartnerAccount";
import ProtectedRoute from "@/components/login/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AuthGuard>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/map" element={<LiveMap />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <UserAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver-dashboard"
                element={
                  <ProtectedRoute>
                    <PartnerAccount />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthGuard>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
