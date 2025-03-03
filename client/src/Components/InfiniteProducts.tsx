import { forwardRef, ReactNode } from "react";
import { SpinnerInBox } from "./SpinnerInBox";
import { ErrorBox } from "./ErrorBox";
import { InfiniteDiv } from "../Util/InfiniteDiv";

interface InfiniteProductsProps {
  data: unknown;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  renderFn: (page: any) => unknown;
  container?: React.ComponentType<{ children: ReactNode }>;
}

/**
 * InfiniteProducts komponenta za prikaz neskončnega seznama izdelkov.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {unknown} props.data - Podatki za prikaz.
 * @param {boolean} props.isLoading - Ali se podatki nalagajo.
 * @param {unknown} props.error - Napaka, če je prišlo do nje.
 * @param {boolean} props.isFetching - Ali se dodatni podatki nalagajo.
 * @param {function} props.renderFn - Funkcija za prikaz posamezne strani podatkov.
 * @param {React.ComponentType<{ children: ReactNode }>} [props.container] - Komponenta za ovijanje vsebine.
 * @param {React.ForwardedRef<HTMLDivElement>} ref - Referenca za neskončni div.
 * @returns {JSX.Element} - JSX element neskončnega seznama izdelkov.
 *
 * @example
 * // Uporaba komponente
 * <InfiniteProducts
 * data={data}
 * isLoading={isLoading}
 * error={error}
 * isFetching={isFetching}
 * renderFn={(page) => page.items.map((item) => <ProductCard key={item.id} {...item} />)}
 * container={Row}
 * ref={ref}
 * />
 */
export const InfiniteProducts = forwardRef<
  HTMLDivElement,
  InfiniteProductsProps
>(({ data, isLoading, isFetching, error, renderFn, container }, ref) => {
  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  const Container = container
    ? container
    : ({ children }: { children: ReactNode[] | ReactNode | string }) => (
        <>{children}</>
      );

  if (!isLoading && !error && !data?.pages?.length) return null;

  return (
    <>
      <Container>
        {!isLoading && !error && data?.pages && data?.pages?.map(renderFn)}
      </Container>
      {isFetching && <SpinnerInBox fullPage={false} />}
      <InfiniteDiv ref={ref}></InfiniteDiv>
    </>
  );
});
