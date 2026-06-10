import dotenv from "dotenv";
dotenv.config();

export const env = {
//database
  PORT: process.env.port,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
//files
  uploadPath : process.env.uploadPath,
//authentication
  jwtSecret : "lvm",
//urls
  frontend_url : "http://localhost:3000"
};

