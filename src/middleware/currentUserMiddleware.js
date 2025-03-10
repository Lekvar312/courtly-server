import jwt from 'jsonwebtoken';

const currentUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Якщо токен передається через заголовок Authorization

  if (!token) {
    return res.status(401).json({ message: 'Не авторизовано' });
  }

  try {
    // Перевірка токена і отримання інформації про користувача
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY); // Використовуємо секретний ключ для перевірки
    req.user = decoded; // Зберігаємо інформацію про користувача в req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Не авторизовано', error: error.message });
  }
};

export default currentUserMiddleware
