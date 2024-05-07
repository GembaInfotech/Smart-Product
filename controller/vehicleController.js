import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";
const createVehicle = async (req, res) => {
  const { id } = req.user;

  const { name, num, type } = req.body;
  console.log(req.body)
  try {
    // console.log(name, num, type, id )
    const data = await User.findById(id);
   

    if (!data) {
      return res.status(404).json({ message: "End user not found" });
    }
    console.log(req.body)
   data.vehicle.push({
      name,
      num,
      type,
    });
    await data.save();
    console.log("here")
    res.status(201).json({ message: "Vehicle added successfully", data:data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const vehicles = async (req, res) => {
  const { id } = req.user;
  // console.log(req.user)
  try {
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).json({ message: "End user not found" });
    }
    const vehicles = data.vehicle;
    res.status(200).json({ data:vehicles });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteVehicle = async (req, res) => {
  const { id } = req.user; 
  const{ vid } =req.query;
  try {
    const data = await User.findByIdAndUpdate(
      {_id: id }, 
      { $pull: { vehicle: { _id: vid } } }, 
      { new: true } 
    );
    if (!data) {
      
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const defaultVehicle = async (req, res) => {
  const {vehicleId} =req.query
  const { def}=req.body;
   try {
     console.log(req.body  )
     const { id } = req.user;
     const user = await User.findById(id);
     
     if (!user) {
       throw new Error('User not found');
     }
     
     if (def) {
       const hasDefaultVehicle = user.vehicle.some(vehicle => vehicle.def);
       if (hasDefaultVehicle) {
         // Clear the default status from the existing default vehicle
         const existingDefaultVehicle = user.vehicle.find(vehicle => vehicle.def);
         existingDefaultVehicle.def = false;
       }
     }
     
     const vehicle = user.vehicle.id(vehicleId);
     if (!vehicle) {
       throw new Error('Vehicle not found');
     }
     
     vehicle.def = def;
     
     await user.save();
     res.status(200).json({ message: "Vehicle status updated successfully" });
   } catch (error) {
     res.status(500).json({ error: "Internal Server Error" });
   }
 };




const getVehicle = asyncHandler(async (req, res) => {
  try {
    // Start a MongoDB session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;

      // Find the vehicle document within the transaction
      const vehicle = await Vehicle.findById(id).session(session);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      if (!vehicle) {
        // If vehicle not found, return 404 Not Found
        return res.status(404).json({ error: "Vehicle not found" });
      }

      res.json({ data: vehicle });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const getAllVehicle = asyncHandler(async (req, res) => {
  try {
    // Start a MongoDB session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find all vehicles belonging to the user within the transaction
      const vehicles = await Vehicle.find({ owner: req.user._id }).session(session);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.json({ data: vehicles });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




export {
  getAllVehicle,
  createVehicle,
  getVehicle,
  
  vehicles,
 defaultVehicle,
  deleteVehicle,
};
