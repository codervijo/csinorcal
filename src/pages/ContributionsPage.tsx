import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { contributions } from "../data/mockData";

export default function ContributionsPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        My Contributions
      </Typography>
      <Card sx={{ borderRadius: 3 }} elevation={2}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e8f0fe" }}>
                <TableCell sx={{ fontWeight: 700, color: "#1a3c5e" }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#1a3c5e" }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.date}</TableCell>
                  <TableCell align="right">${c.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
