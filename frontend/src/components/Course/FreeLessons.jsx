import React, { useState } from 'react';
import { useFreeLessonsQuery } from '../../redux/api/lessons/lessonApi';

const FreeLessons = ({courseId}) => {

  const [showLessons, setShowLessons] = useState(false);
  const { data, isLoading, error } = useFreeLessonsQuery(courseId);
  const freeLessons = data?.lessons;

  const toggleLessons = () => {
    setShowLessons(!showLessons);
  };

  if (isLoading) return <p>Loading free lessons...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Free Lessons</h2>

      <button
        onClick={toggleLessons}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showLessons ? 'Hide Lessons' : 'Show Lessons'}
      </button>

      {showLessons && (
        <div className="space-y-4 mt-4">
          {freeLessons?.length > 0 ? (
            freeLessons.map((lesson, index) => (
               <>
               {index}
               <div
                key={lesson._id}
                className="p-4 border rounded-xl shadow-md space-y-2 bg-white"
              >
                <h3 className="text-xl font-semibold">{lesson.title}</h3>

                <video
                  src={lesson.videoUrl.secure_url}
                  controls
                  className="w-full rounded-md"
                />

                <p className="text-sm text-gray-500">
                  Course ID: {lesson.course}
                </p>
              </div>
               </>
            ))
          ) : (
            <p>No free lessons found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FreeLessons;
