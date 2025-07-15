
const TryCatch = (controllerFn) => {

  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
       next(err); // Pass the error to the next middleware
      console.error("Error in TryCatch:", err.message);
    }
  };
};
export default TryCatch;