import { ProductType } from "@/types";
import formatPrice from "@/util/price-format";
import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.scss";
export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  return (
    <Link
      className={styles.card}
      href={{
        pathname: `/products/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          width={600}
          height={600}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{formatPrice(unit_amount)}</span>
      </div>
    </Link>
  );
}
