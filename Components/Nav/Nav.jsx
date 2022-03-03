import styles from "./Nav.module.css";
import Image from "next/image";
import classNames from "classnames";

const Nav = ({ username }) => {
  return (
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Image src={"/logo.svg"} width={"30"} height={"15"} />
      </li>
      <li className={styles.navItem}>Home</li>
      <li className={styles.navItem}>List Shows</li>
      <li className={classNames(styles.navItem, styles.push)}>{username}</li>
    </ul>
  );
};

export default Nav;
