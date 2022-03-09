import { useRouter } from 'next/router'
import styles from '../../styles/Video.module.css';
import Modal from 'react-modal';
import classNames from 'classnames';
import { getVideoById } from '../../lib/videos';

export async function getStaticProps({ params }) {
  const video = await getVideoById(params.videoId);
  return {
    props: {
      video,
    },
    revalidate: 90,
  }
}


export async function getStaticPaths() {
  const videosList = ["-FZ-pPFAjYY", "ahZFCF--uRY", "-FmWuCgJmxo", "fb5ELWi-ekk", "aWzlQ2N6qqg", "eHp3MbsCbMg"]

  const paths = videosList.map((videoId) => ({
    params: { videoId },
  }))
  return { paths, fallback: 'blocking' }
}


const videoId = ({ video }) => {
  Modal.setAppElement('#__next');
  const router = useRouter()
  const { videoId } = router.query
  const { title, publishTime, description, channelTitle, statistics:{viewCount} } = video[0];
  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch Video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div>
          <iframe id="ytplayer" type="text/html" width="100%" height="360"
            className={styles.videoPlayer}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
            frameBorder="0"></iframe>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.channelTitle}>Cast: </span>
                <span className={styles.textColor}>{channelTitle}</span>
              </p>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.channelTitle}>View Count: </span>
                <span className={styles.textColor}>{viewCount}</span>
              </p>

            </div>
          </div>

        </div>
      </Modal>
    </div>
  )
}

export default videoId