export function formatAmount(amount: number | null | undefined): string {
    if (amount == null) return "-";
    return amount.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}