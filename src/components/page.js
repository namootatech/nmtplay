import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Flame,
  Package,
  Download,
  AlertTriangle,
  ThumbsUp,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const placeholderUri = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3QeQLFXdN+D2NWdRy0hSSwEVDKiYE2IAI6KIOSEqRkyUioIZI+YcEHPCjDlnxYwJFHPCCOb41W/q663ec3tmZ/f+d+/u9TlV1vtyd+ZM9zNnun99zunTp9t9993/2ykECBAgQIAAAQJlAqcTsMosVUSAAAECBAgQmAgIWBoCAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBtZU4IY3vGH361//uvvqV7+6pp/rw+YTuNCFLtRd4xrX6I477rjuL3/5y3xvKnzVWc5ylm6fffbpPvvZz3Y///nPC2tWFQECBNZWQMBaW+//2U87z3nO0733ve/tznSmM00MfvGLX3Q3u9nN/mc91uOOP/axj134Tv773/92j3/847t3vvOda7apN77xjSefebrTnW7ymR/4wAe6Rz7ykWv2+T6IAAEClQIC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CBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgICApQ0QIECAAAECBIoFBKxiUNURIECAAAECBAQsbYAAAQIECBAgUCwgYBWDqo4AAQIECBAgIGBpAwQIECBAgACBYgEBqxhUdQQIECBAgAABAUsbIECAAAECBAgUCwhYxaCqI0CAAAECBAgIWNoAAQIECBAgQKBYQMAqBlUdAQIECBAgQEDA0gYIECBAgAABAsUCAlYxqOoIECBAgAABAgKWNkCAAAECBAgQKBYQsIpBVUeAAAECBAgQELC0AQIECBAgQIBAsYCAVQyqOgIECBAgQICAgKUNECBAgAABAgSKBQSsYlDVESBAgAABAgQELG2AAAECBAgQIFAsIGAVg6qOAAECBAgQICBgaQMECBAgQIAAgWIBAasYVHUECBAgQIAAAQFLGyBAgAABAgQIFAsIWMWgqiNAgAABAgQICFjaAAECBAgQIECgWEDAKgZVHQECBAgQIEBAwNIGCBAgQIAAAQLFAgJWMajqCBAgQIAAAQICljZAgAABAgQIECgWELCKQVVHgAABAgQIEBCwtAECBAgQIECAQLGAgFUMqjoCBAgQIECAgIClDRAgQIAAAQIEigUErGJQ1REgQIAAAQIEBCxtgAABAgQIECBQLCBgFYOqjgABAgQIECAgYGkDBAgQIECAAIFiAQGrGFR1BAgQIECAAAEBSxsgQIAAAQIECBQLCFjFoKojQIAAAQIECAhY2gABAgQIECBAoFhAwCoGVR0BAgQIECBAQMDSBggQIECAAAECxQICVjGo6ggQIECAAAECApY2QIAAAQIECBAoFhCwikFVR4AAAQIECBAQsLQBAgQIECBAgECxgIBVDKo6AgQIECBAgMD/AxxgZEyvxGduAAAAAElFTkSuQmCC`;
export const Table = ({ headers, data, loading }) => {
  return (
    <div className='overflow-x-autorounded-md shadow-xl'>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : (
        <table className='table-auto w-full border-collapse border border-gray-300 text-white rounded-md shadow-xl overflow-hidden bg-gray-600'>
          <thead>
            <tr className='bg-gray-100 rounded-md shadow-xl'>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className='border border-gray-300 px-4 py-2 text-left text-gray-700'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-600 hover:text-gray-800'
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='border border-gray-300 px-4 py-2 text-gray-200'
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className='border border-gray-300 px-20 py-8 text-center text-gray-400'
                >
                  Akukabikho files kule section mgutyuli, ndicebisa uloge in u
                  uploade ifile so that le tafile ibene items😀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const Pagination = ({
  currentPage,
  onNextPage,
  onPreviousPage,
  disableNext,
  disablePrevious,
}) => {
  return (
    <div className='flex items-center justify-between mt-4'>
      <button
        onClick={onPreviousPage}
        disabled={disablePrevious}
        className={`px-4 py-2 bg-gray-900 text-gray-200 rounded ${
          disablePrevious
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300'
        }`}
      >
        Previous
      </button>
      <span className='text-gray-700'>Page {currentPage}</span>
      <button
        onClick={onNextPage}
        disabled={disableNext}
        className={`px-4 py-2  bg-gradient-to-br from-fuchsia-600 to-yellow-400 text-gray-100 rounded ${
          disableNext
            ? 'bg-gray-900 opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};

const fileTypeMap = {
  // Documents
  'application/pdf': 'PDF Document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'Word Document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    'Excel Spreadsheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'PowerPoint Presentation',
  'application/msword': 'Word Document (Legacy)',
  'application/vnd.ms-excel': 'Excel Spreadsheet (Legacy)',
  'application/vnd.ms-powerpoint': 'PowerPoint Presentation (Legacy)',
  'text/plain': 'Text Document',
  'application/rtf': 'Rich Text Format',

  // Archives
  'application/zip': 'Zip Archive',
  'application/x-rar-compressed': 'RAR Archive',
  'application/x-7z-compressed': '7-Zip Archive',
  'application/x-tar': 'TAR Archive',
  'application/gzip': 'Gzip Archive',

  // Images
  'image/jpeg': 'JPEG Image',
  'image/png': 'PNG Image',
  'image/svg+xml': 'SVG Image',
  'image/gif': 'GIF Image',
  'image/webp': 'WebP Image',
  'image/tiff': 'TIFF Image',
  'image/bmp': 'BMP Image',

  // Audio
  'audio/mpeg': 'MP3 Audio',
  'audio/wav': 'WAV Audio',
  'audio/ogg': 'OGG Audio',
  'audio/aac': 'AAC Audio',
  'audio/flac': 'FLAC Audio',

  // Video
  'video/mp4': 'MP4 Video',
  'video/x-matroska': 'MKV Video',
  'video/quicktime': 'MOV Video',
  'video/x-msvideo': 'AVI Video',
  'video/webm': 'WebM Video',

  // Programming
  'text/html': 'HTML File',
  'text/css': 'CSS File',
  'application/javascript': 'JavaScript File',
  'application/json': 'JSON File',
  'text/xml': 'XML File',
  'application/x-python-code': 'Python File',
  'text/x-java-source': 'Java Source File',

  // Other
  'application/vnd.android.package-archive': 'Android Package (APK)',
  'application/x-msdownload': 'Windows Executable',
  'application/x-shockwave-flash': 'Flash File',
  'application/vnd.adobe.photoshop': 'Photoshop File',
  'application/x-font-ttf': 'TrueType Font',
  'application/x-font-otf': 'OpenType Font',
};

// File type to recommended application mapping
const fileOpenerMap = {
  'application/pdf': { name: 'PDF Viewer', link: '/type/pdf-viewer' },
  'application/zip': { name: 'Zip Extractor', link: '/type/zip-extractor' },
  'application/zip': { name: 'Zip Extractor', link: '/type/zip-extractor' },
  'application/x-rar-compressed': {
    name: 'Zip Extractor',
    link: '/type/zip-extractor',
  },
  'application/x-7z-compressed': {
    name: 'Zip Extractor',
    link: '/type/zip-extractor',
  },
  'application/x-tar': { name: 'Zip Extractor', link: '/type/zip-extractor' },
  'application/gzip': { name: 'Zip Extractor', link: '/type/zip-extractor' },
  'application/javascript': {
    name: 'Code Editor',
    link: '/type/code-editor',
  },
  'image/jpeg': { name: 'Image Viewer', link: '/type/image-viewer' },
  'audio/mpeg': { name: 'Audio Player', link: '/type/audio-player' },
  'application/vnd.android.package-archive': {
    name: 'Android App',
    link: '/type/android-system-software',
  },
  'application/x-msdownload': {
    name: 'Windows App',
    link: '/type/windows-system-software',
  },
  'video/mp4': { name: 'Video Player', link: '/type/video-player' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    name: 'Word Processor',
    link: '/type/word-processor',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    name: 'Spreadsheet Editor',
    link: '/type/spreadsheet-editor',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    name: 'Presentation Viewer',
    link: '/type/presentation-viewer',
  },
  'text/plain': {
    name: 'Text Editor',
    link: '/type/text-editor',
  },
  'application/rtf': {
    name: 'Rich Text Editor',
    link: '/type/rtf-editor',
  },
  'image/png': { name: 'Image Viewer', link: '/type/image-viewer' },
  'image/svg+xml': { name: 'Image Viewer', link: '/type/image-viewer' },
  'image/gif': { name: 'Image Viewer', link: '/type/image-viewer' },
  'image/webp': { name: 'WebP Viewer', link: '/type/webp-viewer' },
  'audio/wav': { name: 'Music Player', link: '/type/music-player' },
  'audio/ogg': { name: 'Music Player', link: '/type/music-player' },
  'audio/aac': { name: 'Music Player', link: '/type/music-player' },
  'audio/flac': { name: 'Music Player', link: '/type/music-player' },
  'video/x-matroska': { name: 'Video Player', link: '/type/video-player' },
  'video/quicktime': { name: 'Video Player', link: '/type/video-player' },
  'video/x-msvideo': { name: 'Video Player', link: '/type/avi-player' },
  'video/webm': { name: 'Video Player', link: '/type/Video-player' },
  'text/html': { name: 'Code Editor', link: '/type/code-editor' },
  'text/css': { name: 'Code Editor', link: '/type/code-editor' },
  'application/json': { name: 'Code Editor', link: '/type/code-editor' },
  'text/xml': { name: 'Code Editor', link: '/type/code-editor' },
  'application/x-python-code': {
    name: 'Code Editor',
    link: '/type/code-editor',
  },
  'text/x-java-source': { name: 'Code Editor', link: '/type/code-editor' },
  'application/vnd.adobe.photoshop': {
    name: 'Photoshop Viewer',
    link: '/type/photoshop-viewer',
  },
  'application/x-font-ttf': { name: 'Font Viewer', link: '/type/font-viewer' },
  'application/x-font-otf': { name: 'Font Viewer', link: '/type/font-viewer' },
};

// Function to convert bytes to human-readable format
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function MobileDownloads({
  items,
  handleDownload,
  handleReportVirus,
  handleLike,
  loading,
}) {
  const maxDownloads = Math.max(...items.map((item) => item.downloads));
  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-fuchsia-500 flex items-center justify-center'>
          Loading...
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-4xl'>
        <Package
          className='w-24 h-24 text-fuchsia-500 mb-4'
          aria-hidden='true'
        />
        <h2 className='text-2xl font-bold text-center mb-2'>
          Akhonto yo downloada kule section mgutyuli
        </h2>
        <p className='text-gray-300 text-center'>
          Ukuze kubekho izinto kule section bhalisa kule site then u uploade
          izinto for le section mtasekhaya
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Downloads</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {items.map((item) => (
            <Card
              key={item.id}
              className='flex bg-gray-700 flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative shadow-2xl shadow-gray-800 transition-all ease-in-out duration-300 
                cursor-pointer flex flex-col gap-4 bg-gray-900 p-4 h-full bg-gradient-to-br from-fuchsia-900
                  via-800 via-fuchsia-950 bg-gradient-to-t to-orange-950 border border-solid border-fuchsia-950 m-0 anim-bounce hover:bg-gradient-to-br 
                  hover:from-pink-800 hover:via-fuchsia-800 hover:to-fuchsia-950 hover:shadow-4xl 
                  hover:ease-in-out hover:my-0 hover:shadow-black hover:shadow-yl hover:scale-100 text-white'
            >
              {item.downloads === maxDownloads && (
                <div className='absolute text-2xl bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center  top-2 right-2 text-fuchsia-500 z-10'>
                  🔥
                </div>
              )}
              <div className='relative w-full h-40'>
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl || placeholderUri}
                    placeholder='blur'
                    blurDataURL={item.imageUrl || placeholderUri}
                    alt={item.name || 'No image available'}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-lg'
                  />
                )}
              </div>
              <CardHeader className='pb-2 text-white'>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow pb-2 text-white'>
                <p className='text-sm text-gray-200 mb-2'>{item.description}</p>
                <div className='flex flex-wrap gap-2 mb-2'>
                  <Link
                    href={`/category/${item.category.toLowerCase()}`}
                    passHref
                  >
                    <Badge
                      variant='secondary'
                      className='hover:bg-fuchsia-200 cursor-pointer transition-colors duration-200'
                    >
                      {item.category}
                    </Badge>
                  </Link>
                  <Link
                    href={`/type/${item.subCategory.toLowerCase()}`}
                    passHref
                  >
                    <Badge
                      variant='outline'
                      className='hover:bg-fuchsia-100 text-fuchsia-200 cursor-pointer transition-colors duration-200'
                    >
                      {item.subCategory}
                    </Badge>
                  </Link>
                </div>
                <p className='text-sm text-gray-300'>
                  ifakwe ngu{' '}
                  <Link
                    className='text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-yellow-400'
                    href={`/user-profile/{item.user?.gama}`}
                  >
                    @{item.user?.gama}
                  </Link>
                </p>
                <div className='mt-2'>
                  <div className='flex flex-wrap gap-1'>
                    {item.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tag/${tag.toLowerCase()}`}
                        passHref
                      >
                        <Badge
                          variant='secondary'
                          className='text-xs hover:bg-fuchsia-200 cursor-pointer transition-colors duration-200'
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className='mt-2 text-sm text-gray-300 font-semibold'>
                  <p>
                    {item.size && formatFileSize(item.size)}{' '}
                    {(item.type && fileTypeMap[item.type]) || item.type}
                  </p>
                </div>
                {fileOpenerMap[item.type] && (
                  <div className='mt-2 text-sm'>
                    <p>
                      <strong>Vula nge</strong>{' '}
                      <Link
                        href={fileOpenerMap[item.type].link}
                        className='text-fuchsia-400 hover:underline'
                      >
                        {fileOpenerMap[item.type].name}
                      </Link>
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className='flex flex-col gap-2 pt-2'>
                <div className='flex justify-between w-full text-sm text-gray-300'>
                  <span className='flex items-center gap-1'>
                    <Download size={16} />{' '}
                    {item.downloads.toLocaleString() || 0}
                  </span>
                  <span className='flex items-center gap-1'>
                    reports
                    <AlertTriangle size={16} /> {item.virusReports || 0}
                  </span>
                  <span className='flex items-center gap-1'>
                    <ThumbsUp size={16} /> {item.fileLikes || 0}
                  </span>
                </div>
                <div className='flex gap-2 w-full'>
                  <Button
                    onClick={() => handleDownload(item)}
                    className='flex-1 bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors duration-200'
                  >
                    <Download size={16} className='mr-2' /> Download
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleReportVirus(item)}
                        className='text-fuchsia-700 hover:text-fuchsia-800 hover:bg-fuchsia-100 transition-colors duration-200'
                      >
                        <AlertTriangle size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Report Virus</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleLike(item)}
                    className='text-fuchsia-700 hover:text-fuchsia-800 hover:bg-fuchsia-100 transition-colors duration-200'
                  >
                    <ThumbsUp size={16} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
