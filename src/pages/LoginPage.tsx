import { useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "@/contexts/AuthContext";

function decodeJwt(token: string): Record<string, string> {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return {};
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) return;
    const payload = decodeJwt(response.credential);
    login({
      name: payload.name ?? payload.email ?? "Member",
      email: payload.email ?? "",
      picture: payload.picture ?? "",
    });
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f4f8",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 380, width: "100%", borderRadius: 3 }} elevation={3}>
        <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a3c5e" }}>
              CSI Nor-Cal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Church Connect
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
            Sign in with your Google account to continue.
          </Typography>

          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              // GoogleLogin renders its own error UI; nothing extra needed
            }}
            useOneTap
            shape="rectangular"
            size="large"
            text="signin_with"
            theme="outline"
          />
        </CardContent>
      </Card>
    </Box>
  );
}
