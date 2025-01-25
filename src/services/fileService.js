import fs from 'fs';
import path from 'path';
import * as uuid from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class fileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + ".jpg"; // Генеруємо унікальне ім'я файлу
      const relativePath = path.join("static", fileName); // Відносний шлях до файлу
      const filePath = path.resolve(__dirname, "..", relativePath); // Повний шлях для збереження
      file.mv(filePath); // Переміщуємо файл у вказане місце
      return relativePath; // Повертаємо відносний шлях
    } catch (e) {
      console.log(e);
      throw new Error("Помилка під час збереження файлу");
    }
  }

  deleteFile(filePath) {
    try {
      const absolutePath = path.resolve(__dirname, "..", filePath); // Перетворюємо на абсолютний шлях
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath); // Видаляємо файл
      }
    } catch (e) {
      console.log(e);
      throw new Error("Помилка під час видалення файлу");
    }
  }
}

export default new fileService();
