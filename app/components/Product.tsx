import { ProductType } from "@/types";
import formatPrice from "@/util/price-format";
import Image from "next/image";
import Link from "next/link";

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
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="w-full object-cover"
      />
      <div className="flex flex-col mt-2 font-medium text-lg">
        <span className="text-dark">{name}</span>
        <span className="text-primary">{formatPrice(unit_amount)}</span>
      </div>
    </Link>
  );
}
