import styles from '../styles/Login.module.css';
import Image from "next/image";
import { useRouter } from 'next/router'
import { useState } from 'react';
import { magic } from '../lib/magic-client';
import { useEffect } from 'react';

const login = () => {


  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [userMsg, SetUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const properEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  useEffect(async () => {
    console.log(await magic.user.isLoggedIn())
  }, [])


  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }
    router.events.on("routeChangeStart", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }


  }, [router])




  const handleSignInSubmit = async (e) => {

    e.preventDefault();
    if (email) {
      setIsLoading(true);
      if (email.match(properEmail)) {
        try {
          const token = await magic.auth.loginWithMagicLink({ email });
          const response = fetch('/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
          })
          // console.log(token)
          // send this info over api or let it get fetched in the backend via token
          // console.log(await magic.user.getMetadata(token))
          if (token) {
            router.push('/')
          }

        } catch (err) {
          console.error("error logging in")
        }
      } else {
        SetUserMsg("Something Went Wrong Logging in");
      }
    } else {
      SetUserMsg("Enter A valid Email Address");
    }
  }
  const handleOnChangeEmail = (e) => {
    const mail = e.target.value;
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