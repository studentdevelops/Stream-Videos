import Image from "next/image";
import Link from "next/link"
import styles from "./Card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ imgUrl, size = "medium", id, changeScale, shouldScale }) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const [defaultImg, SetDefaultImg] = useState(imgUrl);

  const onErrorHandle = (e) => {
    console.error("error");
    SetDefaultImg("/Static/defaultImage.jpg");
  };
  const scale = shouldScale ? (changeScale
    ? { scaleY: 1 }
    : { scale: 1}) 
    : ( changeScale
      ? { scaleY: 1.15 }
      : { scale: 1.1 })

  return (
    <Link href={`/video/${id}`}>
      <a>
        <div className={styles.container}>
          <div className={styles.imgMotionWrapper}>
            <motion.div
              whileHover={scale}
              whileTap={{ scale: 0.9 }}
              className={classMap[size]}
            >
              <Image
                className={styles.cardImg}
                src={defaultImg}
                alt={"Card Image"}
                onError={onErrorHandle}
                layout={"fill"}
              />
            </motion.div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
