import Layout from "@/components/layout/Layout";
import Banner3 from "@/components/sections/Banner3";
import Category from "@/components/sections/Category";
import DealProduct1 from "@/components/sections/DealProduct1";
import Product1 from "@/components/sections/Product1";
import Shop from "@/components/sections/Shop";
import Slider5 from "@/components/sections/Slider5";
import WhiteProduct from "@/components/sections/WhiteProduct";
export const metadata = {
  title: "Yaza Sneakers Shoes Products",
  description: "Ecommerce App",
};
export default function Home() {
  return (
    <>
      <Layout headerStyle={3} footerStyle={1}>
        <Category />
        <Banner3 />
        <Product1 />
        <Shop />
        <WhiteProduct />
      </Layout>
    </>
  );
}
