export function formatCurrency(value: number, currency: string = 'SGD', locale: string = 'en-SG'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    // Fallback for environments without Intl support
    return `S$${Math.round(value).toLocaleString()}`;
  }
}

export function formatNumber(value: number, locale: string = 'en-SG'): string {
  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch {
    return value.toString();
  }
}
