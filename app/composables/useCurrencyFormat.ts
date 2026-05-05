export function useCurrencyFormat() {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  function format(value: number): string {
    return formatter.format(value);
  }

  return { format };
}
