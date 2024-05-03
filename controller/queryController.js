import nodemailer from "nodemailer";
import { BusinessQueries } from "../models/query.js";

const sayHello = async (req, res) => {
  try {
    res.json({ data: "fgvhbjn" });
  } catch (err) {
    res.json(err);
  }
};

const handleQuery = async (req, res) => {
  try {
    console.log("hello");
    const { name, mail, mob, message } = req.body.values;
    console.log(req.body);

    const newQuery = new BusinessQueries({ name, mail, mob, message });
    await newQuery.save();

    // const emailMessage = `Hello ${name},\n\nThank you for your message regarding "${message}". Our team will contact you very soon.\n\nBest regards,\nThe Team`;

    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "ayushguptass14@gmail.com",
    //     pass: "uvzmczkdrlbhqqak",
    //   },
    // });

    // await transporter.sendMail({
    //   from: "ayushguptass14@gmail.com",
    //   to: mail,
    //   subject: "Response to Your Query",
    //   text: emailMessage,
    // });

    res
      .status(200)
      .json({ message: "User details saved " });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { handleQuery, sayHello };