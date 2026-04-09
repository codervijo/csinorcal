import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import { news } from "../data/mockData";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = news.find((n) => n.id === Number(id));

  if (!article) return <Typography sx={{ p: 2 }}>Article not found.</Typography>;

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <img src={article.image} alt={article.title} style={{ width: "100%", height: 220, objectFit: "cover" }} />
        <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 8, left: 8, bgcolor: "rgba(255,255,255,0.85)" }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Chip label={article.date} size="small" sx={{ mb: 1, bgcolor: "#e8f0fe", color: "#1a3c5e", fontWeight: 600 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
          {article.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {article.fullContent}
        </Typography>
      </Box>
    </Box>
  );
}
