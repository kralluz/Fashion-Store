import bannerImg from '../../assets/bannerImg.jpg'
import styles from "./style.module.css";

export const BannerSection = () => {
    return (
        <>
            <div className={styles.banner__container}>
                <div className={styles.bannerImg__container}>
                <img className={styles.banner__img} src={bannerImg} alt="Imagem publicitária da marca Fashion Store" />
                </div>
                <div className={styles.banner__content}>
                    <div>
                        <h1 className='title1'>Fashion Store</h1>
                        <p className='paragraph'>Fique por dentro das nossas últimas promoções e novidades</p>
                    </div>
                    <a className={styles.button} href="#">CONFIRA AS OFERTAS</a>
                </div>
            </div>
        </>
    )
}