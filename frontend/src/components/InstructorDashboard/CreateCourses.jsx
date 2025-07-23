import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useCreateCourseMutation } from "../../redux/api/courses/courseApi";

const CreateCourses = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createCourse,{isLoading}] = useCreateCourseMutation();
 
  const onSubmit = async (data) => {
    try {
      
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("level", data.level);
      formData.append("image", data.image[0]);

      const res = await createCourse(formData).unwrap();
      toast.success(res?.message || "Course created successfully!");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create course");
    }
  };

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-5"
>
  <div>
    <label className="block text-gray-700 font-medium mb-1">Title</label>
    <input
      {...register("title", { required: "Title is required" })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter course title"
    />
    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
  </div>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Description</label>
    <textarea
      {...register("description", { required: "Description is required" })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter course description"
    />
    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
  </div>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Category</label>
    <select
      {...register("category", { required: "Category is required" })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select Category</option>
      <option value="javascript">Javascript</option>
      <option value="python">Python</option>
      <option value="nodejs">Node-Js</option>
      <option value="php">Php</option>
      <option value="c++">C++</option>
      <option value="java">Java</option>
      <option value="kotlin">Kotlin</option>
      <option value="golang">Go-Lang</option>
    </select>
    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
  </div>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Price</label>
    <input
      type="number"
      {...register("price", { required: "Price is required" })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter course price"
    />
    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
  </div>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Level</label>
    <select
      {...register("level", { required: "Level is required" })}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select Level</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
    {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
  </div>

  <div>
    <label className="block text-gray-700 font-medium mb-1">Image</label>
    <input
      type="file"
      {...register("image", { required: "Image is required" })}
      accept="image/*"
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
  >
     {isLoading ? "Creating": "Create"}
  </button>
</form>

  );
};

export default CreateCourses;
