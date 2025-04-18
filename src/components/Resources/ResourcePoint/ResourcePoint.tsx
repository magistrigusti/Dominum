// 📄 components/Resources/ResourcePoint.tsx
import styles from './ResourcePoint.module.css';

interface Props {
  icon: string;
  x: number;
  y: number;
  onClick: () => void;
}

export const ResourcePoint = ({ icon, x, y, onClick }: Props) => {
  return (
    <img
      src={icon}
      className={styles.resource_point}
      alt="resource"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={onClick}
    />
  );
};
