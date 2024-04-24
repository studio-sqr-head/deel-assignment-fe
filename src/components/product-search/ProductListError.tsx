export const ProductListError = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  return (
    <div>
      <h3>Oops! Something went wrong.</h3>
      <p>{errorMessage ?? "Try again later"}</p>
    </div>
  );
};
