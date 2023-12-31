import jwt from 'jsonwebtoken';

export const signIn = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: '1lk24j124l',
    email: 'test@test.com',
  };
  // Create the JWT!
  const token = jwt.sign(payload, 'secret');
  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
