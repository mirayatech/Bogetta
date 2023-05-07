import { SearchParamsTypes } from "@/types";
import Image from "next/image";

import AddCart from "@/app/components/addCart";
import { formatPrice } from "@/util/price-format";

export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    <div className="flex flex-col justify-center relative w-full m-auto max-w-[500px]">
      <Image
        width={500}
        height={500}
        alt={searchParams.name}
        src={searchParams.image}
        priority={true}
        className="w-auto"
      />
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-lg">
          <span className="line-through uppercase font-bold pr-1.5">
            Bottega
          </span>
          {searchParams.name}
        </h1>
        <span>{formatPrice(searchParams.unit_amount)}</span>
        <p className="text-textColor">{searchParams.description}</p>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
