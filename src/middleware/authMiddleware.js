import tokenService from "../services/tokenService.js";


export default  function (req, res, next)  {
  try{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
      return next (res.status(400).json({message: "Користувач не авторизований"}))
    }
    const accessToken = authorizationHeader.split(" ")[1]
    if(!accessToken) {
      return next (res.status(400).json({message: "Користувач не авторизований"}))
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if(!userData) {
      return next (res.status(400).json({message: "Користувач не авторизований"}))
    }

    if (userData.role !== 'admin') {
      return next(res.status(403).json({ message: "Доступ заборонено" }));
    }

    req.user = userData
    next()

  }catch(e) {
    return next(res.status(400).json(e.message))
  }
}