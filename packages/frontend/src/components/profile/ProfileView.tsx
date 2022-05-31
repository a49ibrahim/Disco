import * as React from "react";
import { Profile } from "../../types";
import { Box, Container, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { discoLinearGradientDark } from "../../themes";
import { DidView, DiscoButton } from "../";

function ProfileError({ did }: { did: string }): React.ReactElement {
  return <div>Error loading profile for: {did}</div>
}

export const ProfileView: React.FC<{ did: string, profile?: Profile }> = ({ did, profile }) => {

  if (!profile) {
    return <ProfileError did={did}/>
   }

  return (
    <>
      <Box
        mb={3}
        sx={{
          backgroundColor: "transparent",
          backgroundImage: profile.banner ? `url(${profile.banner})` : discoLinearGradientDark,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          clipPath: "ellipse(93% 100% at 50% 0%)",
          minHeight: "150px",
          width: "100%",
        }}
      />
      <Container maxWidth="lg" sx={{ margin: ["-100px 0 32px", "-150px 0 32px"], position: "relative", zIndex: 1 }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderRadius: "5px",
              height: ["100px", "200px"],
              marginBottom: "16px",
              overflow: "hidden",
              width: ["100px", "200px"],
            }}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="avatar" style={{ height: "100%", width: "100%" }} />
            ) : (
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "#80DEEA",
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <PersonIcon sx={{ color: "common.white", fontSize: "20px" }} />
              </Box>
            )}
          </Box>
          <Box sx={{ alignItems: "flex-start", display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ marginBottom: "16px" }}>
                {profile.name ? (
                  <Typography variant="h5">{profile.name}</Typography>
                ) : (
                  <DidView did={did} typographyVariant="h5" copy />
                )}
                {profile.name && <DidView did={did} copy />}
              </Box>
              <Box sx={{ maxWidth: "500px", width: "100%" }}>
                {profile.bio && <Typography variant="body2">{profile.bio}</Typography>}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
