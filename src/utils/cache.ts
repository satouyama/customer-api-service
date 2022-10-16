export const setCachePrefix = (key: string, prefix: string) => {
  return `${prefix}:${key}`
}