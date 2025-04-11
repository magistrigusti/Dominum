import { ResourcesBar } from "@/components/Resources/ResourcesBar";
import { useUser } from "../context/UserContext";
import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";
import { FoodBonus } from "@/components/Resources/ResourcesBonus/FoodBonus";

export const DominumPage = () => {
  const { state } = useUser();
  
  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        <ResourcesBar />
      </div>

      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
        <FoodBonus /> {/* 👈 бонусная еда */}
      </div>

      <DOMFooter />
    </div>
  );
};
