
import styles from "./loading.module.css"

const Loading = () => {
    return (
        <div className={styles.loadingScreen}>
        <div className={styles.lds_hourglass}></div>
        </div>

    )
}

export default Loading;