import fs from 'fs';
import path from 'path';
import * as uuid from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class fileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + ".jpg"; 
      const relativePath = path.join("static", fileName); 
      const filePath = path.resolve(__dirname, "..", relativePath);
      file.mv(filePath); 
      return relativePath;
    } catch (e) {
      console.log(e);
      throw new Error("Помилка під час збереження файлу");
    }
  }

  deleteFile(filePath) {
    try {
      const absolutePath = path.resolve(__dirname, "..", filePath); 
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Помилка під час видалення файлу");
    }
  }
}

export default new fileService();
