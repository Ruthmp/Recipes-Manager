// table-export.js
export function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    const table = document.getElementById('weekly-menu');
    if (!table) return;
  
    const rows = table.querySelectorAll('tr');
    let startX = 40;
    let startY = 40;
    const cellHeight = 25;
    const cellPadding = 5;
    const cellWidth = 70;
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll('th, td');
      let x = startX;
  
      cells.forEach((cell) => {
        const text = cell.textContent.trim();
        doc.rect(x, startY, cellWidth, cellHeight); 
        doc.text(text, x + cellPadding, startY + cellHeight / 1.5); 
        x += cellWidth;
      });
  
      startY += cellHeight;
    });
  
    doc.save('menu-semanal.pdf');
  }
  
