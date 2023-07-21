import { ProductCard } from "./ProductCard"
import {products} from '../../data/products.js' 
import styles from "./style.module.css";


export const ProductsSection = ()=>{
    return(
        <>
            <section className={styles.products__section}>
                <h2 className="title2">Produtos em Destaque</h2>
                <ul className={styles.ul}>
                    {products.map(item =>{
                        return(
                            <ProductCard key={item.id} title={item.name} img={item.img} price={item.price}/>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}