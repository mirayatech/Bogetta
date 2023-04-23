import { SearchParamsTypes } from "@/types";
import formatPrice from "@/util/price-format";
import Image from "next/image";

export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    <div>
      <Image
        width={500}
        height={500}
        alt={searchParams.name}
        src={searchParams.image}
        className="object-cover"
      />
      <div>
        <h1>{searchParams.name}</h1>
        <p>{searchParams.description}</p>
        <span>{formatPrice(searchParams.unit_amount)}</span>
      </div>
    </div>
  );
}
