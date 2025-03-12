import { RefObject, useState } from 'react';

export default function useDragAndDrop(fileRef: RefObject<HTMLInputElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (fileRef.current) {
      fileRef.current.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileRef.current.dispatchEvent(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return { handleDrop, handleDragOver, handleDragLeave, isDragging };
}
