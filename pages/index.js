import Head from "next/head";
import Banner from "../Components/Banner/Banner";
import SectionCard from "../Components/Card/SectionCard";
import Nav from "../Components/Nav/Nav";
import { getVideos, getPopular } from "../lib/videos";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const DisneyVideos = await getVideos("Disney Trailer");
  const Travel = await getVideos("Travel");
  const AnimeTrailer = await getVideos("Anime Trailer");
  const Popular = await getPopular();
  return {
    props: { DisneyVideos, Travel, AnimeTrailer, Popular },
  };
}

export default function Home({ DisneyVideos, Travel, AnimeTrailer, Popular }) {
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
        <SectionCard title={"Disney"} videos={DisneyVideos} size={"large"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Anime"} videos={AnimeTrailer} size={"medium"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Travel"} videos={Travel} size={"medium"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Popular"} videos={Popular} size={"small"} />
      </div>
    </div>
  );
}
