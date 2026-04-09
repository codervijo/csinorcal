import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import DirectoryPage from "./pages/DirectoryPage";
import FamilyDetailPage from "./pages/FamilyDetailPage";
import CalendarPage from "./pages/CalendarPage";
import AboutPage from "./pages/AboutPage";
import AboutDetailPage from "./pages/AboutDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import SettingsPage from "./pages/SettingsPage";
import ContributionsPage from "./pages/ContributionsPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/directory/:id" element={<FamilyDetailPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:id" element={<AboutDetailPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/contributions" element={<ContributionsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
