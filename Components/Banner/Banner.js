import styles from "./Banner.module.css";
import { useRouter } from 'next/router'
import Image from "next/image";

const Banner = ({ title, subTitle, img, videoId }) => {
  const router = useRouter();

  const handleOnClickPlay = () => {
    router.push(`/video/${videoId}`);
  }

  return (
    // <div className={styles.banner} style={{ backgroundImage: `url(${img})` }}>
    <div className={styles.banner} style={{
      backgroundImage:
        `linear-gradient(to right, rgb(0, 0, 0), rgba(255, 255, 255, 0.192)),
    url(${img});`
    }}>
      <div className={styles.leftCol}>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subTitle}>{subTitle}</h3>
        <button className={styles.btn} onClick={handleOnClickPlay}>
          {" "}
          <Image src={"/icons/play.svg"} height={20} width={20} />
          Play
        </button>
      </div>
    </div>
  );
};

export default Banner;
