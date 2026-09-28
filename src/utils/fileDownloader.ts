/**
 * Utility for triggering browser file downloads of tactical intelligence dossiers,
 * configurations, and archive bundles.
 */
export const downloadFile = (
  filename: string,
  content: string,
  mimeType: string = 'text/plain;charset=utf-8'
): void => {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1500);
  } catch (err) {
    console.error('Failed to trigger file download:', err);
  }
};
