import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Mock login — just navigate to home
    localStorage.setItem("churchUser", JSON.stringify({ email }));
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5", p: 2 }}>
      <Card sx={{ maxWidth: 400, width: "100%", borderRadius: 3 }} elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "#1a3c5e", textAlign: "center" }}>
            Welcome Back
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth label="Email" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <TextField
              fullWidth label="Password" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <Button
              fullWidth type="submit" variant="contained" size="large"
              sx={{ bgcolor: "#1a3c5e", borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: "none", fontSize: 16 }}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
