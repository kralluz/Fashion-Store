import { NewsLetterForm } from "./NewsLetterForm"
import styles from "./style.module.css";


export const NewsLetterSection = ()=>{
    return(
        <section className={styles.newsLetter__section}>
            <h2 className="title2">INSCREVA-SE NA NEWSLETTER</h2>
            <NewsLetterForm/>
        </section>
    )
}