function formatDate(dateString: string): string {
  return new Date(Date.parse(dateString)).toLocaleString('HU-hu', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

export default formatDate
