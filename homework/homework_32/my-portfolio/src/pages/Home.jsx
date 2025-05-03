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
import resumeData from "../components/data/resumeData";
import { getIcon } from "../components/utils/icons";

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
          alt={resumeData?.name || "Фото"}
          src={resumeData?.photo || "/default-avatar.jpg"}
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <Box>
          <Typography variant="h3" gutterBottom>
            {resumeData?.name || "Имя не указано"}
          </Typography>
          <Typography variant="body1">
            {resumeData?.position || "Должность не указана"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {resumeData?.summary || "Описание отсутствует."}
      </Typography>

      {resumeData?.skills?.length > 0 ? (
        <>
          <Typography variant="h5" gutterBottom>
            Skills:
          </Typography>
          <List>
            {resumeData.skills.map((skill, idx) => (
              <ListItem
                key={skill + idx}
                sx={{ bgcolor: "#f9f9f9", mb: 1, borderRadius: 1 }}
              >
                <ListItemIcon>{getIcon(skill)}</ListItemIcon>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Нет навыков, чтобы отобразить.
        </Typography>
      )}
    </Paper>
  </Container>
);

export default Home;
