import AddCart from "@/app/components/AddCart/AddCart";
import { SearchParamsTypes } from "@/types";
import Image from "next/image";

import styles from "./styles.module.scss";
import formatPrice from "@/util/price-format";

export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    <div className={styles.container}>
      <Image
        width={500}
        height={500}
        alt={searchParams.name}
        src={searchParams.image}
      />
      <div className={styles.info}>
        <h1 className={styles.name}>
          <span className={styles.logoName}>Bottega</span>
          {searchParams.name}
        </h1>
        <span className={styles.price}>
          {formatPrice(searchParams.unit_amount)}
        </span>
        <p className={styles.description}>{searchParams.description}</p>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
