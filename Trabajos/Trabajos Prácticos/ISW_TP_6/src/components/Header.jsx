import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, IconButton, Toolbar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "green",
        height: "50px",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "10%",
      }}
    >
      <Toolbar>
        <Box minWidth={"100%"} sx={{ marginLeft: "0%" }}>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            href="https://www.linkedin.com/in/franco-lautaro-gregorat-176154251/"
          >
            <LinkedInIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            href="https://github.com/lautarogregorat/Animalia"
          >
            <GitHubIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
