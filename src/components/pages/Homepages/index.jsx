import styles from "./style.module.css";
import { BannerSection } from "../../BannerSection"
import { CategorySection } from "../../CategorySection"
import { HeaderComponent } from "../../HeaderComponent"
import { NewsLetterSection } from "../../NewsLestterSection"
import { ProductsSection } from "../../ProductsSection"
import { FooterComponent } from "../../FooterComponent";

export const HomePages = () => {
    return (
        <>
            <header>
            <HeaderComponent/>
            </header>
            <main>
                <BannerSection />
                <CategorySection />
                <ProductsSection />
                <NewsLetterSection />
            </main>
            <footer>
                <FooterComponent/>
            </footer>
        </>
    )
}