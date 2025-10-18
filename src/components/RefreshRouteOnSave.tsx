'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const getClientSideURL = () => {
  if (!canUseDOM) {
    const { protocol, host, port } = window?.location
    return `${protocol}//${host}${port ? `:${port}` : ''}`
  }

  if (process.env.PAYLOAD_SERVER_URL) {
    return process.env.PAYLOAD_SERVER_URL
  }

  return 'http://localhost:3000'
}
