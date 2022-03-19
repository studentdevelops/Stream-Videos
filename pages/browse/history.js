import Head from "next/head"
import SectionCard from "../../Components/Card/SectionCard"
import Nav from "../../Components/Nav/Nav"
import { getWatchItAgain } from "../../lib/videos";
import { UseRedirectUser } from "../../util/redirectUser";
import styles from '../../styles/History.module.css'

export async function getServerSideProps({ req }) {

    const { token, userId } = await UseRedirectUser(req);
    const history = await getWatchItAgain(userId, token);

    return {
        props: { history },
    };
}

const History = ({ history }) => {

    return (
        <div>
            <Head>
                <title>History</title>
            </Head>
            <Nav />
            <main className={styles.main}>
                <div className={styles.sectionWrapper}>
                    <SectionCard
                        title="History"
                        videos={history}
                        size="small"
                        shouldScale={true}
                    />
                </div>
            </main>
        </div>
    )
}

export default History
