import RegisterForm from "../_components/RegisterForm";
import styles from "../page.module.scss";

const Page = () => {
    return (
        <main className={styles.page}>
            <RegisterForm />
        </main>
    );
}

export default Page;