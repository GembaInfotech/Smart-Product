import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const userRoute = express.Router();
import {
  register,
  login,
  update,
  user
} from "../controller/userController.js";

userRoute.post("/login", login);   //login
userRoute.post("/register", register);  //register
userRoute.get("/",authMiddleware, user ); //user detail
userRoute.put("/update", authMiddleware, update); //update user information
//userRoute.get("/token/:token", verify);

export { userRoute };
