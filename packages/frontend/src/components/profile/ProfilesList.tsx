import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

import { ProfileView } from "./ProfileView";
import { ProfileLoader } from "./ProfileLoader";
import { ApiService } from "../../utils/ApiService";
import { UserData } from "../../types";

export const ProfilesList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [profiles, setProfiles] = React.useState<UserData[]>([]);

  const api = React.useMemo(() => new ApiService(), []);
  // @NOTE: Example api usage:
  // console.log(await api.getProfileViaDid("did:3:kjzl6cwe1jw148uyox3goiyrwwe3aab8vatm3apxqisd351ww0dj6v5e3f61e8b"));

  React.useEffect(() => {
    async function fetchProfiles() {
      const profiles = await api.getAllProfiles();
      setProfiles(profiles)
      setLoading(false);
    }
    fetchProfiles();
  }, []);


  if (loading) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {profiles.map((profile) => {
        return (
          <ProfileView did={profile.did} profile={profile.profile} />
        )
      })}
    </Box>
  );
};
