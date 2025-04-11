import { useUser } from "../../context/UserContext";
import { useState } from "react";
import Link from "next/link";
import styles from "./ProfileEditor.module.css";

export const ProfileEditor = () => {
  const { state, dispatch } = useUser();
  const [name, setName] = useState(state.name || "Capitan");
  const [avatar, setAvatar] = useState(state.avatar || "/icons/user-icon.png");
  const [preview, setPreview] = useState(state.avatar || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatar(base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: state.address, name, avatar }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      dispatch({ type: "SET_USER", payload: updatedUser });
    }
  };

  return (
    <div style={{ padding: 16, border: '1px solid gray', borderRadius: 8 }}>
      <h3>Редактирование профиля</h3>

      <label>
        Имя:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          style={{ display: "block", marginBottom: 10 }}
        />
      </label>

      <label>
        Аватар:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      {preview && (
        <div style={{ margin: "10px 0" }}>
          <img src={preview} alt="Превью" width={100} />
        </div>
      )}

      <button onClick={saveProfile}>Сохранить</button>

      <div style={{ alignSelf: 'flex-start' }}>
        <Link className={styles.user_link} href="/">
          <img className={styles.back_button} src="/button/backButton.jpg" alt="" />
        </Link>
      </div>
    </div>
  );
};
