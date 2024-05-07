import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const vehicleRoute = express.Router();
import {
  deleteVehicle,
  defaultVehicle,
  createVehicle,
  vehicles
}
from "../controller/vehicleController.js";

vehicleRoute.post("/",authMiddleware, createVehicle); //create vehicle
vehicleRoute.get("/", authMiddleware, vehicles); //vehicle of a user 
vehicleRoute.delete("/", authMiddleware,deleteVehicle); //delete a vehicle
vehicleRoute.put("/default",authMiddleware, defaultVehicle); //make vehicle default

export { vehicleRoute };
