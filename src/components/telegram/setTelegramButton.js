import axios from 'axios';

// Вставь сюда токен своего бота от BotFather
const TOKEN = "7522646269:AAEzq9qtrh7crGr6Z0pvKdEvcUKEZ11nkLA";

// Функция для установки кнопки
async function setMenuButton() {
  const url = `https://api.telegram.org/bot${TOKEN}/setChatMenuButton`;

  const data = {
    menu_button: {
      type: "web_app",
      text: "🚀 Запустить Dominum",
      web_app: {
        url: "https://dominum.vercel.app"
      }
    }
  };

  try {
    const response = await axios.post(url, data);
    console.log("✅ Успешно установлено:", response.data);
  } catch (error) {
    console.error("❌ Ошибка:", error.response?.data || error.message);
  }
}

setMenuButton();
