import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import { families } from "../data/mockData";

export default function FamilyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const family = families.find((f) => f.id === Number(id));

  if (!family) return <Typography sx={{ p: 2 }}>Family not found.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "#1a3c5e", fontSize: 32, mb: 1 }}>
          {family.name.charAt(0)}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a3c5e" }}>
          {family.name}
        </Typography>
      </Box>
      <Card sx={{ borderRadius: 3, mb: 2 }} elevation={2}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PhoneIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Typography variant="body1">{family.phone}</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#1a3c5e" }}>Members</Typography>
          {family.members.map((member, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <PersonIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              <Typography variant="body2">{member}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
