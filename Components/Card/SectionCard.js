import styles from "./SectionCard.module.css";
import Card from "./Card";
import cls from "classnames";

const SectionCard = ({ title = "Disney", videos = [], size, shouldScale=false }) => {
  const Cards = videos?.map((data,i) => {
    return (
      <Card changeScale={i==0 || i==videos.length-1} title={title} imgUrl={data.imgUrl} size={size} id={data.id} key={data.id} shouldScale={shouldScale}/>
    );
  });
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldScale && styles.wrap)}>{Cards}</div>
    </section>
  );
};

export default SectionCard;
