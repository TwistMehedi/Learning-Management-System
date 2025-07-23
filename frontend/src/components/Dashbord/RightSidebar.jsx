const RightSidebar = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Results</h2>

      {/* Example Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded-lg border">
          <h3 className="text-lg font-medium">Course 1</h3>
          <p>Score: 85%</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg border">
          <h3 className="text-lg font-medium">Course 2</h3>
          <p>Score: 92%</p>
        </div>
        {/* Add more result cards as needed */}
      </div>
    </div>
  );
};

export default RightSidebar;
