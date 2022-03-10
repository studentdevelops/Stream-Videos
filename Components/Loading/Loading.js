
import styles from "./loading.module.css"
const Loading = () => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.lds_ripple}><div></div><div></div></div>
        </div>
    )
}

export default Loading;