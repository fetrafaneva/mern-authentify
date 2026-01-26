import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  // 401 – Non authentifié
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé. Veuillez vous connecter.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 401 – Token invalide
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Token invalide ou expiré. Veuillez vous reconnecter.",
      });
    }

    // Stocker l'id utilisateur dans req
    req.userId = decoded.id;

    next();
  } catch (error) {
    // Gestion précise des erreurs JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expirée. Veuillez vous reconnecter.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token invalide.",
      });
    }

    // 500 – Erreur serveur
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur.",
    });
  }
};

export default userAuth;
