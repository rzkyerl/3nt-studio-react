import { useRef, useState } from 'react'
import { insert, setIfMissing, useClient } from 'sanity'

type Props = any

const createKey = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    : Math.random().toString(36).slice(2, 14)

export default function PortfolioMediaArrayInput(props: Props) {
  const { onChange, renderDefault } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const client = useClient({ apiVersion: '2023-05-03' })
  const [isUploading, setIsUploading] = useState(false)

  const handlePickFiles = () => {
    if (!isUploading) {
      inputRef.current?.click()
    }
  }

  const handleFilesSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return

    setIsUploading(true)
    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          const asset = await client.assets.upload('file', file, { filename: file.name })
          return {
            _key: createKey(),
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        })
      )

      if (uploads.length > 0) {
        onChange([setIfMissing([]), insert(uploads, 'after', [-1])])
      }
    } catch (error) {
      console.error('Failed to upload portfolio files:', error)
    } finally {
      setIsUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={handlePickFiles}
          disabled={isUploading}
          style={{
            padding: '8px 12px',
            border: '1px solid #5f5f5f',
            borderRadius: '6px',
            background: 'transparent',
            color: 'inherit',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            opacity: isUploading ? 0.7 : 1
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Many Files'}
        </button>
        <span style={{ fontSize: '12px', opacity: 0.75 }}>
        Select multiple photos/videos at once to add to the list.
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFilesSelected}
        style={{ display: 'none' }}
      />

      {renderDefault(props)}
    </div>
  )
}
