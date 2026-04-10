import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import albums from "../data/photos.json";

type Album = { id: string; title: string; albumUrl: string; coverUrl: string; date: string };

function openAlbum(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function AlbumCover({ album, height }: { album: Album; height: number }) {
  return album.coverUrl ? (
    <CardMedia
      component="img"
      height={height}
      image={album.coverUrl}
      alt={album.title}
      sx={{ objectFit: "cover" }}
    />
  ) : (
    <Box
      sx={{
        height,
        bgcolor: "#e8eef5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PhotoLibraryIcon sx={{ fontSize: height / 3, color: "#1a3c5e", opacity: 0.35 }} />
    </Box>
  );
}

function FeaturedAlbumCard({ album }: { album: Album }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
      <CardActionArea onClick={() => openAlbum(album.albumUrl)}>
        <AlbumCover album={album} height={220} />
        <CardContent sx={{ py: 2, px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a3c5e", lineHeight: 1.2 }}>
                {album.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {album.date}
              </Typography>
            </Box>
            <OpenInNewIcon sx={{ color: "#1a3c5e", opacity: 0.5, mt: 0.5, fontSize: 18 }} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardActionArea onClick={() => openAlbum(album.albumUrl)}>
        <AlbumCover album={album} height={110} />
        <CardContent sx={{ py: 1.5, px: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a3c5e", lineHeight: 1.3 }}>
            {album.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {album.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function PhotosPage() {
  const [featured, ...rest] = albums as Album[];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#1a3c5e" }}>
        Photos
      </Typography>

      {featured && <FeaturedAlbumCard album={featured} />}

      {rest.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1a3c5e", mb: 1.5 }}>
            More Albums
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {rest.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
