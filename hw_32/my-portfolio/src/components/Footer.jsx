import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(6px)",
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
