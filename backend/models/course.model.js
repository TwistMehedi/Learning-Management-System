import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    price: { type: Number, default: 0 },
    thumbnail: { 
      public_id: String,
      secure_url: String,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "advanced"],
      default: "Beginner",
    },
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 10000 },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    status:{
      type: String,
      enum: ["active", "pending"],
      default: "pending"
    },
    duration: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
