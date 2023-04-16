export const config = () => ({
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret',
  TOKEN_EXPTIME: process.env.TOKEN_EXPTIME || 604800,
});
