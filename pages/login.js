import styles from '../styles/Login.module.css';
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import { useState } from 'react';
import { magic } from '../lib/magic-client';
import { useEffect } from 'react';

const Login = () => {


  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [userMsg, SetUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const properEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router])




  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      SetUserMsg("");
      if (email.match(properEmail)) {
        try {
          const didToken = await magic.auth.loginWithMagicLink({ email });
          const response = await fetch('/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${didToken}`
            },
          })
          const { msg } = await response.json()
          if (msg) {
            router.push('/')
          }
          else {
            setIsLoading(false);
            SetUserMsg("Something Went Wrong while Logging In")
          }

        } catch (err) {
          setIsLoading(false);
          console.error("error logging in")
        }
      } else {
        setIsLoading(false);
        SetUserMsg("Something Went Wrong Logging in");
      }
    } else {
      setIsLoading(false);
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
      <Head>
        <title>Binging | Login</title>
        <meta
          name="description"
          content="Login into Binging, watch movies &amp; TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          content="Binging, shows, animes, watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies India, watch TV online, no download, full length movies"
          name="keywords"
        />
        {/* <meta property="og:image" content={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} key="ogimage" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <ul className={styles.navbar}>
          <li className={styles.navItem}>
            <Image src={"/logo.svg"} width={"40"} height={"40"} alt="website Logo" />
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

export default Login