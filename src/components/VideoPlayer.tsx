export default function Html5Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      controls
      className="w-full rounded shadow aspect-video"
      preload="metadata">
      Your browser does not support the video tag.
    </video>
  )
}
