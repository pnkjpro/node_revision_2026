### install jwt
npm i jsonwebtoken

### jwt functions:
 - jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
 - jwt.verify(token, process.env.JWT_SECRET)