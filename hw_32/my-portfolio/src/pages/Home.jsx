import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import StarIcon from "@mui/icons-material/Star";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"; // Используем подходящую иконку для React
import CssIcon from "@mui/icons-material/Style";
import JavaScriptIcon from "@mui/icons-material/CodeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import resumeData from "../data/resumeData";

const getIcon = (skill) => {
  if (skill.toLowerCase().includes("react"))
    return <SportsEsportsIcon color="primary" sx={{ fontSize: 40 }} />;
  if (skill.toLowerCase().includes("redux"))
    return <BuildIcon color="secondary" sx={{ fontSize: 40 }} />;
  if (skill.toLowerCase().includes("javascript"))
    return <JavaScriptIcon color="warning" sx={{ fontSize: 40 }} />;
  if (skill.toLowerCase().includes("css"))
    return <CssIcon color="info" sx={{ fontSize: 40 }} />;
  if (skill.toLowerCase().includes("github"))
    return <GitHubIcon color="action" sx={{ fontSize: 40 }} />;
  return <StarIcon color="action" sx={{ fontSize: 40 }} />;
};

const Home = () => (
  <Container
    maxWidth="md"
    sx={{
      mt: 4,
      padding: 2,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 2,
    }}
  >
    <Paper
      elevation={3}
      sx={{ p: 4, backgroundColor: "rgba(255,255,255,0.8)" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          alt={resumeData.name}
          src={resumeData.photo}
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <Box>
          <Typography variant="h3" gutterBottom>
            {resumeData.name}
          </Typography>
          <Typography variant="body1">{resumeData.position}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {resumeData.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Skills:
      </Typography>
      <List>
        {resumeData.skills.map((skill, idx) => (
          <ListItem
            key={idx}
            sx={{ bgcolor: "#f9f9f9", mb: 1, borderRadius: 1 }}
          >
            <ListItemIcon>{getIcon(skill)}</ListItemIcon>
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Container>
);

export default Home;
