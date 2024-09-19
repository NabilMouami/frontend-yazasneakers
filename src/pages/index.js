import Layout from "@/components/layout/Layout";
import Banner3 from "@/components/sections/Banner3";
import Product1 from "@/components/sections/Product1";
import Shop from "@/components/sections/Shop";
import WhiteProduct from "@/components/sections/WhiteProduct";
export const metadata = {
  title: "Yaza Sneakers Shoes Products",
  description: "Ecommerce App",
};
export default function Home() {
  return (
    <>
      <Layout headerStyle={3} footerStyle={1}>
        <Banner3 />
        <Product1 />
        <Shop />
        <WhiteProduct />
      </Layout>
    </>
  );
}
