import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeProvider } from "@/context/ModeContext";
import { ModeGate } from "@/components/layout/ModeGate";
import { FuturisticDeveloperLayout } from "@/components/layout/FuturisticDeveloperLayout";

import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      {/* Redirect /admin to the static file */}
      <Route path="/admin" component={() => {
        window.location.href = "/admin/index.html";
        return null;
      }} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModeProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <ModeGate />
            <FuturisticDeveloperLayout>
              <Router />
            </FuturisticDeveloperLayout>
          </TooltipProvider>
        </ThemeProvider>
      </ModeProvider>
    </QueryClientProvider>
  );
}

export default App;

