import {
  metadataFamilia,
  PaginaFamilia,
  type ParamsFamilia,
} from "@/components/catalogo-familia";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) => metadataFamilia("equipos", searchParams);

export default function Catalogo({
  searchParams,
}: {
  searchParams: ParamsFamilia;
}) {
  return <PaginaFamilia familia="equipos" searchParams={searchParams} />;
}
