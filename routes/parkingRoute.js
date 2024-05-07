import express from "express";
const parkingRoute = express.Router();
import {
  getAParking,
  register,
  getParkingdetail,
  deleteParking,
  parkingList,
  update
} 
from "../controller/parkingController.js";
import {  vendorAuth } from "../middlewares/authMiddleware.js";

//User 
parkingRoute.get("/", parkingList);                     //parking based on search 
parkingRoute.get("/:parkingId", getAParking);           // parking based on id 

//Vendor
parkingRoute.post("/register", vendorAuth,  register);  
parkingRoute.put("/update/:id", update);
parkingRoute.get("/:id", getParkingdetail);
parkingRoute.delete("/:id", deleteParking);

export { parkingRoute };
