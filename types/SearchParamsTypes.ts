export type ParamsType = {
  id: string;
};

export type SearchParamsType = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  description: string | null;
};

export type SearchParamsTypes = {
  params: ParamsType;
  searchParams: SearchParamsType;
};
