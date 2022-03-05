import styles from '../styles/Login.module.css';
import Image from "next/image";
import { useState } from 'react';

const login = () => {

  const [email, SetEmail] = useState("");

  const handleSignInSubmit = (e) => {
    console.log(email)
  }
  const handleOnChangeEmail = (e) => {
    SetEmail(e.target.value);
  }
  return (
    <div className={styles.container}>
      <header>
        <ul className={styles.navbar}>
          <li className={styles.navItem}>
            <Image src={"/logo.svg"} width={"40"} height={"40"} />
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          {/* <p className={styles.userMsg}>{userMsg}</p> */}
          <button onClick={handleSignInSubmit} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  )
}

export default login