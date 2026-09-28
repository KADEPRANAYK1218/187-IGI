export interface ReportItem {
  id: string;
  type: 'Threat' | 'Incident' | 'Operational' | 'Analysis';
  title: string;
  region: string;
  dateTime: string;
  status: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  summary: string;
  image?: string;
  confidence?: string;
}

export interface ArchiveItem {
  id: string;
  name: string;
  size: string;
  records: string;
  period: string;
  region: string;
  type: 'CSV' | 'JSON' | 'TXT';
  content: string;
  mimeType: string;
}
