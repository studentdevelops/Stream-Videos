import '../styles/globals.css'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loading from '../Components/Loading/Loading';
import { magic } from '../lib/magic-client';



function MyApp({ Component, pageProps }) {
  const [isLoading, SetIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const routing = async () => {
  //     if (!await magic.user.isLoggedIn()) {
  //       router.push('/login');
  //     } else {
  //       router.push("/")
  //     }
  //   }
  //   routing();
  // },[]);

  useEffect(() => {
    const handleComplete = () => {
      SetIsLoading(false);
    }
    router.events.on("routeChangeStart", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])


  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
