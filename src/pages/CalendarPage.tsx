import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventCard from "../components/EventCard";
import { events } from "../data/mockData";

export default function CalendarPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Upcoming Events
      </Typography>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
}
