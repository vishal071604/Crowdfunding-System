export const adminMiddleware = (req, res, next) => {
  try {

    // check user role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only",
      });
    }

    // allow access
    next();

  } catch (error) {

    return res.status(500).json({
      message: "Server Error",
    });
  }
};