import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { newsletters } from "../data/mockData";

function getPdfSrc(file: string) {
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocalhost) return file;
  const absoluteUrl = `${window.location.origin}${file}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
}

export default function NewsletterPage() {
  const current = newsletters.find((n) => n.isCurrent);
  const archived = newsletters.filter((n) => !n.isCurrent);
  const [selected, setSelected] = useState(current ?? newsletters[0]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Newsletter
      </Typography>

      {/* Inline PDF viewer */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 1,
          mb: 3,
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1a3c5e" }}>
            {selected.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selected.date}
          </Typography>
        </Box>
        <Box
          component="iframe"
          src={getPdfSrc(selected.file)}
          title={selected.title}
          sx={{ width: "100%", height: "520px", border: "none", display: "block" }}
        />
      </Box>

      {/* Archive list */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a3c5e" }}>
        Previous Newsletters
      </Typography>
      <List disablePadding>
        {archived.map((n) => (
          <ListItem key={n.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                setSelected(n);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              selected={selected.id === n.id}
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                py: 1.5,
                boxShadow: 1,
                "&.Mui-selected": { bgcolor: "#e8eef5" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#c0392b" }}>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText
                primary={n.title}
                secondary={n.date}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
