import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(3px)",
      py: 3,
      mt: "auto",
    }}
  >
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="body1" sx={{ mb: 1, color: "white" }}>
        Зв'яжіться зі мною:
      </Typography>
      <Box>
        <IconButton
          component={Link}
          href="mailto:your.email@example.com"
          color="primary"
          aria-label="Email"
          sx={{ "&:hover": { color: "blue" } }}
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          aria-label="GitHub"
          sx={{ "&:hover": { color: "#333" } }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          aria-label="LinkedIn"
          sx={{ "&:hover": { color: "#0077b5" } }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 1, color: "white" }}
      >
        &copy; {new Date().getFullYear()} Yoda. Усі права захищено.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
