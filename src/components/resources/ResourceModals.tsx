import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Check, AlertCircle, Shield, Calendar, 
  Package, Truck, Users, Box, ArrowRight,
  Download, FileSpreadsheet, FileText, Printer, Copy,
  CheckCircle2, ChevronDown, RefreshCw
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

// 1. ALLOCATE RESOURCES MODAL
export const AllocateResourcesModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [resourceType, setResourceType] = useState('Personnel');
  const [targetCommand, setTargetCommand] = useState('Northern Command (J&K)');
  const [quantity, setQuantity] = useState('250');
  const [priority, setPriority] = useState('HIGH');
  const [authPin, setAuthPin] = useState('849201');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Allocated ${quantity} ${resourceType} to ${targetCommand} [Priority: ${priority}]`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">ALLOCATE RESOURCES</h3>
              <p className="text-[10px] font-mono-code text-cyan-400">BHARAT COMMAND NETWORK • DISPATCH CONSOLE</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Resource Category</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="Personnel">Personnel (Infantry / Special Forces)</option>
              <option value="Armored Vehicles">Armored Vehicles (T-90 / BMP-2)</option>
              <option value="Combat Aircraft">Combat Aircraft (Su-30MKI / Rafale)</option>
              <option value="Naval Units">Naval Units (Corvettes / Frigates)</option>
              <option value="Ammunition & Logistics">Ammunition & Field Logistics</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Target Command</label>
              <select
                value={targetCommand}
                onChange={(e) => setTargetCommand(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="Northern Command (J&K)">Northern Command (J&K)</option>
                <option value="Western Command (Rajasthan)">Western Command (Rajasthan)</option>
                <option value="Eastern Command (NE Region)">Eastern Command (NE Region)</option>
                <option value="Southern Command (Tamil Nadu)">Southern Command (Tamil Nadu)</option>
                <option value="Central Command (MP)">Central Command (MP)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Quantity / Units</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Mission Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="CRITICAL">CRITICAL (Immediate Action)</option>
                <option value="HIGH">HIGH (Under 6 Hours)</option>
                <option value="STANDARD">STANDARD (Scheduled)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Officer Security PIN</label>
              <input
                type="password"
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400 font-mono tracking-widest"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Allocation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. REQUEST SUPPLY MODAL
export const RequestSupplyModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [supplyCategory, setSupplyCategory] = useState('Fuel');
  const [depot, setDepot] = useState('Central Depot 4 - Ambala');
  const [amount, setAmount] = useState('10,000 Litres');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Requisition submitted: ${amount} of ${supplyCategory} from ${depot}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">REQUEST SUPPLY REQUISITION</h3>
              <p className="text-[10px] font-mono-code text-emerald-400">FORWARD BASE & DEPOT SUPPLY CHAIN</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Supply Type</label>
            <select
              value={supplyCategory}
              onChange={(e) => setSupplyCategory(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="Aviation Turbine Fuel (ATF)">Aviation Turbine Fuel (ATF)</option>
              <option value="Standard Military Diesel">Standard Military Diesel</option>
              <option value="Artillery & Small Arms Ammunition">Artillery & Small Arms Ammunition</option>
              <option value="Operational Combat Rations (MRE)">Operational Combat Rations (MRE)</option>
              <option value="Combat Medical Kits & Plasma">Combat Medical Kits & Plasma</option>
              <option value="Avionics & Armored Spare Parts">Avionics & Armored Spare Parts</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Dispatch Depot</label>
              <select
                value={depot}
                onChange={(e) => setDepot(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="Central Depot 4 - Ambala">Central Depot 4 - Ambala</option>
                <option value="Southern Depot 2 - Secunderabad">Southern Depot 2 - Secunderabad</option>
                <option value="Eastern Logistics Node - Tezpur">Eastern Logistics Node - Tezpur</option>
                <option value="Northern Supply Hub - Udhampur">Northern Supply Hub - Udhampur</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Required Quantity</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Automated convoy routing will be generated across 26 active logistics corridors.</span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Submit Requisition</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. SCHEDULE DEPLOYMENT MODAL
export const ScheduleDeploymentModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [unitName, setUnitName] = useState('14th Mechanized Infantry');
  const [date, setDate] = useState('2026-09-22');
  const [time, setTime] = useState('04:00');
  const [destination, setDestination] = useState('Sector 4 - Thar Desert');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Deployment scheduled for ${unitName} to ${destination} on ${date} at ${time} IST`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div className="relative w-full max-w-lg bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">SCHEDULE DEPLOYMENT</h3>
              <p className="text-[10px] font-mono-code text-blue-400">TRI-SERVICE STRATEGIC MOVEMENT PLANNER</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-mono-code text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Deploying Combat Formation</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Target Sector / Sector Base</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Date of Mobilization</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. VIEW INVENTORY MODAL
export const ViewInventoryModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [filter, setFilter] = useState('ALL');
  const [isExporting, setIsExporting] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportNotification, setExportNotification] = useState<string | null>(null);
  const [exportScope, setExportScope] = useState<'CURRENT' | 'ALL'>('CURRENT');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    if (exportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exportMenuOpen]);

  if (!isOpen) return null;

  const inventoryItems = [
    // STRATEGIC ASSETS
    { id: 'EQ-307', name: 'S-400 Triumf Air Defense Battery', branch: 'Strategic', category: 'Surface-to-Air Missile Shield', total: 5, operational: 5, depot: 'Northern / Western Air Command' },
    { id: 'EQ-318', name: 'Agni-V Road-Mobile TEL Missile Regiment', branch: 'Strategic', category: 'Intercontinental Deterrence', total: 16, operational: 16, depot: 'Strategic Forces Command (SFC)' },
    { id: 'EQ-329', name: 'BrahMos-ER Supersonic Coastal Mobile Battery', branch: 'Strategic', category: 'Anti-Ship / Land Attack Cruise', total: 12, operational: 12, depot: 'Southern Maritime / Western Command' },
    { id: 'EQ-340', name: 'Prithvi Air Defense (PAD) Phase-II BMD Shield', branch: 'Strategic', category: 'Ballistic Missile Interceptor', total: 8, operational: 8, depot: 'National Capital Region Outer Ring' },
    { id: 'EQ-351', name: 'GSAT-7A / 7R MilSat Tactical Datalink Hub', branch: 'Strategic', category: 'Secure Space-Air C4ISR Node', total: 24, operational: 24, depot: 'Tri-Service Space Defense Agency' },
    
    // ARMY ASSETS
    { id: 'EQ-901', name: 'T-90 Bhishma Main Battle Tank', branch: 'Army', category: 'Armored Combat Vehicle', total: 1200, operational: 1140, depot: 'Western Corps' },
    { id: 'EQ-802', name: 'Arjun Mk-1A MBT', branch: 'Army', category: 'Heavy Armor Main Battle Tank', total: 240, operational: 220, depot: 'Rajasthan Sector' },
    { id: 'EQ-208', name: 'Pinaka Multi-Barrel Rocket System', branch: 'Army', category: 'Heavy Rocket Artillery', total: 84, operational: 80, depot: 'Central Artillery' },
    { id: 'EQ-219', name: 'K9 Vajra-T 155mm Tracked Howitzer', branch: 'Army', category: 'Self-Propelled Heavy Artillery', total: 100, operational: 98, depot: 'Northern Forward High-Altitude' },
    { id: 'EQ-225', name: 'BMP-2 Sarath Armored Infantry Fighting Vehicle', branch: 'Army', category: 'Mechanized Infantry', total: 1500, operational: 1420, depot: 'Strike Corps Reserves' },

    // AIR FORCE ASSETS
    { id: 'EQ-703', name: 'Rafale Multirole Fighter (Omnirole F3-R)', branch: 'Air Force', category: 'Air Superiority & Deep Strike', total: 36, operational: 34, depot: 'Ambala / Hasimara' },
    { id: 'EQ-604', name: 'Sukhoi Su-30MKI Super Flanker', branch: 'Air Force', category: 'Heavy Air Superiority Fighter', total: 250, operational: 225, depot: 'Bareilly / Halwara' },
    { id: 'EQ-615', name: 'LCA Tejas Mk-1A Multirole Fighter', branch: 'Air Force', category: 'Light Tactical Combat Aircraft', total: 40, operational: 38, depot: 'Sulur / Nal Airbase' },
    { id: 'EQ-626', name: 'Netra AEW&C Airborne Early Warning', branch: 'Air Force', category: 'Airborne Surveillance & Control', total: 6, operational: 6, depot: 'Western Air Command' },
    { id: 'EQ-637', name: 'C-17 Globemaster III Heavy Military Transport', branch: 'Air Force', category: 'Strategic Heavy Airlift', total: 11, operational: 11, depot: 'Hindan Air Force Station' },

    // NAVY ASSETS
    { id: 'EQ-406', name: 'INS Vikrant Aircraft Carrier (IAC-1)', branch: 'Navy', category: 'Carrier Battle Group Flagship', total: 1, operational: 1, depot: 'Eastern Naval Command' },
    { id: 'EQ-407', name: 'INS Vikramaditya STOBAR Aircraft Carrier', branch: 'Navy', category: 'Western Fleet Flagship', total: 1, operational: 1, depot: 'Karwar Naval Base' },
    { id: 'EQ-505', name: 'INS Kolkata Class Guided Missile Destroyer', branch: 'Navy', category: 'Air Defense & Anti-Submarine Destroyer', total: 3, operational: 3, depot: 'Western Fleet (Mumbai)' },
    { id: 'EQ-516', name: 'INS Visakhapatnam Stealth Guided Destroyer', branch: 'Navy', category: 'Project 15B Stealth Destroyer', total: 4, operational: 4, depot: 'Eastern Fleet (Visakhapatnam)' },
    { id: 'EQ-527', name: 'Kalvari Class (Scorpene) Attack Submarine', branch: 'Navy', category: 'Diesel-Electric Stealth Submarine', total: 6, operational: 6, depot: 'Submarine Flotilla (Mumbai)' }
  ];

  const filtered = filter === 'ALL' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.branch.toUpperCase().includes(filter.toUpperCase()));

  const getTargetItems = () => exportScope === 'ALL' ? inventoryItems : filtered;

  // File Download Helper
  const triggerBrowserDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // CSV Generator & Exporter
  const handleExportCSV = (overrideScope?: 'CURRENT' | 'ALL') => {
    setIsExporting(true);
    setExportMenuOpen(false);
    const scopeToUse = overrideScope || exportScope;
    const items = scopeToUse === 'ALL' ? inventoryItems : filtered;
    const dateStamp = new Date().toISOString().split('T')[0];
    const timestampStr = new Date().toISOString();

    const headers = [
      'Asset ID',
      'Name & Nomenclature',
      'Military Branch',
      'Materiel Category',
      'Total Cataloged',
      'Operational Units',
      'Maintenance / Reserve',
      'Readiness Rate (%)',
      'Assigned Depot / Command Sector',
      'Combat Readiness Status',
      'Inventory Timestamp'
    ];

    const rows = items.map(item => [
      `"${item.id}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.branch}"`,
      `"${item.category || 'Defense Materiel'}"`,
      item.total,
      item.operational,
      item.total - item.operational,
      `"${Math.round((item.operational / item.total) * 100)}%"`,
      `"${item.depot.replace(/"/g, '""')}"`,
      `"VERIFIED - COMBAT READY"`,
      `"${timestampStr}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const filename = `DEFENSE_ASSET_LEDGER_${filter}_${dateStamp}.csv`;

    triggerBrowserDownload(csvContent, filename, 'text/csv;charset=utf-8;');

    const successMsg = `Exported ${items.length} items to ${filename} (CSV downloaded)`;
    setExportNotification(`✓ Successfully downloaded "${filename}" (${items.length} hardware profiles).`);
    onSuccess(successMsg);

    setTimeout(() => {
      setIsExporting(false);
    }, 1200);
  };

  // JSON Machine Ledger Exporter
  const handleExportJSON = () => {
    setIsExporting(true);
    setExportMenuOpen(false);
    const items = getTargetItems();
    const dateStamp = new Date().toISOString().split('T')[0];

    const totalUnits = items.reduce((sum, item) => sum + item.total, 0);
    const totalOperational = items.reduce((sum, item) => sum + item.operational, 0);

    const payload = {
      manifestHeader: {
        commandGrid: "Integrated Defense Staff (IDS) • Bharat Command Network",
        documentTitle: "COMPREHENSIVE MATERIEL & HARDWARE LEDGER",
        classification: "SECRET // NATIONAL DEFENSE STRATEGIC INVENTORY",
        exportDate: new Date().toISOString(),
        filterScope: exportScope === 'ALL' ? 'MASTER_LEDGER_ALL_SERVICES' : `FILTERED_${filter}`,
        totalHardwareProfiles: items.length,
        totalCatalogedUnits: totalUnits,
        totalOperationalUnits: totalOperational,
        systemReadinessRate: `${Math.round((totalOperational / totalUnits) * 100)}%`,
        verificationHash: `SHA256-VAJRA-${Date.now().toString(16).toUpperCase()}`
      },
      hardwareLedger: items.map(item => ({
        assetId: item.id,
        nomenclature: item.name,
        branch: item.branch,
        category: item.category,
        totalUnits: item.total,
        operationalUnits: item.operational,
        maintenanceReserve: item.total - item.operational,
        readinessRate: `${Math.round((item.operational / item.total) * 100)}%`,
        assignedDepot: item.depot,
        status: "ACTIVE_OPERATIONAL"
      }))
    };

    const jsonContent = JSON.stringify(payload, null, 2);
    const filename = `DEFENSE_ASSET_LEDGER_${filter}_${dateStamp}.json`;

    triggerBrowserDownload(jsonContent, filename, 'application/json;charset=utf-8;');

    setExportNotification(`✓ Successfully downloaded "${filename}" in JSON schema format.`);
    onSuccess(`Exported ${items.length} items to ${filename} (JSON downloaded)`);

    setTimeout(() => {
      setIsExporting(false);
    }, 1200);
  };

  // Print / PDF Tactical Manifest Report
  const handlePrintReport = () => {
    setExportMenuOpen(false);
    const items = getTargetItems();
    const dateStr = new Date().toLocaleString();
    const totalUnits = items.reduce((sum, item) => sum + item.total, 0);
    const totalOperational = items.reduce((sum, item) => sum + item.operational, 0);

    const printWin = window.open('', '_blank');
    if (!printWin) {
      window.print();
      return;
    }

    const rowsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #cbd5e1;">
        <td style="padding: 8px 10px; font-weight: bold; color: #0284c7;">${item.id}</td>
        <td style="padding: 8px 10px; font-weight: 600; color: #0f172a;">${item.name}</td>
        <td style="padding: 8px 10px; color: #475569;">${item.branch}</td>
        <td style="padding: 8px 10px; text-align: right; font-weight: bold;">${item.total.toLocaleString()}</td>
        <td style="padding: 8px 10px; text-align: right; color: #16a34a; font-weight: bold;">${item.operational.toLocaleString()}</td>
        <td style="padding: 8px 10px; text-align: right; font-weight: bold; color: #0284c7;">${Math.round((item.operational / item.total) * 100)}%</td>
        <td style="padding: 8px 10px; color: #64748b; font-size: 11px;">${item.depot}</td>
      </tr>
    `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DEFENSE_MATERIEL_LEDGER_${new Date().toISOString().split('T')[0]}</title>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; margin: 24px; color: #0f172a; background: #fff; }
            .header-bar { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-size: 18px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase; margin: 0; }
            .subtitle { font-size: 11px; color: #64748b; margin-top: 4px; font-family: monospace; }
            .stats-bar { display: flex; gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th { background: #0f172a; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; text-transform: uppercase; }
            .footer { margin-top: 24px; border-top: 1px dashed #94a3b8; padding-top: 10px; font-size: 10px; color: #64748b; font-family: monospace; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <div class="title">BHARAT COMMAND NETWORK • RESOURCE ASSET INVENTORY LEDGER</div>
              <div class="subtitle">INTEGRATED DEFENSE STAFF (IDS) • CLASSIFICATION: SECRET // NATIONAL HARDWARE LEDGER</div>
            </div>
            <div style="font-size: 11px; text-align: right; color: #475569; font-family: monospace;">
              GENERATED: ${dateStr}<br/>
              FILTER: ${filter}
            </div>
          </div>

          <div class="stats-bar">
            <div><strong>Scope:</strong> ${exportScope === 'ALL' ? 'Master Ledger (All Branches)' : `Filter: ${filter}`}</div>
            <div><strong>Cataloged Systems:</strong> ${items.length}</div>
            <div><strong>Total Inventory Units:</strong> ${totalUnits.toLocaleString()}</div>
            <div><strong>Operational Units:</strong> ${totalOperational.toLocaleString()}</div>
            <div><strong>Overall Readiness:</strong> <span style="color: #16a34a; font-weight: bold;">${Math.round((totalOperational / totalUnits) * 100)}%</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Name & Nomenclature</th>
                <th>Branch</th>
                <th style="text-align: right;">Total</th>
                <th style="text-align: right;">Operational</th>
                <th style="text-align: right;">Readiness</th>
                <th>Assigned Depot / Command</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer">
            <span>OFFICIAL ARMED FORCES DEFENSE AUDIT MANIFEST • SYSTEM ENCRYPTION VERIFIED</span>
            <span>PAGE 1 OF 1</span>
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
    }, 300);

    setExportNotification(`✓ Print / PDF document ready for printing or saving.`);
    onSuccess(`Generated print report for ${items.length} inventory assets`);
  };

  // Copy to Clipboard
  const handleCopyClipboard = () => {
    setExportMenuOpen(false);
    const items = getTargetItems();
    const headers = ['Asset ID', 'Nomenclature', 'Branch', 'Total', 'Operational', 'Depot'].join('\t');
    const rows = items.map(i => [i.id, i.name, i.branch, i.total, i.operational, i.depot].join('\t'));
    const textData = [headers, ...rows].join('\n');

    navigator.clipboard.writeText(textData).then(() => {
      setExportNotification(`✓ Copied ${items.length} records to clipboard (tab-delimited).`);
      onSuccess(`Copied ${items.length} inventory records to clipboard`);
    }).catch(() => {
      handleExportCSV();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
      <div 
        id="resource-inventory-modal"
        className="relative w-full max-w-4xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-4 sm:p-5 overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-400 flex items-center justify-center text-purple-300 shrink-0">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wider uppercase">RESOURCE ASSET INVENTORY</h3>
              <p className="text-[10px] sm:text-xs font-mono-code text-purple-400">COMPREHENSIVE MATERIEL & HARDWARE LEDGER</p>
            </div>
          </div>
          <button 
            type="button"
            id="close-resource-inventory-btn"
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills & Scope Selector */}
        <div className="flex items-center justify-between flex-wrap gap-2 py-2.5 border-b border-slate-800 text-[10px] sm:text-xs font-mono-code">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 uppercase font-bold mr-1">Filter:</span>
            {['ALL', 'ARMY', 'AIR FORCE', 'NAVY', 'STRATEGIC'].map((tab) => (
              <button
                key={tab}
                type="button"
                id={`filter-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setFilter(tab)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg border transition cursor-pointer ${
                  filter === tab
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-[#031533] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab} {tab === 'ALL' ? `(${inventoryItems.length})` : tab === 'STRATEGIC' ? '(5)' : ''}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Export Scope:</span>
            <button
              type="button"
              onClick={() => setExportScope(exportScope === 'CURRENT' ? 'ALL' : 'CURRENT')}
              className="text-cyan-300 hover:text-cyan-200 font-bold underline cursor-pointer bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800"
            >
              {exportScope === 'CURRENT' ? `Current View (${filtered.length})` : `All Branches (${inventoryItems.length})`}
            </button>
          </div>
        </div>

        {/* Dynamic Notification Banner when Exported */}
        {exportNotification && (
          <div className="my-2 p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/80 text-cyan-200 text-xs font-mono-code flex items-center justify-between gap-2 animate-fade-in shadow-md">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{exportNotification}</span>
            </div>
            <button 
              type="button"
              onClick={() => setExportNotification(null)}
              className="text-cyan-400 hover:text-white p-0.5 rounded text-xs shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Table list */}
        <div className="overflow-y-auto flex-1 my-2 divide-y divide-slate-800/60 font-mono-code text-xs">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[#020b1c]/95 backdrop-blur z-10">
              <tr className="text-[10px] text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <th className="py-2.5 px-2">Asset ID</th>
                <th className="py-2.5 px-2">Name & Nomenclature</th>
                <th className="py-2.5 px-2">Branch</th>
                <th className="py-2.5 px-2 text-right">Total</th>
                <th className="py-2.5 px-2 text-right">Operational</th>
                <th className="py-2.5 px-2">Assigned Depot</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#031533]/80 transition group">
                  <td className="py-2.5 px-2 text-cyan-400 font-bold whitespace-nowrap">{item.id}</td>
                  <td className="py-2.5 px-2 text-slate-100 font-medium">
                    <div>{item.name}</div>
                    {item.category && (
                      <div className="text-[10px] text-slate-400 group-hover:text-slate-300">{item.category}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-slate-300 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.branch === 'Strategic' ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' :
                      item.branch === 'Air Force' ? 'bg-sky-950/60 border-sky-500/40 text-sky-300' :
                      item.branch === 'Navy' ? 'bg-teal-950/60 border-teal-500/40 text-teal-300' :
                      'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {item.branch}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-200 font-bold whitespace-nowrap">{item.total.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-right text-emerald-400 font-bold whitespace-nowrap">{item.operational.toLocaleString()}</td>
                  <td className="py-2.5 px-2 text-slate-400 text-[11px]">{item.depot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer with Fully Working Export Ledger controls */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 text-[11px] font-mono-code text-slate-400">
            <span>Total Items Cataloged: <strong className="text-white">12,360 Units</strong></span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline">Active in View: <strong className="text-cyan-300">{filtered.length} systems</strong></span>
          </div>

          <div className="relative flex items-center gap-1.5" ref={menuRef}>
            {/* Primary Export Ledger Button - Directly downloads CSV & triggers export */}
            <button
              type="button"
              id="export-ledger-btn"
              onClick={() => handleExportCSV()}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 font-mono-code text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer disabled:opacity-50"
              title="Instantly download complete ledger as spreadsheet CSV file"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Ledger</span>
                </>
              )}
            </button>

            {/* Dropdown Toggle for Format Selection */}
            <button
              type="button"
              id="export-format-options-btn"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="px-2 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/80 text-cyan-300 transition cursor-pointer"
              title="More export options (JSON, PDF Print, Copy)"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu for Export Formats */}
            {exportMenuOpen && (
              <div 
                id="export-ledger-dropdown"
                className="absolute right-0 bottom-full mb-2 w-64 bg-[#020b1c] border border-cyan-500/70 rounded-xl shadow-2xl p-1.5 z-50 space-y-1 font-mono-code text-xs animate-fade-in"
              >
                <div className="px-2.5 py-1.5 text-[10px] text-cyan-400 uppercase font-bold border-b border-slate-800">
                  Select Export Format
                </div>

                {/* CSV */}
                <button
                  type="button"
                  id="export-format-csv"
                  onClick={() => handleExportCSV()}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-cyan-950/70 text-slate-200 hover:text-cyan-200 flex items-center gap-2.5 transition cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs">Spreadsheet CSV (.csv)</div>
                    <div className="text-[9.5px] text-slate-400">Excel / Google Sheets compatible</div>
                  </div>
                </button>

                {/* JSON */}
                <button
                  type="button"
                  id="export-format-json"
                  onClick={handleExportJSON}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-cyan-950/70 text-slate-200 hover:text-cyan-200 flex items-center gap-2.5 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs">Machine Ledger (.json)</div>
                    <div className="text-[9.5px] text-slate-400">Encrypted schema with hash</div>
                  </div>
                </button>

                {/* Print / PDF */}
                <button
                  type="button"
                  id="export-format-pdf"
                  onClick={handlePrintReport}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-cyan-950/70 text-slate-200 hover:text-cyan-200 flex items-center gap-2.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs">Print / PDF Manifest</div>
                    <div className="text-[9.5px] text-slate-400">Formatted defense audit report</div>
                  </div>
                </button>

                {/* Copy to Clipboard */}
                <button
                  type="button"
                  id="export-format-clipboard"
                  onClick={handleCopyClipboard}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-cyan-950/70 text-slate-200 hover:text-cyan-200 flex items-center gap-2.5 transition cursor-pointer border-t border-slate-800/80 mt-1 pt-1.5"
                >
                  <Copy className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs">Copy to Clipboard</div>
                    <div className="text-[9.5px] text-slate-400">Direct tab-delimited paste</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
