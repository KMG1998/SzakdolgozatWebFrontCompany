function formatDate(dateString: string): string {
  return new Date(Date.parse(dateString)).toLocaleString('hu-HU')
}

export default formatDate
