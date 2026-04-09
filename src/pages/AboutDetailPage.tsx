import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { aboutGroups } from "../data/mockData";

export default function AboutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = aboutGroups.find((g) => g.id === id);

  if (!group) return <Typography sx={{ p: 2 }}>Group not found.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        {group.name}
      </Typography>
      <Card sx={{ borderRadius: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {group.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
