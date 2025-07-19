
import TryCatch from './../utils/TryCatch.js';
import User from './../models/user.model.js';
import { ErrorHandler } from './../utils/ErrorHandler.js';


export const getUser = TryCatch(async(req, res, next)=>{

    const user = await User.findById(req.user._id);
    // console.log(user);
    if(!user) return next(new ErrorHandler("User not found", 401));
    res.status(200).json({
        message: "User fetch successfull",
        success: true,
        user
    })
});