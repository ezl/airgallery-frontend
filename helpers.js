export const getGoogleOAuthUrl = () => {
  const baseUrl = "https://accounts.google.com/o/oauth2/auth";
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
  const scope =
    "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  const responseType = "code";
  const accessType = "offline";

  return `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrl}&access_type=${accessType}&response_type=${responseType}`;
};
