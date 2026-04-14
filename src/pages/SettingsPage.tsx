import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ p: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Settings
      </Typography>

      {/* Profile */}
      <Card sx={{ borderRadius: 3, mb: 2 }} elevation={2}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={user?.picture}
            sx={{ width: 56, height: 56, bgcolor: "#1a3c5e", fontSize: 24 }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Menu */}
      <Card sx={{ borderRadius: 3, mb: 3 }} elevation={2}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/contributions")} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "#1a3c5e" }}>
                <VolunteerActivismIcon />
              </ListItemIcon>
              <ListItemText primary="My Contributions" slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              <ChevronRightIcon color="action" />
            </ListItemButton>
          </ListItem>
        </List>
      </Card>

      <Button
        fullWidth variant="outlined" color="error" size="large"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: "none", fontSize: 16 }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
