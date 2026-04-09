import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function EventCard({ event }: any) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3 }} elevation={2}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a3c5e" }}>
          {event.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EventIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">{event.date}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">{event.time}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
