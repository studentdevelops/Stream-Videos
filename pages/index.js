import Head from "next/head";
import Image from "next/image";
import Banner from "../Components/Banner/Banner";
import Card from "../Components/Card/Card";
import Nav from "../Components/Nav/Nav";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BingingWithMovie</title>
        <meta
          name="description"
          content="Watch Flixified movies &amp; TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
        />
        <meta
          content="Flixified, shows, animes, watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies India, watch TV online, no download, full length movies"
          name="keywords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav username={"sourav"} />
        <Banner
          title={"Smurfs"}
          subTitle={"Smurfing in Radiant"}
          img={"/static/banner.jpg"}
        />
        {/* <h2>BingingWithMovie</h2> */}
        <Card imgUrl={"/static/banner.jpg"} size="small" />
        <Card imgUrl={"/static/banner.jpg"} size="medium" />
        <Card imgUrl={"/static/banner.jpg"} size="large" />
      </main>
    </div>
  );
}
