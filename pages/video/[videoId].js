import { useRouter } from 'next/router'
import styles from '../../styles/Video.module.css';
import Modal from 'react-modal';
import classNames from 'classnames';
import { getYoutubeVideoById } from '../../lib/videos';
import Nav from '../../Components/Nav/Nav';
import LikeButton from '../../Components/Icons/LikeButton';
import DisLikeButton from '../../Components/Icons/DisLikeButton';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export async function getStaticProps({ params }) {
  const videoArray = await getYoutubeVideoById(params.videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 600, // seconds
  }
}


export async function getStaticPaths() {
  const videosList = ["-FZ-pPFAjYY", "ahZFCF--uRY", "-FmWuCgJmxo", "fb5ELWi-ekk", "aWzlQ2N6qqg", "eHp3MbsCbMg"]

  const paths = videosList.map((videoId) => ({
    params: { videoId },
  }))
  return { paths, fallback: 'blocking' }
}


const VideoId = ({ video }) => {
  Modal.setAppElement('#__next');
  const router = useRouter();
  const { videoId } = router.query;

  const { title, publishTime, description, channelTitle, statistics: { viewCount } } = video;

  const [toggleLike, SetToggleLike] = useState(false);
  const [toggleDisLike, SetToggleDisLike] = useState(false);

  const updateDb = async (favorite = null) => {
    const response = await fetch('/api/stats', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        VideoId: `${videoId}`,
        Favorite: favorite,
        watched: true
      })
    })
    return await response.json()
  }


  useEffect(() => {
    const PageLoadUp = async () => {
      const response = await fetch(`/api/stats?VideoId=${videoId}`)
      const result = await response.json()
      if (result.length > 0) {
        const { Favorited } = result[0];
        if (Favorited === 1) {
          SetToggleLike(true);
          SetToggleDisLike(false);
        } else if (Favorited === 0) {
          SetToggleLike(false);
          SetToggleDisLike(true);
        }
      } else {
        const creating = await fetch('/api/stats', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ VideoId: videoId })
        })
      }
    }
    PageLoadUp();
  })

  const HandleToggleLike = (e) => {
    const favorite = !toggleLike ? 1 : null
    SetToggleLike(!toggleLike)
    SetToggleDisLike(false);
    updateDb(favorite)
  }

  const HandleToggleDislike = (e) => {
    const favorite = !toggleDisLike ? 0 : null
    SetToggleDisLike(!toggleDisLike)
    SetToggleLike(false);
    updateDb(favorite)

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>
          {title}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" key="ogdesc" content={description} />
        <meta property="og:image" content={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} key="ogimage" />
      </Head>
      <Nav />
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
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={HandleToggleLike}>
              <div className={styles.btnWrapper}>
                <LikeButton selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={HandleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLikeButton selected={toggleDisLike} />
            </div>
          </button>
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

export default VideoId