import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Item.module.scss";
import { IProduct } from "../../types";
import { axiosClassic } from "../../api/__";

type Props = {
  item: IProduct;
};
const Home: NextPage<Props> = ({ item }) => {
  return <div className={styles.container}></div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id;
  const { data: item } = await axiosClassic.get("/products/" + id);
  return {
    props: {
      item,
    },
    revalidate: 60,
  };
};
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
    ],
    fallback: "blocking",
  };
};
export default Home;
