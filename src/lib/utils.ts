import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: string = 'MGA'): string {
  return new Intl.NumberFormat('fr-MG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
