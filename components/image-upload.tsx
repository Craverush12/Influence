'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<string>
  placeholder?: string
  aspectRatio?: 'square' | 'cover'
}

export default function ImageUpload({
  onImageUpload,
  placeholder = 'Click to upload or drag and drop',
  aspectRatio = 'square',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setUploading(true)
    setError('')

    try {
      await onImageUpload(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview('')
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.[0]) {
      handleFile(files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files?.[0]) {
      handleFile(files[0])
    }
  }

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className={`relative ${aspectClass} rounded-xl overflow-hidden border border-slate-700 bg-slate-900`}>
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setPreview('')}
            disabled={uploading}
            className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
            </div>
          )}
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`${aspectClass} rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center ${
            dragActive
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
          }`}
        >
          <Upload className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-300">{placeholder}</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  )
}
