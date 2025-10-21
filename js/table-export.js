import { table } from "./dom.js";

// table-export.js
export function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('l', 'pt', 'a4'); // landscape

  if (!table) return;

  const rows = table.querySelectorAll('tr');
  const margin = 50;
  const cellPadding = 5;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;

  const numCols = rows[0].querySelectorAll('th, td').length;
  const numRows = rows.length;

  // --- Header settings ---
  const colWidthHeader = 70; // First column narrower
  const rowHeightHeader = 30; // First row shorter

  // Width of the remaining columns
  const remainingWidth = availableWidth - colWidthHeader;
  const cellWidth = remainingWidth / (numCols - 1);

  // Height of the remaining rows
  const remainingHeight = availableHeight - rowHeightHeader;
  const rowHeight = remainingHeight / (numRows - 1);

  let startY = margin;

  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('th, td');
    let x = margin;

    cells.forEach((cell, colIndex) => {
      let text = cell.textContent.trim();
      let fontSize = 12;

      // Determine cell size
      const w = colIndex === 0 ? colWidthHeader : cellWidth;
      const h = rowIndex === 0 ? rowHeightHeader : rowHeight;

      // --- Styles according to cell type ---
      if (rowIndex === 0) {
        // First row (header)
        doc.setFillColor(123, 182, 97);
        doc.setTextColor(255, 255, 255); 
        doc.setFont('helvetica', 'bold');
      } else if (colIndex === 0) {
        // First column (vertical header)
        doc.setFillColor(200, 216, 178); 
        doc.setTextColor(90, 62, 27);
        doc.setFont('helvetica', 'bold');
      } else if (text !== '') {
        // Cells with content
        doc.setFillColor(253, 243, 231); 
        doc.setTextColor(90, 62, 27); 
        doc.setFont('helvetica', 'bold');
      } else {
        // Empty cells (normal)
        doc.setFillColor(244, 247, 237); 
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }

      doc.setFontSize(fontSize);

      // Text wrapping to fit inside the cell
      let lines = doc.splitTextToSize(text, w - cellPadding * 2);
      while (lines.length * fontSize * 1.2 > h - cellPadding * 2 && fontSize > 6) {
        fontSize -= 0.5;
        doc.setFontSize(fontSize);
        lines = doc.splitTextToSize(text, w - cellPadding * 2);
      }

      // --- Draw cell ---
      doc.setDrawColor(123, 182, 97); 
      doc.rect(x, startY, w, h, 'FD'); // Fill + Draw

      // --- Centered text ---
      const textX = x + w / 2;
      const textY = startY + h / 2 + fontSize / 2.5;
      doc.text(lines, textX, textY, { align: 'center', baseline: 'middle' });

      x += w; // Move to the next column
    });

    startY += rowIndex === 0 ? rowHeightHeader : rowHeight; // Move to the next row
  });

  doc.save('menu-semanal.pdf');
}
