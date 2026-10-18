import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://lohithakopanathi:882005@cluster0.3uwt7wu.mongodb.net/Food-Delivery?retryWrites=true&w=majority'
    );
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
};
