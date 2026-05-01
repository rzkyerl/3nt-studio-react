import { jsPDF } from 'jspdf';

interface BookingData {
  name: string;
  phone: string;
  address: string;
  date: string;
  package: string;
  notes: string;
}

export const generateBookingPDF = (data: BookingData): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('3NT STUDIO', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Booking Reservation Confirmation', pageWidth / 2, 28, { align: 'center' });
  
  doc.setLineWidth(0.5);
  doc.line(20, 35, pageWidth - 20, 35);
  
  // Booking Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Booking Details', 20, 45);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const startY = 55;
  const lineHeight = 10;
  
  const details = [
    { label: 'Full Name:', value: data.name },
    { label: 'Phone Number:', value: data.phone },
    { label: 'Event Address:', value: data.address || '-' },
    { label: 'Booking Date:', value: data.date },
    { label: 'Package:', value: data.package || 'Custom Request' },
  ];
  
  details.forEach((item, index) => {
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 20, startY + (index * lineHeight));
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, 60, startY + (index * lineHeight));
  });
  
  // Notes Section
  if (data.notes) {
    const notesY = startY + (details.length * lineHeight) + 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Notes:', 20, notesY);
    
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - 40);
    doc.text(splitNotes, 20, notesY + 7);
  }
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('Thank you for choosing 3NT Studio. Please present this PDF during your session.', pageWidth / 2, footerY, { align: 'center' });
  doc.text('3nteamprod@gmail.com | +62 856-9722-9466', pageWidth / 2, footerY + 5, { align: 'center' });
  
  return doc.output('blob');
};
