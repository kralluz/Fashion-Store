import Image from 'next/image';
import styles from './ProductCarousel.module.css';

export default function ProductCarousel({ title, products }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.carousel}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <Image src={p.image} alt={p.name} width={200} height={200} />
            <p>{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
