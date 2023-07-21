import styles from "./style.module.css";

export const NewsLetterForm = ()=>{
    return(
        <>
            <form className={styles.NewsLetter__Form}>
                <input className={styles.input__email} type="email" placeholder="E-MAIL" />
                <button className={styles.input__submit} type="submit">CADASTRAR-SE</button>
            </form>
        </>
    )
}