import Head from "next/head";
import Banner from "../Components/Banner/Banner";
import SectionCard from "../Components/Card/SectionCard";
import Nav from "../Components/Nav/Nav";
import { getVideos, getWatchItAgain } from "../lib/videos";
import styles from "../styles/Home.module.css";
import { UseRedirectUser } from "../util/redirectUser";

export async function getServerSideProps({ req }) {

  const DisneyVideos = await getVideos("Disney Trailer");
  const Travel = await getVideos("Travel");
  const AnimeTrailer = await getVideos("Anime Trailer");
  const Marvel = await getVideos("Marvel Trailer");
  const DC = await getVideos("DC Trailer");
  const Music = await getVideos("Indie Music");
  const Productivity = await getVideos("Productivity");

  const { token, userId } = await UseRedirectUser(req);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const watchAgain = await getWatchItAgain(userId, token) || [];

  return {
    props: { DisneyVideos, Travel, AnimeTrailer, Marvel, DC, watchAgain, Music, Productivity },
  };
}

export default function Home({
  DisneyVideos,
  Travel,
  AnimeTrailer,
  Marvel,
  DC,
  watchAgain,
  Music,
  Productivity
}) {
  // const VideoURL = ["-FZ-pPFAjYY", "ahZFCF--uRY", "-FmWuCgJmxo", "fb5ELWi-ekk", "aWzlQ2N6qqg", "eHp3MbsCbMg"]
  // const BannerList = [

  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[0]}/maxresdefault.jpg`, videoId: "-FZ-pPFAjYY" },
  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[1]}/maxresdefault.jpg`, videoId: "ahZFCF--uRY" },
  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[2]}/maxresdefault.jpg`, videoId: "-FmWuCgJmxo" },
  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[3]}/maxresdefault.jpg`, videoId: "fb5ELWi-ekk" },
  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[4]}/maxresdefault.jpg`, videoId: "aWzlQ2N6qqg" },
  //   { titile: "", subTitile: "", img: `https://i.ytimg.com/vi/${VideoURL[5]}/maxresdefault.jpg`, videoId: "eHp3MbsCbMg" }
  // ]

  return (
    <div>
      <Head>
        <title>Binging</title>
        <meta
          name="description"
          content="Watch Binging movies &amp; TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          content="Binging, shows, animes, watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies India, watch TV online, no download, full length movies"
          name="keywords"
        />
        {/* <meta property="og:image" content={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} key="ogimage" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Banner
        title={"Uncharted"}
        subTitle={
          "Treasure hunter Victor 'Sully' Sullivan recruits street-smart Nathan Drake to help him recover a 500-year-old lost fortune amassed by explorer Ferdinand Magellan."
        }
        img={"/Static/uncharted.webp"}
        videoId={"eHp3MbsCbMg"}
      />
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Anime"} videos={AnimeTrailer} size={"large"} shouldScale={false} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Marvel"} videos={Marvel} size={"medium"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"DC"} videos={DC} size={"medium"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Disney"} videos={DisneyVideos} size={"medium"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Travel"} videos={Travel} size={"small"} />
      </div>
      {
        watchAgain?.length > 0 &&
        (
          <div className={styles.sectionWrapper}>
            <SectionCard title={"Watch Again"} videos={watchAgain} size={"small"} />
          </div>
        )
      }
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Indie Music"} videos={Music} size={"small"} />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Productivity"} videos={Productivity} size={"small"} />
      </div>
    </div>
  );
}
