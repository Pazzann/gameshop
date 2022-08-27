import { FC, memo, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Item.module.scss";
import { getPlatformIcon } from "../../utils/format";
import { IProduct } from "../../types";
import Link from "next/link";
type ItemProps = {
  item: IProduct;
};

export const Item: FC<ItemProps> = memo(({ item }) => {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    (async () => {
      if (item.imageIds.length > 0) {
        setPreview(
          item.imageIds[0].includes("http")
            ? item.imageIds[0]
            : `http://localhost:3001/api/images/assets/${item.imageIds[0]}`
        );
      }
    })();
  }, [item]);
  return (
    <Link href={`/products/${item.code}`}>
      <a className={styles.wrapper}>
        <div className={styles.item}>
          {preview != "" && (
            <img src={preview} width={270} height={270} alt={item.title} />
          )}
          <div className={styles.field}>
            <div className={styles.field__title}>Name</div>
            <div className={styles.field__value}>{item.title}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.field__title}>Description</div>
            <div className={styles.field__value}>{item.description}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.field__title}>Platforms</div>
            <div className={styles.field__value}>
              {item.platforms.map((platform) => {
                return (
                  <Image
                    src={getPlatformIcon(platform)}
                    width={20}
                    height={20}
                    alt={platform}
                    key={platform}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.field__title}>Rating</div>
            <div className={styles.field__value}>{item.rating || 0} / 5</div>
          </div>
          <div className={styles.field}>
            <div className={styles.field__title}>Reviews</div>
            <div className={styles.field__value}>
              {item.reviews.length || 0}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
});
