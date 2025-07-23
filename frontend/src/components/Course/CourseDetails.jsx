import React from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { useGetCourseQuery } from "../../redux/api/courses/courseApi";
import FreeLessons from "./FreeLessons";
import {loadStripe} from '@stripe/stripe-js';
import { useAddPaymentMutation } from "../../redux/api/payment/paymentApi";
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";


const CourseDetails = () => {
  const { id } = useParams();
  // console.log(id);
  // const {user} = useSelector((state)=> state.user);
  // const dat = (user?.user)
  const { data, isLoading, isError } = useGetCourseQuery(id);
  const [addPayment] = useAddPaymentMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.course) return <div>Course not found.</div>;

  const course = data.course;

const makePayment = async () => {
  const stripe = await loadStripe('pk_test_51RE7tiAo2zdTrEmE0JD43j1ttLSgMUc2waBwm6X9pHwfoNC7bsf5Hy84OFZF8Y0jbKdlxVKG8K9VIw7WnoLKD0sq00KZZgHFyv');

  try {
    const res = await addPayment({ course }); // ✅ wrap it properly
    const sessionId = res?.data?.id;
    console.log(res);
      
    if (!sessionId) throw new Error("You alredy purchase this course");

    await stripe.redirectToCheckout({ sessionId }); // ✅
  } catch (error) {
      const message = error?.data?.message || error?.error || error.message || "Payment failed";
    toast.error(message);
    console.error("Payment error:", error);
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="mb-6">
        <img
          src={course.thumbnail?.secure_url}
          alt={course.title}
          className="rounded-lg  max-h-[400px] object-cover"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p>
            <strong>Category:</strong> {course.category}
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {course.price === 0 ? "Free" : `৳${course.price}`}
          </p>
          <p>
            <strong>Average Rating:</strong> {course.averageRating}{" "}
            <FaStar className="inline text-yellow-400" />
          </p>
          <p>
            <strong>Status:</strong> {course.status}
          </p>
          <p>
            <strong>Published:</strong> {course.isPublished ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <p>
            <strong>Total Students:</strong>{" "}
            {course.studentsEnrolled?.length || 0}
          </p>
          <p>
            <strong>Total Lessons:</strong> {course.lessons?.length || 0}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(course.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(course.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <div className="flex justify-between">
        <div>
          <FreeLessons courseId={course._id} />
        </div>
        <div className="p-4 border h-[200px] rounded shadow w-full max-w-sm">
             <h3 className="text-lg font-semibold mb-2">Purchase Summary</h3>
          <p>
            <strong>Price:</strong>{" "}
            {course.price === 0 ? "Free" : `৳${course.price}`}
          </p>

          <p>
            <strong>Total:</strong>{" "}
            {`৳${course.price}`}
          </p>
         
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={course.price === 0}
            onClick={makePayment}
          >
            Buy Now
          </button>
           </div>
        
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {course.comments?.length > 0 ? (
          <ul className="list-disc list-inside">
            {course.comments.map((c, idx) => (
              <li key={idx}>{c.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
