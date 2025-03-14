import { fileDownload } from '@/apis/clientActions/s3';

export const useTodoFileDownload = () => {
  const handleClickFileDownload = async (filePath: string) => {
    try {
      if (!filePath) return;

      const todofileUrl = await fileDownload(filePath);

      const response = await fetch(todofileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filePath.split('/').pop() || 'file';
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('파일 다운로드 중 오류 발생:', err);
    }
  };
  return handleClickFileDownload;
};
