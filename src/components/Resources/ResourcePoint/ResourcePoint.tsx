// 📄 components/Resources/ResourcePoint.tsx
'use clent';

import styles from './ResourcePoint.module.css';

interface Props {
  icon: string;
  x: number;
  y: number;
  onClick: () => void;
}

export const ResourcePoint = ({icon, x, y, onClick}: Props) => {
  return (
    <div className={styles.point} 
      style={{top: `${y}px`, left: `${x}px`}}
      onClick={onClick}
    >
      <img src={icon} alt="reource" />
    </div>
  )
}