import BuildIcon from "@mui/icons-material/Build";
import StarIcon from "@mui/icons-material/Star";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CssIcon from "@mui/icons-material/Style";
import JavaScriptIcon from "@mui/icons-material/CodeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

export const getIcon = (skill) => {
  const lowerSkill = skill.toLowerCase();
  if (lowerSkill.includes("react"))
    return <SportsEsportsIcon color="primary" sx={{ fontSize: 40 }} />;
  if (lowerSkill.includes("redux"))
    return <BuildIcon color="secondary" sx={{ fontSize: 40 }} />;
  if (lowerSkill.includes("javascript"))
    return <JavaScriptIcon color="warning" sx={{ fontSize: 40 }} />;
  if (lowerSkill.includes("css"))
    return <CssIcon color="info" sx={{ fontSize: 40 }} />;
  if (lowerSkill.includes("html"))
    return <LanguageIcon color="error" sx={{ fontSize: 40 }} />;
  if (lowerSkill.includes("github"))
    return <GitHubIcon color="action" sx={{ fontSize: 40 }} />;
  return <StarIcon color="action" sx={{ fontSize: 40 }} />;
};
