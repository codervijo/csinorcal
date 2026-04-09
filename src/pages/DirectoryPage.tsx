import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MemberListItem from "../components/MemberListItem";
import { families } from "../data/mockData";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = families.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Directory
      </Typography>
      <TextField
        fullWidth
        placeholder="Search families..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />
      <List>
        {filtered.map((family) => (
          <MemberListItem key={family.id} family={family} onClick={() => navigate(`/directory/${family.id}`)} />
        ))}
      </List>
    </Box>
  );
}
