import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeProvider } from "@/context/ModeContext";
import { ModeGate } from "@/components/layout/ModeGate";
import { FuturisticDeveloperLayout } from "@/components/layout/FuturisticDeveloperLayout";
import { FeedbackPopup } from "@/components/FeedbackPopup";

import { Suspense, lazy } from "react";
import Preloader from "@/components/Preloader";
import { MatrixOverlay } from "@/components/developer/MatrixOverlay";
import { useMode } from "@/context/ModeContext";

// Lazy load pages
const Portfolio = lazy(() => import("@/pages/portfolio"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Suspense fallback={<Preloader />}>
          <Portfolio />
        </Suspense>
      </Route>
      {/* Redirect /admin to the static file */}
      <Route path="/admin" component={() => {
        window.location.href = "/admin/index.html";
        return null;
      }} />
      <Route>
        <Suspense fallback={<Preloader />}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}

import ErrorBoundary from "@/components/ErrorBoundary";

function AppContent() {
  const { isMatrixEnabled } = useMode();
  return (
    <>
      <Toaster />
      <ModeGate />
      <FeedbackPopup />
      <FuturisticDeveloperLayout>
        <Router />
      </FuturisticDeveloperLayout>
      {isMatrixEnabled && <MatrixOverlay />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ModeProvider>
          <ThemeProvider>
            <TooltipProvider>
              <AppContent />
            </TooltipProvider>
          </ThemeProvider>
        </ModeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

