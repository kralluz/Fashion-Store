import {categories} from '../../data/categories.js';
import { CategoryCard } from "./CategoryCard";
import styles from "./style.module.css";


export const CategorySection = ()=>{
    return(
        <>
        <section className={styles.category__section}>
            <h2 className="title2">CATEGORIAS</h2>
            <div className={styles.list}>
                <ul className={styles.ul}>
                {categories.map(item =>{
                    return(
                        <CategoryCard key={item.id} title={item.name} img={item.img}/> 
                    )
                })}
                </ul>
            </div>
        </section>
        </>
    )
}