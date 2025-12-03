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
import AIAssistant from "./pages/dashboard/AIAssistant";
import Connections from "./pages/dashboard/Connections";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/onboarding/email-connection" element={<EmailConnection />} />
            <Route path="/onboarding/oauth-auth" element={<OAuthAuthorization />} />
            <Route path="/onboarding/questions" element={<UserQuestions />} />
            <Route path="/onboarding/categories" element={<CategorySelection />} />
            <Route path="/onboarding/processing" element={<Processing />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="categorization" element={<Categorization />} />
              <Route path="drafts" element={<Drafts />} />
              <Route path="meetings" element={<Meetings />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
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
