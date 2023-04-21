import Image from "next/image";
type ProductProps = {
  name: string;
  price: number | null;
  image: string;
};

function Product({ name, image, price }: ProductProps) {
  return (
    <div>
      <Image src={image} alt={name} width={100} height={100} />
      <span>{name}</span>
      <span>{price}&euro;</span>
    </div>
  );
}

export default Product;
