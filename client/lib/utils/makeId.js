export default function makeId(prefix) {
  const min = 1
  const max = 100000
  const randomInt = Math.floor(Math.random() * (max - min)) + min
  return `${prefix}-${randomInt}`
}
