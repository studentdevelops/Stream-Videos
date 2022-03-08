import styles from '../styles/Login.module.css';
import Image from "next/image";
import { useRouter } from 'next/router'
import { useState } from 'react';

const login = () => {
  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [userMsg, SetUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInSubmit = (e) => {

    e.preventDefault();
    if (email) {
      // setIsLoading(true);
      // console.log(isLoading);
      if (email = "sok1921@gmail.com") {
        SetUserMsg("");
        router.push('/')
      } else {
        SetUserMsg("Something Went Wrong Logging in");
      }
    } else {
      SetUserMsg("Enter A valid Email Address");
    }
    // setIsLoading(false);
  }
  const handleOnChangeEmail = (e) => {
    const mail = e.target.value;
    const properEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mail.match(properEmail)) {
      SetUserMsg("");
      SetEmail(e.target.value);
    } else {
      SetUserMsg("Enter A valid Email Address");
    }
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
          <h1 className={styles.signInHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            required
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleSignInSubmit} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  )
}

export default login