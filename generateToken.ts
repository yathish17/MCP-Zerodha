import { generateAccessToken } from './trade';

const requestToken = "VzzYZRcWKnyG90lNB1on6ku26KtrWZVR";

generateAccessToken(requestToken)
  .then(accessToken => {
    console.log("Access Token:", accessToken);
  })
  .catch(err => {
    console.error("Error generating access token:", err);
  }); 