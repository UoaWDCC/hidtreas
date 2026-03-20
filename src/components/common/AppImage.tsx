import NextImage, { type ImageProps } from 'next/image'

function shouldBypassOptimization(src: ImageProps['src']) {
  if (typeof src !== 'string') return false

  return (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/media/') ||
    src.startsWith('/api/media/')
  )
}

export default function AppImage(props: ImageProps) {
  const { src, unoptimized, ...rest } = props

  return (
    <NextImage
      {...rest}
      src={src}
      unoptimized={unoptimized ?? shouldBypassOptimization(src)}
    />
  )
}
