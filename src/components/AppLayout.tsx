import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const tabs = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Directory", icon: <PeopleIcon />, path: "/directory" },
  { label: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
  { label: "Newsletter", icon: <ArticleIcon />, path: "/newsletters" },
  { label: "Photos", icon: <PhotoLibraryIcon />, path: "/photos" },
  { label: "About Us", icon: <InfoIcon />, path: "/about" },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = tabs.findIndex((t) => t.path === location.pathname);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="fixed" sx={{ bgcolor: "#1a3c5e" }} elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}>
            Our Church
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, pt: "64px", pb: "72px", overflowY: "auto" }}>
        <Outlet />
      </Box>

      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200 }} elevation={8}>
        <BottomNavigation
          showLabels
          value={currentTab >= 0 ? currentTab : false}
          onChange={(_, newValue) => navigate(tabs[newValue].path)}
          sx={{
            "& .Mui-selected": { color: "#1a3c5e" },
            "& .MuiBottomNavigationAction-root": { minWidth: 0 },
          }}
        >
          {tabs.map((tab) => (
            <BottomNavigationAction key={tab.label} label={tab.label} icon={tab.icon} />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
