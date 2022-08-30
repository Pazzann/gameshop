import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {IProduct} from "../types";
import {Item} from "../components/Item/Item";
import { axiosClassic } from "../api/__";
import {Filter} from "../components/Filter/Filter";

type Props = {
  items: IProduct[];
};
const Home: NextPage<Props> = ({items}) => {
  return <div className={styles.container}>
    <Filter />
    <div className={styles.items}>
      {items.map((item) => (
        <Item key={item.code} item={item} />
      ))}
    </div>
  </div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data: items} = await axiosClassic.get("/products");
  return { 
    props: {
      items: [...items, ...items, ...items, ...items]
    },
    revalidate: 60
  };
};

export default Home;
