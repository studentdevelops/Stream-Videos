import styles from "./Banner.module.css";
import Image from "next/image";

const Banner = ({ title, subTitle, img }) => {
  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${img})` }}>
      <div className={styles.leftCol}>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subTitle}>{subTitle}</h3>
        <button className={styles.btn}>
          {" "}
          <Image src={"/icons/play.svg"} height={20} width={20} />
          Play
        </button>
      </div>
    </div>
  );
};

export default Banner;
