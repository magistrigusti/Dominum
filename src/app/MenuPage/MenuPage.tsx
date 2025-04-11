// import { useRouter } from "next/router";
// import styles from "./MenuPage.module.css";
// import { DOMHeader } from "../../components/Headers/DOMHeader";

// export const MenuPage = () => {
//   const router = useRouter();

//   const goTo = (path: string) => () => router.push(path);

//   return (
//     <div className={styles.memu_containte}>
//       <DOMHeader />

//       <h2 className={styles.menu_title}>
//         Welcome to the <br />
//         crypto space <br />
//         Dominum <br />
//         which is the entrance <br />
//         to the crypto meta universe Allodium
//       </h2>

//       <div className={styles.icon_grid}>
//         <img
//           src="/icons/iconsDominum.png"
//           alt="Dominum"
//           className={styles.icon}
//           onClick={goTo("/dominum")}
//         />
//         <img
//           src="/icons/iconsMercatus.png"
//           alt="mercatus"
//           className={styles.icon}
//           onClick={goTo("/mercatus")}
//         />
//         <img
//           src="/icons/iconsMagisterium.png"
//           alt="Magisterium"
//           className={styles.icon}
//           onClick={goTo("/magisterium")}
//         />
//         <img
//           src="/icons/iconsPortale.png"
//           alt="Portal"
//           className={styles.icon}
//           onClick={goTo("/portal")}
//         />
//       </div>
//     </div>
//   );
// };

