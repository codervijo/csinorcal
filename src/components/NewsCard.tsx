import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function NewsCard({ article, onClick }: any) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3, overflow: "hidden" }} elevation={2}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="180" image={article.image} alt={article.title} />
        <CardContent>
          <Chip label={article.date} size="small" sx={{ mb: 1, bgcolor: "#e8f0fe", color: "#1a3c5e", fontWeight: 600 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.3 }}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
