import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const typedEntries = <T extends object>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][];
