export interface ReportPdfData {
  id?: string;
  title: string;
  region?: string;
  timestamp?: string;
  classification?: string;
  type?: string;
  status?: string;
  summary: string;
  confidence?: string;
  officerName?: string;
  officerServiceId?: string;
  sector?: string;
  telemetryLogs?: string[];
  directives?: string[];
}

/**
 * Generates an official, clean, perfectly readable, unjumbled military report PDF.
 * Uses dynamic import for jsPDF so it doesn't block initial page load.
 */
export async function generateTacticalReportPdf(data: ReportPdfData): Promise<void> {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
    const margin = 18;
    const contentWidth = pageWidth - margin * 2; // 174mm

    const reportId = data.id || `VAJRA-RPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const reportDate = data.timestamp || new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const sector = data.region || data.sector || 'Northern Command Sector (J&K)';
    const status = (data.status || 'Active / Verified').toUpperCase();
    const officer = data.officerName || 'Major IC-7K42P9 (Command Echelon)';
    const reportType = data.type || 'Operational Briefing';

    // Page Outer Border
    doc.setDrawColor(210, 220, 230);
    doc.setLineWidth(0.3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    let currentY = 22;

    // =========================================================================
    // 1. TOP HEADER & AUTHORITY
    // =========================================================================
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 35, 75);
    doc.text('BHARAT COMMAND NETWORK', margin, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 115, 130);
    doc.text('TRI-SERVICES DEFENSE COMMAND SYSTEM', pageWidth - margin, currentY, { align: 'right' });

    currentY += 4;
    doc.setDrawColor(15, 60, 130);
    doc.setLineWidth(0.7);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // Subtle tricolor accent under header line
    doc.setDrawColor(245, 130, 32); // Saffron
    doc.setLineWidth(0.4);
    doc.line(margin, currentY + 1, margin + 40, currentY + 1);
    doc.setDrawColor(16, 150, 72); // Green
    doc.line(pageWidth - margin - 40, currentY + 1, pageWidth - margin, currentY + 1);

    currentY += 10;

    // =========================================================================
    // 2. DOCUMENT TITLE
    // =========================================================================
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(15, 25, 40);
    doc.text(data.title, margin, currentY);

    currentY += 5.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 95, 110);
    doc.text(`Official Defense Intelligence Record  •  Classification: RESTRICTED  •  Category: ${reportType}`, margin, currentY);

    currentY += 8;

    // =========================================================================
    // 3. STRUCTURED METADATA TABLE (Clean 2-Column Grid)
    // =========================================================================
    const tableHeight = 26;
    doc.setFillColor(248, 250, 253);
    doc.setDrawColor(215, 225, 238);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, tableHeight, 1.5, 1.5, 'FD');

    const colLeft = margin + 5;
    const colRight = margin + contentWidth / 2 + 5;

    // Left Column
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Report ID:', colLeft, currentY + 6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 25, 45);
    doc.text(reportId, colLeft + 25, currentY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Date & Time:', colLeft, currentY + 14.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 25, 45);
    doc.text(reportDate, colLeft + 25, currentY + 14.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Command Desk:', colLeft, currentY + 21.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 25, 45);
    doc.text('VAJRA Operational HQ', colLeft + 25, currentY + 21.5);

    // Right Column
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Sector / Area:', colRight, currentY + 6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 25, 45);
    doc.text(sector, colRight + 26, currentY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Duty Officer:', colRight, currentY + 14.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 25, 45);
    doc.text(officer, colRight + 26, currentY + 14.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 85, 105);
    doc.text('Current Status:', colRight, currentY + 21.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 25, 25);
    doc.text(status, colRight + 26, currentY + 21.5);

    currentY += tableHeight + 10;

    // =========================================================================
    // 4. SECTION 1: EXECUTIVE SUMMARY
    // =========================================================================
    doc.setFillColor(15, 35, 75);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('1. EXECUTIVE SUMMARY & SITUATION CONTEXT', margin + 3.5, currentY + 4.2);

    currentY += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(25, 35, 45);

    const summaryContent = data.summary || 
      'A thorough perimeter and operational assessment was conducted across the designated command sector. All ground sensors and aerial patrol links confirmed normal operational integrity with continuous real-time monitoring active.';
    
    const summaryLines = doc.splitTextToSize(summaryContent, contentWidth - 4);
    summaryLines.forEach((line: string) => {
      doc.text(line, margin + 2, currentY);
      currentY += 4.8;
    });

    currentY += 6;

    // =========================================================================
    // 5. SECTION 2: OBSERVATIONS & FIELD INTELLIGENCE
    // =========================================================================
    doc.setFillColor(15, 35, 75);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('2. KEY FIELD OBSERVATIONS & SENSOR READINGS', margin + 3.5, currentY + 4.2);

    currentY += 10;

    const defaultObservations = [
      'Aerial Reconnaissance: UAV drone patrol completed along the forward sector corridor.',
      'Perimeter Sensors: Optical and infrared boundary monitoring units active at 100% capacity.',
      'Ground Status: Forward outposts alerted; normal tactical communication links verified.',
      'Data Link Security: Encrypted data stream connected securely to Central Command Network.'
    ];

    const observations = data.telemetryLogs && data.telemetryLogs.length > 0 
      ? data.telemetryLogs.map(log => log.replace(/^[•\-\*]\s*/, '').replace(/\/\//g, '—')) 
      : defaultObservations;

    observations.slice(0, 4).forEach((obs, index) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 35, 75);
      doc.text(`${index + 1}.`, margin + 2, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(25, 35, 45);
      const obsLines = doc.splitTextToSize(obs, contentWidth - 10);
      obsLines.forEach((line: string) => {
        doc.text(line, margin + 8, currentY);
        currentY += 4.5;
      });
      currentY += 1.5;
    });

    currentY += 4;

    // =========================================================================
    // 6. SECTION 3: ACTION PLAN & DIRECTIVES
    // =========================================================================
    doc.setFillColor(15, 35, 75);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('3. ACTION PLAN & COMMAND DIRECTIVES', margin + 3.5, currentY + 4.2);

    currentY += 10;

    const defaultActions = [
      'Maintain continuous visual and radar surveillance across the forward perimeter.',
      'Keep Quick Reaction Team (QRT) stationed on 5-minute standby notice.',
      'Transmit automated progress updates to Command Headquarters at scheduled intervals.'
    ];

    const actions = data.directives && data.directives.length > 0 
      ? data.directives.map(d => d.replace(/^\d+\.\s*/, '')) 
      : defaultActions;

    actions.slice(0, 3).forEach((act, index) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 75, 160);
      doc.text(`[Action ${index + 1}]`, margin + 2, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(25, 35, 45);
      const actLines = doc.splitTextToSize(act, contentWidth - 22);
      actLines.forEach((line: string) => {
        doc.text(line, margin + 20, currentY);
        currentY += 4.5;
      });
      currentY += 1.5;
    });

    currentY += 5;

    // =========================================================================
    // 7. VERIFICATION & SIGN-OFF BLOCK
    // =========================================================================
    const signBoxHeight = 20;
    doc.setFillColor(250, 252, 255);
    doc.setDrawColor(210, 220, 230);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, signBoxHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 85, 105);
    doc.text('AUTHENTICATION & VERIFICATION:', margin + 4, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 110, 120);
    doc.text('Verified & logged into Central Command Records.', margin + 4, currentY + 11);
    doc.text(`Official Stamp: VAJRA-CMD-HQ  •  Date: ${reportDate}`, margin + 4, currentY + 16);

    // Signature Line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(70, 85, 105);
    doc.text('Authorized Signature:', pageWidth - margin - 52, currentY + 7);
    doc.setDrawColor(130, 140, 150);
    doc.setLineWidth(0.4);
    doc.line(pageWidth - margin - 52, currentY + 13, pageWidth - margin - 4, currentY + 13);
    doc.setFontSize(7.5);
    doc.setTextColor(110, 120, 130);
    doc.text('Duty Commanding Officer', pageWidth - margin - 52, currentY + 17);

    // =========================================================================
    // 8. CLEAN FOOTER
    // =========================================================================
    doc.setDrawColor(210, 220, 230);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 140);
    doc.text('CONFIDENTIAL  •  FOR OFFICIAL USE ONLY  •  VAJRA DEFENSE SYSTEM', margin, pageHeight - 11);
    doc.text('Page 1 of 1', pageWidth - margin, pageHeight - 11, { align: 'right' });

    // File name sanitize and download
    const cleanTitle = data.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanTitle}_${reportId}.pdf`;

    doc.save(fileName);
  } catch (err) {
    console.error('Failed to generate standard PDF report:', err);
  }
}
