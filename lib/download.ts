/**
 * Shared download utility for InviteHub.
 * Supports PNG (via html2canvas) and PDF (via jsPDF + html2canvas).
 * Always call with a mounted DOM element.
 */

export type DownloadFormat = 'png' | 'pdf';

export async function downloadInvitation(
  elementId: string,
  filename: string,
  format: DownloadFormat = 'png'
): Promise<void> {
  const el = document.getElementById(elementId);
  if (!el) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  const html2canvas = (await import('html2canvas')).default;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  if (format === 'png') {
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return;
  }

  if (format === 'pdf') {
    const { jsPDF } = await import('jspdf');
    const imgData = canvas.toDataURL('image/png');

    // Card dimensions at 2x scale
    const pxW = canvas.width;
    const pxH = canvas.height;
    const ratio = pxH / pxW;

    // Use A5 portrait (148mm x 210mm) as it suits invitation cards nicely
    const pdfW = 148;
    const pdfH = Math.min(pdfW * ratio, 297); // cap at A4 height

    const pdf = new jsPDF({
      orientation: ratio > 1 ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfW, pdfH],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
    pdf.save(`${filename}.pdf`);
  }
}
