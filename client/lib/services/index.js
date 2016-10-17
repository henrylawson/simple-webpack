export const getConfig = () => fetch(
  '/config',
  {
    method: 'GET'
  }
)
