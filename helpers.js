export const getGoogleOAuthUrl = (requestedScopes) => {

  if(!Array.isArray(requestedScopes)){
    throw('Scope must be an array')
  }

  const scope = requestedScopes.join(' ')

  const baseUrl = "https://accounts.google.com/o/oauth2/auth";
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
  const responseType = "code";
  const accessType = "offline";

  return `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrl}&access_type=${accessType}&response_type=${responseType}`;
};
