import {
  metadataFamilia,
  PaginaFamilia,
  type ParamsFamilia,
} from "@/components/catalogo-familia";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) => metadataFamilia("insumos", searchParams);

export default function Insumos({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) {
  return <PaginaFamilia familia="insumos" searchParams={searchParams} />;
}
