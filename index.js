import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'; 
import session from 'express-session';
import MongoDBSessionStore from 'connect-mongodb-session';
import userRoutes from './routes/userRoutes.js'; 
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 4000;

const MongoDBStore = MongoDBSessionStore(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'session',
});

app.use(session({
  key : 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: store,
  saveUninitialized: true,
  cookie: { secure: false,
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: 'lax',
  },
}));


app.use(express.json());

const corsOptions = {
  origin:'https://66bdb805dd9af78f2c148604--venerable-marshmallow-1b062d.netlify.app/',
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("db connected successfully"))
  .catch((err) => console.log("db is not connected", err));

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`server up and running at ${PORT}`));
