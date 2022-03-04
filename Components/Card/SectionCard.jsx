import styles from "./SectionCard.module.css";
import Card from "./Card";

const SectionCard = ({ title = "Disney", videos, size }) => {
  const Cards = videos.map((data, i) => {
    return (
      <Card title={title} imgUrl={data.imgUrl} size={size} id={i} key={i} />
    );
  });
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>{Cards}</div>
    </section>
  );
};

export default SectionCard;
