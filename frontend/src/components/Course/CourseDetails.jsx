import React from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { useGetCourseQuery } from "../../redux/api/courses/courseApi";
import FreeLessons from "./FreeLessons";

const CourseDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError } = useGetCourseQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.course) return <div>Course not found.</div>;

  const course = data.course;

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
          {course.discount && course.price !== 0 && (
            <p>
              <strong>Discount:</strong> {course.discount}% off
            </p>
          )}
          {course.price !== 0 && (
            <p>
              <strong>Total:</strong> ৳
              {(
                course.price -
                (course.price * (course.discount || 0)) / 100
              ).toFixed(2)}
            </p>
          )}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={course.price === 0}
            onClick={() => alert("Buy feature coming soon")}
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
