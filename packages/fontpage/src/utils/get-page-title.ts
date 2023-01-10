const title = 'WEB空间'

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
