export const formatDate = (d: Date): string => {
  const [fmtDay, fmtMonth, fmtYear] = [
    d.getDay().toString().padStart(2, '0'),
    new Intl.DateTimeFormat('us', { month: 'short' }).format(d),
    d.getFullYear(),
  ]
  return `${fmtMonth} ${fmtDay}, ${fmtYear}`
}
