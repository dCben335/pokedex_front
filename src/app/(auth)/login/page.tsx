import LoginForm from "../_components/LoginForm";
import styles from "../page.module.scss";

const Page = () => {
    return (
        <main className={styles.page}>
            <LoginForm />
        </main>
    );
}

export default Page;