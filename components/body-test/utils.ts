export function getColorClass(color: string, variant: 'bg' | 'light' | 'text' | 'border' = 'bg') {
  const colors: Record<string, Record<string, string>> = {
    purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
    blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
    green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
    yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
    orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
    red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
  };
  return colors[color]?.[variant] || colors.purple[variant];
}

export function getScaleColor(value: number) {
  const colors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-lime-500',
    5: 'bg-green-500'
  };
  return colors[value] || 'bg-gray-500';
}
