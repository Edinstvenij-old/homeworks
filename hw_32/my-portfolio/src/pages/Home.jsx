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
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import StarIcon from "@mui/icons-material/Star";
import resumeData from "../data/resumeData";

const getIcon = (skill) => {
  if (skill.toLowerCase().includes("react"))
    return <CodeIcon color="primary" />;
  if (skill.toLowerCase().includes("redux"))
    return <BuildIcon color="secondary" />;
  return <StarIcon color="action" />;
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
        Нав Skills:
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
