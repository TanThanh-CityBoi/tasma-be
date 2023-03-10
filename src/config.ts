export const config = () => ({
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPTIME: process.env.TOKEN_EXPTIME,
});
