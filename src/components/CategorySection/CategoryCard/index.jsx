import styles from "./style.module.css";

export const CategoryCard = ({title, img})=>{
    return(
        <>
            <li className={styles.li}>
                <img className={styles.categories__img} src={img} alt={title} />
                <h3 className="title3">{title}</h3>
            </li>
        </>
    )
}