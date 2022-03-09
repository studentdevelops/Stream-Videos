
import styles from "./loading.module.css"
const Loading = () => {
    return (
        <div className={styles.loadingScreen}>
            <div class={styles.lds_ripple}><div></div><div></div></div>
        </div>
    )
}

export default Loading;