import { ProductType } from "@/types";
import { formatPrice } from "@/util/price-format";
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
      className="flex flex-col items-center justify-center hover:opacity-80 ease duration-150"
      href={{
        pathname: `/products/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="m-w-[400px]">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-auto object-cover"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-center mt-[-100px]">
        <span className="text-xl pb-2">{name}</span>
        <span className="text-base text-textColor">
          {formatPrice(unit_amount)}
        </span>
      </div>
    </Link>
  );
}
