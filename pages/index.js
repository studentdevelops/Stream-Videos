import Head from "next/head";
import Image from "next/image";
import Banner from "../Components/Banner/Banner";
import Card from "../Components/Card/Card";
import SectionCard from "../Components/Card/SectionCard";
import Nav from "../Components/Nav/Nav";
import styles from "../styles/Home.module.css";


export default function Home() {
  console.log({Data})
  const video = [
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
    {
      imgUrl: "/static/banner.jpg",
    },
  ];
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

      <Nav username={"sourav"} />
      <Banner
        title={"Smurfs"}
        subTitle={"Smurfing in Radiant"}
        img={"/static/banner.jpg"}
      />
      {/* <h2>BingingWithMovie</h2> */}
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Disney"} videos={video} size={"large"}/>
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Anime"} videos={video} size={"medium"}/>
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Action"} videos={video} size={"small"}/>
      </div>
    </div>
  );
}
