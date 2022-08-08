export default function convertFirebaseTime(a) {
  const time = new Date(a?.seconds * 1000 + a?.nanoseconds / 1000000)
  return time
}
