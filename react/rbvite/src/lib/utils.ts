import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// twMerge -> 겹치는 css 속성 정의에 대해서 우선순위를 정해준다.