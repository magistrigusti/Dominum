
import { RESOURCE_CONFIG } from "@/constants/resources";
import { useUser } from "@/contexts/UserContext";
import styles from "./ResourcesBar.module.css";

export const ResourcesBar = () => {
  const { state } = useUser();

  if (!state.address) return <div>Загрузка...</div>;

  return (
    <div className={styles.resource_bar}>
      {RESOURCE_CONFIG.map((res) => (
        <div className={styles.resource_item} key={res.key}>
          <img className={styles.resource_img} src={res.icon} alt={res.label} />
          <span>{state[res.key] ?? 0}</span>
        </div>
      ))}
    </div>
  );
};
