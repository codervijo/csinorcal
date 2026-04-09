import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

export default function MemberListItem({ family, onClick }: any) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick} sx={{ py: 1.5, borderRadius: 2 }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#1a3c5e" }}>
            <FamilyRestroomIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={family.name}
          secondary={family.phone}
          slotProps={{ primary: { sx: { fontWeight: 600 } } }}
        />
      </ListItemButton>
    </ListItem>
  );
}
