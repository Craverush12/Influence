import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadAreaProps {
  onClose: () => void
}

export function FileUploadArea({ onClose }: FileUploadAreaProps) {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Attach Files
        </h4>
        <button onClick={onClose} className="p-1 hover:bg-accent rounded">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="text-center py-8">
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-3">
          Drag and drop files here or click to browse
        </p>
        <Button variant="outline" size="sm">
          Choose Files
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Max file size: 100MB. Supports video, image, and document files.
        </p>
      </div>
    </div>
  )
}
