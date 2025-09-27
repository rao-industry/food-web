import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // 1. Get token from request headers
  const { token } = req.headers;

  // 2. Check if token exists
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    // 3. Verify the token using JWT secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Add user ID to request body
    req.body = { ...req.body, userId: token_decode.id };

    // 5. Move to next middleware/controller
    next();
  } catch (error) {
    console.log(error);
    // 6. Handle invalid/expired tokens
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;