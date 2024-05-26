import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors'; 
import session from 'express-session';
import MongoDBSessionStore from 'connect-mongodb-session';
import userRoutes from './routes/userRoutes.js'; 
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB Session Store
const MongoDBStore = MongoDBSessionStore(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions',
});

// Use a secret for session encryption
const sessionSecret = process.env.SESSION_SECRET ; 

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  key : 'Value',
  secret: sessionSecret,
  resave: false,
  store: store,
  cookie: { secure: false,
    maxAge: 24 * 60 * 60 * 1000, 
  },
}));



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("db connected successfully"))
  .catch((err) => console.log("db is not connected", err));

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`server up and running at ${PORT}`));
