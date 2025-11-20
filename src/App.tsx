import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import Landing from "./pages/Landing";
import LandingCopy from "./pages/Landing copy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailConnection from "./pages/onboarding/EmailConnection";
import OAuthAuthorization from "./pages/onboarding/OAuthAuthorization";
import OAuthCallback from "./pages/onboarding/OAuthCallback";
import UserQuestions from "./pages/onboarding/UserQuestions";
import CategorySelection from "./pages/onboarding/CategorySelection";
import Processing from "./pages/onboarding/Processing";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Categorization from "./pages/dashboard/Categorization";
import Drafts from "./pages/dashboard/Drafts";
import Meetings from "./pages/dashboard/Meetings";
import Connections from "./pages/dashboard/Connections";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Cache Prevention Component
const CachePrevention = () => {
  useEffect(() => {
    // Prevent caching globally
    const preventCache = () => {
      // Remove existing meta tags
      const existingMeta = document.querySelectorAll('meta[http-equiv]');
      existingMeta.forEach(meta => meta.remove());

      // Add fresh meta tags
      const meta1 = document.createElement('meta');
      meta1.httpEquiv = 'Cache-Control';
      meta1.content = 'no-cache, no-store, must-revalidate';
      document.head.appendChild(meta1);

      const meta2 = document.createElement('meta');
      meta2.httpEquiv = 'Pragma';
      meta2.content = 'no-cache';
      document.head.appendChild(meta2);

      const meta3 = document.createElement('meta');
      meta3.httpEquiv = 'Expires';
      meta3.content = '0';
      document.head.appendChild(meta3);
    };

    preventCache();

    // Prevent back button caching
    const handleBeforeUnload = () => {
      window.onbeforeunload = null;
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CachePrevention />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/copy" element={<LandingCopy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Backend redirects to these paths */}
            <Route path="/auth/google/callback" element={<OAuthCallback />} />
            <Route path="/auth/microsoft/callback" element={<OAuthCallback />} />
            <Route path="/auth/zoho/callback" element={<OAuthCallback />} />
            
            {/* Fallback route for /oauth/callback */}
            <Route path="/oauth/callback" element={<OAuthCallback />} />

            {/* Onboarding Routes */}
            <Route path="/onboarding/email-connection" element={<EmailConnection />} />
            <Route path="/onboarding/oauth-auth" element={<OAuthAuthorization />} />
            <Route path="/onboarding/questions" element={<UserQuestions />} />
            <Route path="/onboarding/categories" element={<CategorySelection />} />
            <Route path="/onboarding/processing" element={<Processing />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="categorization" element={<Categorization />} />
              <Route path="drafts" element={<Drafts />} />
              <Route path="meetings" element={<Meetings />} />
              <Route path="connections" element={<Connections />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OnboardingProvider>
  </QueryClientProvider>
);

export default App;