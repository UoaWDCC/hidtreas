const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const getClientSideURL = () => {
  try {
    if (!canUseDOM) {
      const { protocol, host, port } = window.location
      return `${protocol}//${host}${port ? `:${port}` : ''}`
    }
  } catch (e) {
    if (process.env.PAYLOAD_SERVER_URL) {
      return process.env.PAYLOAD_SERVER_URL
    }
    return ''
  }
}
