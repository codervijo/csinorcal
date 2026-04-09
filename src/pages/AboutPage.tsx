import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { aboutGroups } from "../data/mockData";

const iconMap: any = {
  MenuBook: <MenuBookIcon />,
  AccountBalance: <AccountBalanceIcon />,
  MusicNote: <MusicNoteIcon />,
  Groups: <GroupsIcon />,
  Person: <PersonIcon />,
};

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        About Us
      </Typography>
      <List>
        {aboutGroups.map((group) => (
          <ListItem key={group.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(`/about/${group.id}`)}
              sx={{ bgcolor: "white", borderRadius: 3, py: 1.5, boxShadow: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#1a3c5e" }}>
                {iconMap[group.icon] || <GroupsIcon />}
              </ListItemIcon>
              <ListItemText primary={group.name} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              <ChevronRightIcon color="action" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
