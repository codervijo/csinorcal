import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsCard from "../components/NewsCard";
import { news } from "../data/mockData";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Top News
      </Typography>
      {news.map((article) => (
        <NewsCard key={article.id} article={article} onClick={() => navigate(`/news/${article.id}`)} />
      ))}
    </Box>
  );
}
