import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { useAllCourseByInstructorQuery } from '../../redux/api/courses/courseApi'

const InstructorCourses = () => {
  const { data, isLoading, error } = useAllCourseByInstructorQuery()
  // const [deleteCourse] = useDeleteCourseMutation()
  const navigate = useNavigate()

  // const handleDelete = async (id) => {
  //   const confirm = window.confirm("Are you sure you want to delete this course?")
  //   if (!confirm) return

  //   try {
  //     const res = await deleteCourse(id).unwrap()
  //     toast.success(res?.message || "Course deleted successfully")
  //   } catch (err) {
  //     toast.error("Failed to delete course")
  //   }
  // }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Something went wrong!</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Level</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.courses?.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">{course.category}</td>
                <td className="py-2 px-4 border-b capitalize">{course.level}</td>
                <td className="py-2 px-4 border-b">${course.price}</td>
                <td className="py-2 px-4 border-b text-green-600 font-medium">
                  {course.status || 'Draft'}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
                <td className="flex py-2 px-4 ">
                  <button
                    // onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDelete(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InstructorCourses
