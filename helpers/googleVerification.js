import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

async function googleTokenVerification(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { email, name, picture } = ticket.getPayload();
  return {
    email,
    name,
    image: picture
  };
}

export {
  googleTokenVerification
}