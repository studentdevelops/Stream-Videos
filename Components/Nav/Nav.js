import styles from "./Nav.module.css";
import Image from "next/image";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { magic } from "../../lib/magic-client";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const [email, SetEmail] = useState("login")
  const [showDropdown, setShowDropdown] = useState(false);
  const [didToken, setDidToken] = useState("");
  const router = useRouter();
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/history");
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.log("Error Logging Out")
    }
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchingMeta = async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata();
        if (email) {
          SetEmail(email);
        }
      } catch (err) {
        console.error("")
      }
    }
    fetchingMeta();
  }, [])


  return (
    <ul className={styles.navbar}>
      <li className={styles.navItem}>
        <Image src={"/logo.svg"} width={"40"} height={"40"} alt={"Website Logo"} />
      </li>
      <li className={styles.navItem}><Link href={"/"}><a>Home</a></Link></li>
      <li className={styles.navItem}> <button className={styles.navButtons} onClick={handleOnClickMyList}> History </button></li>
      <li className={classNames(styles.navItem, styles.push)}><button className={styles.usernameBtn} onClick={handleShowDropdown}>
        <p className={styles.username}>{email}</p>
        <Image
          src={showDropdown ? "/icons/ExpandLess.svg" : "/icons/ExpandMore.svg"}
          alt="Expand dropdown"
          width="24px"
          height="24px"
        />
      </button>{showDropdown && (
        <div className={styles.navDropdown}>
          <div>
            <a className={styles.linkName} onClick={handleSignout}>
              Sign out
            </a>
            <div className={styles.lineWrapper}></div>
          </div>
        </div>
      )}</li>

    </ul>
  );
};

export default Nav;
