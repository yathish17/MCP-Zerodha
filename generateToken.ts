import { generateAccessToken } from './trade';

const token ="";

generateAccessToken(requestToken)
  .then(accessToken => {
    console.log("Access Token:", accessToken);
  })
  .catch(err => {
    console.error("Error generating access token:", err);
  }); 
