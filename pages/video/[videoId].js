import { useRouter } from 'next/router'
import styles from '../../styles/Video.module.css';
import Modal from 'react-modal';
import classNames from 'classnames';

const videoId = () => {
  Modal.setAppElement('#__next');
  const router = useRouter()
  const { videoId } = router.query

  const video = {
    title: "Doggo",
    publishTime: '123:321',
    description: "tutututut tarara",
    channelTitle: "Netflix",
    viewCount: 100
  }

  const { title, publishTime, description, channelTitle, viewCount } = video;
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
            frameborder="0"></iframe>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}></p>
              <p className={styles.title}></p>
              <p className={styles.description}></p>
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