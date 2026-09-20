// const jwt = require('jsonwebtoken');
// const User = require('../Model/User');

// /**
//  * Verifies the JWT sent in "Authorization: Bearer <token>".
//  * On success the authenticated user is attached to req.user.
//  */
// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || '';

//     if (!authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, no token provided',
//       });
//     }

//     const token = authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, no token provided',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Load the user so a deleted account cannot keep using an old token.
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, user no longer exists',
//       });
//     }

//     req.user = { id: String(user._id), name: user.name, email: user.email };
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized, token is invalid or expired',
//     });
//   }
// };

// module.exports =  protect ;

const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get actual user from MongoDB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // This is important
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;
