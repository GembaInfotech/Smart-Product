import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const bookingRoute = express.Router();
import {
  createABooking,
  fetchingOnQuery,
  updationOfStatus,
  updationOfTime,
  getBooking,
  bookings,
  createPaymentLink,
} from "../controller/bookingController.js";

bookingRoute.post("/",authMiddleware,  createABooking);    //create booking
bookingRoute.get("/", authMiddleware,  bookings);          //user bookings
bookingRoute.get("/get", authMiddleware,  getBooking);     //get booking by id 
bookingRoute.put("/status/:bookingId", updationOfStatus);  //status update
bookingRoute.put("/time/:bookingId", updationOfTime);       //booking update
bookingRoute.post("/payments/:id", createPaymentLink);      //payment-process
bookingRoute.get("/fetch", fetchingOnQuery);      

export { bookingRoute };
