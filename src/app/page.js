import styles from './page.module.css';
import ProductCarousel from '../components/ProductCarousel';
import { hoodies, tshirts, pants, shoes } from '../data/products';

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductCarousel title="Moletons" products={hoodies} />
      <ProductCarousel title="Camisetas" products={tshirts} />
      <ProductCarousel title="Calças" products={pants} />
      <ProductCarousel title="Sapatos" products={shoes} />
    </main>
  );
}
