import Link from "next/link";
import styles from "./DOMFooter.module.css";

export const DOMFooter = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_header_wrapper}>
        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/lordButton.jpg" alt="" />
        </Link>

        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/herosButton.jpg" alt="" />
        </Link>

        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/inventoriButton.jpg" alt="" />
        </Link>

        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/cityButton.jpg" alt="" />
        </Link>

        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/allodsButton.jpg" alt="" />
        </Link>

        <Link className={styles.footer_link} href="/">
          <img className={styles.footer_img_button} src="/button/mineButton.jpg" alt="" />
        </Link>
      </div>
    </div>
  );
};
