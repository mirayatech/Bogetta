import formatPrice from "@/util/price-format";
import { ProductType } from "@/util/types";
import Image from "next/image";
function Product({ name, image, price }: ProductType) {
  return (
    <div>
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="w-full object-cover"
      />
      <div className="flex flex-col mt-2 font-medium text-lg">
        <span className="text-dark">{name}</span>
        <span className="text-primary">{formatPrice(price)}</span>
      </div>
    </div>
  );
}

export default Product;
