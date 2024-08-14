import express from "express";
const router = express.Router({ mergeParams: true });
import userReg from "../controllers/userReg.js";
import userLogin from "../controllers/userLogin.js";
import loggedUser from "../controllers/loggedUser.js";
import cors from "cors";


router.post('/log-out', cors(), loggedUser);

router.post('/reg', cors(), userReg);
router.post('/login', cors(), userLogin);


export default router;


