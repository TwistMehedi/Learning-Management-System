import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useCategoriesQuery, useDeleteCourseMutation, useGetCourseQuery, useUpdateCourseMutation } from "../../redux/api/courses/courseApi";
import { useEffect } from "react";


const EditeCourse = () => {
  const { id } = useParams();
 
  const { data, isLoading, error } = useGetCourseQuery(id);
  const { data: categories } = useCategoriesQuery();
   const allCategory = categories?.categoris;
   const [updateCourse] = useUpdateCourseMutation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

   useEffect(() => {
    if (data?.course) {
      reset({
        title: data.course.title,
        description: data.course.description,
        category: data.course.category,
        level: data.course.level,
        price: data.course.price,
        status: data.course.status,
        image: data.course.image,
      });
    }
  }, [data, reset]);
  

 
const onSubmit = async (formValues) => {
  const formData = new FormData();

  formData.append("title", formValues.title);
  formData.append("description", formValues.description);
  formData.append("category", formValues.category);
  formData.append("level", formValues.level);
  formData.append("price", formValues.price);
  formData.append("status", formValues.status);

  
  if (formValues.image && formValues.image[0]) {
    formData.append("image", formValues.image[0]);
  };

  try {
    const res = await updateCourse({ id, formData });
     toast.success(res?.data?.message);
   } catch (err) {
    console.error(err)
    toast.error("Failed to update course");
  }
};

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full border rounded p-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows="4"
            className="w-full border rounded p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border rounded p-2"
          >
            <option value="">Select category</option>
            {allCategory.map((cat) => (
              <option key={cat._id} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

      
        <div>
          <label className="block text-sm font-medium">Level</label>
          <select
            {...register("level", { required: "Level is required" })}
            className="w-full border rounded p-2"
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            type="number"
            className="w-full border rounded p-2"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border rounded p-2"
          >
            <option value="">Select status</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium">Course Image</label>
          <input
          {...register("image")}
            type="file"
            accept="image/*"
            className="w-full"
          />
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditeCourse;
