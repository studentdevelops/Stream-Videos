import Image from "next/image";
import styles from "./Card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ imgUrl, size = "medium" }) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const [defaultImg, SetDefaultImg] = useState(imgUrl);

  const onErrorHandle = (e) => {
    console.log("error");
    SetDefaultImg("/static/defaultImage.jpg");
    // set default Image
  };
  // useEffect(() => {}, [defaultImg]);
  return (
    <div className={styles.container}>
      <h3>Card</h3>
      <div className={(styles.imgMotionWrapper)}>
        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
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
  );
};

export default Card;
