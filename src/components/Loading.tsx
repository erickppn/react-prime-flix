import { CircleNotch } from 'phosphor-react';

interface LoadingProps {
  size?: number,
  styles?: string
}
 
export function Loading({ size, styles }: LoadingProps) {
  return (
    <CircleNotch 
      size={size || 24} 
      className={`animate-spin ${styles}`} 
      weight='bold'
    />
  )
}