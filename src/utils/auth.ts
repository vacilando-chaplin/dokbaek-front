import jwt from 'jsonwebtoken';
import fs from 'fs';

export const generateAppleClientSecret = (): string => {
  const keyId = process.env.NEXT_PUBLIC_APPLE_KEY_ID;
  const teamId = process.env.NEXT_PUBLIC_APPLE_TEAM_ID;
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  const privateKey = fs.readFileSync('AuthKey_YOUR_KEY_ID.p8').toString();

  const payload = {
    iss: teamId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 15777000,
    aud: 'https://appleid.apple.com',
    sub: clientId
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
    keyid: keyId 
  });

  return token;
}
