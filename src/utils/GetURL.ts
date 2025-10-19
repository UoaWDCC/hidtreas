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
    // Do nothing
  }
  if (process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL) {
    return process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL
  }
  return ''
}
