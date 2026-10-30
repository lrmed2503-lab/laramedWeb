import {
  metadataFamilia,
  PaginaFamilia,
  type ParamsFamilia,
} from "@/components/catalogo-familia";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) => metadataFamilia("repuestos", searchParams);

export default function Repuestos({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) {
  return <PaginaFamilia familia="repuestos" searchParams={searchParams} />;
}
