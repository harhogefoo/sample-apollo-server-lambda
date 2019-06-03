export const getUserId = ({ headers }) => {
  const userId = headers['X-User-Id']
  return userId || ''
}
