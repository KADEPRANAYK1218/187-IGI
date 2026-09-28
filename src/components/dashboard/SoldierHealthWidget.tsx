import React, { useState } from 'react';
import { 
  HeartPulse, ArrowRight, CheckCircle2, Check, X, 
  Thermometer, Activity, Users, Shield, Stethoscope, 
  ChevronDown, ChevronUp, ShieldCheck, Search
} from 'lucide-react';

export interface SoldierBiometricRecord {
  id: string;
  serviceNo: string;
  name: string;
  rank: string;
  bp: string;
  temp: string;
  hr: string;
  spo2: string;
  healthIssues: string;
  fit: string;
  unit: string;
  sector: string;
  role: string;
  category: 'OFFICER' | 'JCO' | 'NCO_JAWAN';
}

export const INDIVIDUAL_SOLDIERS_ROSTER: SoldierBiometricRecord[] = [
  {
    id: 'sol-1',
    serviceNo: 'IC-78901A',
    name: 'Vikram Chauhan',
    rank: 'Major',
    bp: '116/74 mmHg',
    temp: '36.6°C',
    hr: '64 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '10 Para SF (Desert Scorpions)',
    sector: 'Thar Desert Border Outpost',
    role: 'Squad Commander',
    category: 'OFFICER'
  },
  {
    id: 'sol-2',
    serviceNo: 'JC-44109M',
    name: 'Arvind Rawat',
    rank: 'Subedar',
    bp: '118/76 mmHg',
    temp: '36.5°C',
    hr: '67 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '10 Para SF (Desert Scorpions)',
    sector: 'Thar Desert Border Outpost',
    role: 'Lead Recon Scout',
    category: 'JCO'
  },
  {
    id: 'sol-3',
    serviceNo: '1548902X',
    name: 'R. Rathore',
    rank: 'Havildar',
    bp: '120/78 mmHg',
    temp: '36.7°C',
    hr: '65 BPM',
    spo2: '100%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '10 Para SF (Desert Scorpions)',
    sector: 'Thar Desert Border Outpost',
    role: 'Combat Medic',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-4',
    serviceNo: '1560941P',
    name: 'Sandeep Singh',
    rank: 'Naik',
    bp: '119/75 mmHg',
    temp: '36.6°C',
    hr: '68 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '10 Para SF (Desert Scorpions)',
    sector: 'Thar Desert Border Outpost',
    role: 'Tactical Radio & Comms',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-5',
    serviceNo: 'IC-65421K',
    name: 'K. Tenzing',
    rank: 'Colonel',
    bp: '120/78 mmHg',
    temp: '36.5°C',
    hr: '70 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '3 Vikas (Special Frontier Force)',
    sector: 'Siachen Ridge (18,500 ft)',
    role: 'Regiment Commanding Officer',
    category: 'OFFICER'
  },
  {
    id: 'sol-6',
    serviceNo: 'JC-51044H',
    name: 'L. Dorjee',
    rank: 'Subedar',
    bp: '122/80 mmHg',
    temp: '36.4°C',
    hr: '72 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '3 Vikas (Special Frontier Force)',
    sector: 'Siachen Ridge (18,500 ft)',
    role: 'High Altitude Lead Scout',
    category: 'JCO'
  },
  {
    id: 'sol-7',
    serviceNo: '1601294F',
    name: 'P. Angchuk',
    rank: 'Havildar',
    bp: '121/79 mmHg',
    temp: '36.6°C',
    hr: '69 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '3 Vikas (Special Frontier Force)',
    sector: 'Siachen Ridge (18,500 ft)',
    role: 'Snow Survival Specialist',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-8',
    serviceNo: '1612098Y',
    name: 'S. Gurung',
    rank: 'Rifleman',
    bp: '124/81 mmHg',
    temp: '36.5°C',
    hr: '73 BPM',
    spo2: '97%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '3 Vikas (Special Frontier Force)',
    sector: 'Siachen Ridge (18,500 ft)',
    role: 'High Altitude Heavy Sniper',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-9',
    serviceNo: 'NV-04821N',
    name: 'A. Roy',
    rank: 'Lt. Commander',
    bp: '114/72 mmHg',
    temp: '36.7°C',
    hr: '62 BPM',
    spo2: '100%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'MARCOS Marine Commando Flight',
    sector: 'INS Vikrant Task Force • Arabian Sea',
    role: 'Marine Commando Flight Lead',
    category: 'OFFICER'
  },
  {
    id: 'sol-10',
    serviceNo: 'PO-30129B',
    name: 'D. Patil',
    rank: 'Petty Officer',
    bp: '116/74 mmHg',
    temp: '36.6°C',
    hr: '64 BPM',
    spo2: '100%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'MARCOS Marine Commando Flight',
    sector: 'INS Vikrant Task Force • Arabian Sea',
    role: 'Tactical Combat Diver',
    category: 'JCO'
  },
  {
    id: 'sol-11',
    serviceNo: 'LS-90184W',
    name: 'K. Nair',
    rank: 'Leading Seaman',
    bp: '115/73 mmHg',
    temp: '36.8°C',
    hr: '63 BPM',
    spo2: '100%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'MARCOS Marine Commando Flight',
    sector: 'INS Vikrant Task Force • Arabian Sea',
    role: 'Maritime Combat Medic',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-12',
    serviceNo: 'IC-74291L',
    name: 'S. K. Thapa',
    rank: 'Major',
    bp: '119/77 mmHg',
    temp: '36.6°C',
    hr: '71 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '5/8 Gorkha Rifles',
    sector: 'Tawang Ridge Mountain Pass (14,200 ft)',
    role: 'Battalion 2nd-in-Command',
    category: 'OFFICER'
  },
  {
    id: 'sol-13',
    serviceNo: 'JC-49012R',
    name: 'D. B. Rana',
    rank: 'Subedar',
    bp: '121/79 mmHg',
    temp: '36.5°C',
    hr: '74 BPM',
    spo2: '97%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '5/8 Gorkha Rifles',
    sector: 'Tawang Ridge Mountain Pass (14,200 ft)',
    role: 'Mountain Scout Commander',
    category: 'JCO'
  },
  {
    id: 'sol-14',
    serviceNo: '1498102T',
    name: 'B. Gurung',
    rank: 'Havildar',
    bp: '120/78 mmHg',
    temp: '36.7°C',
    hr: '72 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '5/8 Gorkha Rifles',
    sector: 'Tawang Ridge Mountain Pass (14,200 ft)',
    role: 'Mountain Forward Observer',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-15',
    serviceNo: 'AF-29104G',
    name: 'R. Verma',
    rank: 'Squadron Leader',
    bp: '116/74 mmHg',
    temp: '36.8°C',
    hr: '67 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'Garud Special Forces',
    sector: 'Air Defense Forward Base',
    role: 'Special Operations Commander',
    category: 'OFFICER'
  },
  {
    id: 'sol-16',
    serviceNo: 'AF-31092K',
    name: 'M. Ali',
    rank: 'Junior Warrant Officer',
    bp: '118/76 mmHg',
    temp: '36.7°C',
    hr: '69 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'Garud Special Forces',
    sector: 'Air Defense Forward Base',
    role: 'Airborne Insertion Lead',
    category: 'JCO'
  },
  {
    id: 'sol-17',
    serviceNo: 'AF-49120Z',
    name: 'K. Sen',
    rank: 'Sergeant',
    bp: '117/75 mmHg',
    temp: '36.9°C',
    hr: '68 BPM',
    spo2: '100%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: 'Garud Special Forces',
    sector: 'Air Defense Forward Base',
    role: 'Specialist Counter-UAS Operator',
    category: 'NCO_JAWAN'
  },
  {
    id: 'sol-18',
    serviceNo: 'IC-60912E',
    name: 'H. S. Bisht',
    rank: 'Colonel',
    bp: '122/80 mmHg',
    temp: '36.8°C',
    hr: '73 BPM',
    spo2: '98%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '17 Kumaon Mechanized Recon',
    sector: 'Northern Forward Armored Axis',
    role: 'Regiment Commander',
    category: 'OFFICER'
  },
  {
    id: 'sol-19',
    serviceNo: 'JC-43099S',
    name: 'M. Joshi',
    rank: 'Subedar',
    bp: '125/83 mmHg',
    temp: '37.0°C',
    hr: '76 BPM',
    spo2: '98%',
    healthIssues: 'Hydrated (Resolved)',
    fit: 'YES (SHAPE-1)',
    unit: '17 Kumaon Mechanized Recon',
    sector: 'Northern Forward Armored Axis',
    role: 'Armored Recon Tank Commander',
    category: 'JCO'
  },
  {
    id: 'sol-20',
    serviceNo: '1589021V',
    name: 'R. Pant',
    rank: 'Havildar',
    bp: '123/81 mmHg',
    temp: '36.9°C',
    hr: '74 BPM',
    spo2: '99%',
    healthIssues: 'None (0 Flags)',
    fit: 'YES (SHAPE-1)',
    unit: '17 Kumaon Mechanized Recon',
    sector: 'Northern Forward Armored Axis',
    role: 'Mechanized Field Medic',
    category: 'NCO_JAWAN'
  }
];

export const SoldierHealthGauges: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState<'SOLDIERS' | 'UNITS'>('SOLDIERS');
  const [soldierSearch, setSoldierSearch] = useState('');
  const [soldierRankCategory, setSoldierRankCategory] = useState<'ALL' | 'OFFICER' | 'JCO' | 'NCO_JAWAN'>('ALL');
  const [selectedSoldierId, setSelectedSoldierId] = useState<string>('sol-1');

  const [selectedUnitId, setSelectedUnitId] = useState<string>('sq-1');
  const [unitFilter, setUnitFilter] = useState<'ALL' | 'SPECIAL_FORCES' | 'HIGH_ALTITUDE' | 'MARITIME'>('ALL');

  const vitals = [
    { label: 'Heart Rate', value: 98, display: '68 BPM', color: '#10B981', note: 'Zone-1 Normal' },
    { label: 'Blood Oxygen', value: 99, display: '99.4%', color: '#22D3EE', note: 'Optimal' },
    { label: 'Body Temp', value: 98, display: '36.7°C', color: '#38BDF8', note: 'Regulated' },
    { label: 'Combat Fit', value: 99, display: '99.8%', color: '#34D399', note: 'Battle Ready' }
  ];

  // Comprehensive squad & soldier biometric telemetry dataset
  const squadTelemetry = [
    { 
      id: 'sq-1',
      unit: '10 Para SF (Desert Scorpions - Thar Sector)', 
      tag: 'SPECIAL_FORCES',
      sector: 'Thar Desert Border Outpost • Sector South',
      count: '145 Deployed', 
      hr: '66 BPM', 
      spo2: '99%', 
      temp: '36.6°C', 
      tempStatus: 'Normal & Thermally Regulated (Target: 36.5°C - 37.1°C)',
      bp: '118/76 mmHg',
      bpStatus: 'Optimal Normotensive (Systolic 118 / Diastolic 76)',
      healthIssues: 'NONE REPORTED — 0 Medical Flags. Zero heat exhaustion, zero dehydration, zero combat wounds.',
      healthIssuesLevel: 'CLEAR',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (Indian Armed Forces Highest Unrestricted Combat Duty Category)',
      hydration: '98% Hydrated (Oral electrolyte salts scheduled)',
      stressIndex: 'Low (Zone-1 Aerobic Endurance)',
      status: 'PEAK PERFORMANCE', 
      badge: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
      commandSample: [
        { rankName: 'Major Vikram Chauhan (Squad Commander)', bp: '116/74 mmHg', temp: '36.6°C', hr: '64 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Subedar Arvind Rawat (Lead Scout)', bp: '118/76 mmHg', temp: '36.5°C', hr: '67 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Havildar R. Rathore (Combat Medic)', bp: '120/78 mmHg', temp: '36.7°C', hr: '65 BPM', spo2: '100%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Naik Sandeep Singh (Radio & Comms)', bp: '119/75 mmHg', temp: '36.6°C', hr: '68 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' }
      ]
    },
    { 
      id: 'sq-2',
      unit: '3 Vikas Regiment (Special Frontier Force - High Altitude)', 
      tag: 'HIGH_ALTITUDE',
      sector: 'Siachen Ridge & Depsang Corridor (18,500 ft)',
      count: '280 Deployed', 
      hr: '71 BPM', 
      spo2: '98%', 
      temp: '36.5°C', 
      tempStatus: 'Core Temperature Stable under Cryo-Armor (-42°C Outside)',
      bp: '122/80 mmHg',
      bpStatus: 'Optimal Altitude Adaptation (Normal pulmonary pressure)',
      healthIssues: 'NONE REPORTED — 0 Medical Flags. Fully acclimatized Stage-3, zero Acute Mountain Sickness (AMS), zero frostbite.',
      healthIssuesLevel: 'CLEAR',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (High Altitude Warfare Specialized Clearance)',
      hydration: '96% Hydrated (Thermal liquid flasks active)',
      stressIndex: 'Nominal Alpine Endurance',
      status: 'ACCLIMATIZED', 
      badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      commandSample: [
        { rankName: 'Col. K. Tenzing (Regiment CO)', bp: '120/78 mmHg', temp: '36.5°C', hr: '70 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Subedar L. Dorjee (Alpine Scout)', bp: '122/80 mmHg', temp: '36.4°C', hr: '72 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Havildar P. Angchuk (Snow Survival Medic)', bp: '121/79 mmHg', temp: '36.6°C', hr: '69 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Rifleman S. Gurung (Heavy Sniper)', bp: '124/81 mmHg', temp: '36.5°C', hr: '73 BPM', spo2: '97%', healthIssues: 'None', fit: 'YES' }
      ]
    },
    { 
      id: 'sq-3',
      unit: 'MARCOS Marine Commando Flight (INS Vikrant Carrier Group)', 
      tag: 'MARITIME',
      sector: 'Carrier Battle Group • Arabian Sea Deep Maritime',
      count: '125 Deployed', 
      hr: '63 BPM', 
      spo2: '100%', 
      temp: '36.7°C', 
      tempStatus: 'Optimal Marine Thermoregulation',
      bp: '115/72 mmHg',
      bpStatus: 'Athletic / Endurance Normotensive (Systolic 115 / Diastolic 72)',
      healthIssues: 'NONE REPORTED — 0 Medical Flags. Zero barotrauma from tactical diving, zero hypothermia, clear tympanic membrane.',
      healthIssuesLevel: 'CLEAR',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (Special Maritime Clearance / Deep Dive Combat Qualified)',
      hydration: '99% Optimal',
      stressIndex: 'Minimal Resting Reserve',
      status: 'OPTIMAL', 
      badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      commandSample: [
        { rankName: 'Lt. Commander A. Roy (Flight Lead)', bp: '114/72 mmHg', temp: '36.7°C', hr: '62 BPM', spo2: '100%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Petty Officer D. Patil (Dive Master)', bp: '116/74 mmHg', temp: '36.6°C', hr: '64 BPM', spo2: '100%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Leading Seaman K. Nair (Maritime Medic)', bp: '115/73 mmHg', temp: '36.8°C', hr: '63 BPM', spo2: '100%', healthIssues: 'None', fit: 'YES' }
      ]
    },
    { 
      id: 'sq-4',
      unit: '5/8 Gorkha Rifles (Eastern Sector - Tawang Mountain Ridge)', 
      tag: 'HIGH_ALTITUDE',
      sector: 'Eastern Ridge Pass Choke Points (14,200 ft)',
      count: '360 Deployed', 
      hr: '73 BPM', 
      spo2: '97%', 
      temp: '36.6°C', 
      tempStatus: 'Sub-Zero Thermally Insulated',
      bp: '120/78 mmHg',
      bpStatus: 'Healthy Mountain Patrol Normotensive',
      healthIssues: 'NONE REPORTED — 0 Medical Flags. Peripheral extremity circulation verified; zero chilblains or pulmonary edema.',
      healthIssuesLevel: 'CLEAR',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (Eastern High-Altitude Combat Cleared)',
      hydration: '97% Hydrated',
      stressIndex: 'Nominal Operational State',
      status: 'SUB-ZERO STABLE', 
      badge: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
      commandSample: [
        { rankName: 'Maj. S. K. Thapa (Battalion 2IC)', bp: '119/77 mmHg', temp: '36.6°C', hr: '71 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Subedar D. B. Rana (Scout Leader)', bp: '121/79 mmHg', temp: '36.5°C', hr: '74 BPM', spo2: '97%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Havildar B. Gurung (Mountain Medic)', bp: '120/78 mmHg', temp: '36.7°C', hr: '72 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' }
      ]
    },
    { 
      id: 'sq-5',
      unit: 'Garud Special Forces Command (Western Air Defense Enclave)', 
      tag: 'SPECIAL_FORCES',
      sector: 'Air Defense Airborne Rapid Reaction Perimeter',
      count: '190 Deployed', 
      hr: '68 BPM', 
      spo2: '99%', 
      temp: '36.8°C', 
      tempStatus: 'Normal Resting Range',
      bp: '117/75 mmHg',
      bpStatus: 'Optimal Dynamic Baseline',
      healthIssues: 'NONE REPORTED — 0 Medical Flags. Zero auditory blast injury, zero vision fatigue under FLIR/NVG optics.',
      healthIssuesLevel: 'CLEAR',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (Airborne Assault & Counter-Terror Qualified)',
      hydration: '98% Hydrated',
      stressIndex: 'High Vigilance / Zero Fatigue',
      status: 'MISSION READY', 
      badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      commandSample: [
        { rankName: 'Squadron Leader R. Verma (Troop Commander)', bp: '116/74 mmHg', temp: '36.8°C', hr: '67 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Junior Warrant Officer M. Ali (Airborne Scout)', bp: '118/76 mmHg', temp: '36.7°C', hr: '69 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Sergeant K. Sen (Specialist Medic)', bp: '117/75 mmHg', temp: '36.9°C', hr: '68 BPM', spo2: '100%', healthIssues: 'None', fit: 'YES' }
      ]
    },
    { 
      id: 'sq-6',
      unit: '17 Kumaon Mechanized Recon (Northern Forward Command)', 
      tag: 'SPECIAL_FORCES',
      sector: 'Northern Forward High-Mobility Armored Axis',
      count: '440 Deployed', 
      hr: '75 BPM', 
      spo2: '98%', 
      temp: '36.9°C', 
      tempStatus: 'Armor Cabin Regulated (36.9°C)',
      bp: '124/82 mmHg',
      bpStatus: 'Active Armored Crew Normotensive',
      healthIssues: 'RESOLVED MILD FATIGUE — 2 crew members monitored for mild desert heat dehydration; electrolyte IV given, vitals 100% restored.',
      healthIssuesLevel: 'MONITORED_STABLE',
      isCombatFit: true,
      fitVerdict: 'FIT FOR DUTY: YES',
      medicalClassification: 'SHAPE-1 (Mechanized Recon Full Field Duty)',
      hydration: '95% Hydrated (Hydration replenishment ongoing)',
      stressIndex: 'Controlled Operational Pacing',
      status: 'HYDRATION NORMAL', 
      badge: 'text-amber-400 bg-amber-950/80 border-amber-500/50',
      commandSample: [
        { rankName: 'Col. H. S. Bisht (Regiment Commander)', bp: '122/80 mmHg', temp: '36.8°C', hr: '73 BPM', spo2: '98%', healthIssues: 'None', fit: 'YES' },
        { rankName: 'Subedar M. Joshi (Armor Crew Lead)', bp: '125/83 mmHg', temp: '37.0°C', hr: '76 BPM', spo2: '98%', healthIssues: 'Hydrated (Resolved)', fit: 'YES' },
        { rankName: 'Havildar R. Pant (Field Medic)', bp: '123/81 mmHg', temp: '36.9°C', hr: '74 BPM', spo2: '99%', healthIssues: 'None', fit: 'YES' }
      ]
    },
  ];

  const filteredSquads = unitFilter === 'ALL'
    ? squadTelemetry
    : squadTelemetry.filter(sq => sq.tag === unitFilter);

  // Filter individual soldiers
  const filteredSoldiers = INDIVIDUAL_SOLDIERS_ROSTER.filter(soldier => {
    const matchesCategory = soldierRankCategory === 'ALL' || soldier.category === soldierRankCategory;
    const matchesSearch = soldierSearch.trim() === '' || 
      soldier.name.toLowerCase().includes(soldierSearch.toLowerCase()) ||
      soldier.rank.toLowerCase().includes(soldierSearch.toLowerCase()) ||
      soldier.unit.toLowerCase().includes(soldierSearch.toLowerCase()) ||
      soldier.serviceNo.toLowerCase().includes(soldierSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedSoldier = INDIVIDUAL_SOLDIERS_ROSTER.find(s => s.id === selectedSoldierId) || INDIVIDUAL_SOLDIERS_ROSTER[0];

  return (
    <>
      <div 
        className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl cursor-pointer group hover:border-cyan-500/40 transition"
        id="soldier-health-widget"
        onClick={() => {
          setModalTab('SOLDIERS');
          setShowModal(true);
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
              SOLDIER HEALTH
            </h3>
          </div>

          <button 
            type="button"
            id="soldier-health-view-all-btn"
            onClick={(e) => {
              e.stopPropagation();
              setModalTab('SOLDIERS');
              setShowModal(true);
            }}
            className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Circular Percentage Gauges */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {vitals.map((v) => {
            const radius = 22;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (v.value / 100) * circumference;

            return (
              <div 
                key={v.label} 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalTab('SOLDIERS');
                  setShowModal(true);
                }}
                className="flex flex-col items-center text-center cursor-pointer group/gauge"
                title={`${v.label}: ${v.value}% (${v.note})`}
              >
                <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover/gauge:scale-105">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    {/* Background Track */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="3.5"
                    />
                    {/* Progress Arc */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke={v.color}
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>

                  {/* Center Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                    {v.value}%
                  </div>
                </div>

                {/* Label */}
                <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/gauge:text-cyan-300">
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Soldier Telemetry Ticker Strip with Soldier Name, Rank, BP, and Temp */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-mono-code text-cyan-300 flex items-center justify-between">
            <span className="font-bold text-slate-400 uppercase text-[9px]">Live Soldier Telemetry:</span>
            <span className="text-emerald-400 font-bold text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% SHAPE-1 Fit
            </span>
          </div>
          <div className="text-[9.5px] font-mono-code text-slate-300 truncate mt-0.5">
            <strong className="text-white">Maj. Vikram</strong> (BP: <span className="text-amber-300">116/74</span>, Temp: <span className="text-sky-300">36.6°C</span>) • <strong className="text-white">Sub. Rawat</strong> (BP: <span className="text-amber-300">118/76</span>, Temp: <span className="text-sky-300">36.5°C</span>)
          </div>
        </div>

        {/* Operational Pulse Line */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-emerald-400 font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>19,450 Personnel Stable</span>
          </div>

          {/* Green ECG Waveform */}
          <svg className="w-16 h-3.5 text-emerald-400" viewBox="0 0 60 16" fill="none">
            <path
              d="M0 8 H15 L20 2 L25 14 L30 4 L35 10 L40 8 H60"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* DETAILED SOLDIER HEALTH MODAL WITH FULL BIOMETRIC INSPECTIONS */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          id="soldier-health-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="max-w-5xl w-full bg-[#020b1c] border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 animate-fade-in max-h-[92vh] overflow-y-auto"
            id="soldier-health-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <HeartPulse className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-tech font-bold text-white uppercase tracking-wider">
                    SOLDIER COMBAT HEALTH & BIOMETRIC TELEMETRY
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono-code text-cyan-400">
                    REAL-TIME WEARABLE BIOSENSOR ENCLAVE • INDIVIDUAL SOLDIER ROSTER (NAME • RANK • BP • TEMPERATURE)
                  </p>
                </div>
              </div>
              <button 
                type="button"
                id="close-soldier-modal-btn"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            {/* Overall Vitals Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Cardiac Load</div>
                <div className="text-xl font-tech font-bold text-emerald-400 mt-0.5">68 BPM</div>
                <div className="text-[9.5px] font-mono-code text-emerald-300">Zone-1 Aerobic Pace</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Oxygen (SpO2)</div>
                <div className="text-xl font-tech font-bold text-cyan-400 mt-0.5">99.4%</div>
                <div className="text-[9.5px] font-mono-code text-cyan-300">Hyperbaric Saturation</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Core Body Temp</div>
                <div className="text-xl font-tech font-bold text-sky-400 mt-0.5">36.7°C</div>
                <div className="text-[9.5px] font-mono-code text-sky-300">Armor Thermally Regulated</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase">Combat Ready Index</div>
                <div className="text-xl font-tech font-bold text-emerald-400 mt-0.5">99.8%</div>
                <div className="text-[9.5px] font-mono-code text-emerald-300">19,450 Battle Fit</div>
              </div>
            </div>

            {/* PRIMARY VIEW MODE SWITCHER (SOLDIER ROSTER vs DEPLOYED UNITS) */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="tab-soldiers-roster"
                  onClick={() => setModalTab('SOLDIERS')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    modalTab === 'SOLDIERS'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>INDIVIDUAL SOLDIERS (LIVE ROSTER)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/40 ml-1">
                    {INDIVIDUAL_SOLDIERS_ROSTER.length}
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-deployed-units"
                  onClick={() => setModalTab('UNITS')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    modalTab === 'UNITS'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>DEPLOYED UNITS & SQUADS</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/40 ml-1">
                    {squadTelemetry.length}
                  </span>
                </button>
              </div>

              <div className="text-[11px] font-mono-code text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All Personnel Wearable Biosensors: 100% Synced</span>
              </div>
            </div>

            {/* ================= VIEW 1: INDIVIDUAL SOLDIERS LIVE ROSTER ================= */}
            {modalTab === 'SOLDIERS' && (
              <div className="space-y-3 animate-fade-in">
                {/* Search & Rank Filter Bar */}
                <div className="flex items-center justify-between flex-wrap gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-mono-code text-slate-400 mr-1 flex items-center gap-1">
                      <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                      <span>FILTER RANK:</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setSoldierRankCategory('ALL')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        soldierRankCategory === 'ALL'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      ALL ({INDIVIDUAL_SOLDIERS_ROSTER.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSoldierRankCategory('OFFICER')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        soldierRankCategory === 'OFFICER'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-950 text-cyan-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      OFFICERS ({INDIVIDUAL_SOLDIERS_ROSTER.filter(s => s.category === 'OFFICER').length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSoldierRankCategory('JCO')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        soldierRankCategory === 'JCO'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-950 text-amber-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      JCOs ({INDIVIDUAL_SOLDIERS_ROSTER.filter(s => s.category === 'JCO').length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSoldierRankCategory('NCO_JAWAN')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        soldierRankCategory === 'NCO_JAWAN'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-950 text-emerald-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      NCOs & JAWANS ({INDIVIDUAL_SOLDIERS_ROSTER.filter(s => s.category === 'NCO_JAWAN').length})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="w-full sm:w-64">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={soldierSearch}
                        onChange={(e) => setSoldierSearch(e.target.value)}
                        placeholder="Search Soldier Name, Rank..."
                        className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-lg pl-8 pr-2.5 py-1 text-xs font-mono-code text-slate-200 placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Soldier Biometrics Table: PROMINENT SOLDIER NAME, RANK, BP, TEMPERATURE */}
                <div className="rounded-xl border border-cyan-500/40 bg-[#021128]/80 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono-code">
                      <thead className="bg-[#041c3d] text-cyan-300 border-b border-cyan-500/30 uppercase text-[10.5px]">
                        <tr>
                          <th className="py-2.5 px-3 font-tech font-bold text-white">SOLDIER NAME</th>
                          <th className="py-2.5 px-3 font-tech font-bold text-cyan-300">RANK</th>
                          <th className="py-2.5 px-3 font-tech font-bold text-amber-300">BLOOD PRESSURE (BP)</th>
                          <th className="py-2.5 px-3 font-tech font-bold text-sky-300">TEMPERATURE</th>
                          <th className="py-2.5 px-3">PULSE (HR)</th>
                          <th className="py-2.5 px-3">OXYGEN (SpO2)</th>
                          <th className="py-2.5 px-3">HEALTH ISSUES</th>
                          <th className="py-2.5 px-3">FITNESS</th>
                          <th className="py-2.5 px-3">ASSIGNED UNIT & SECTOR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {filteredSoldiers.map((soldier) => {
                          const isSelected = selectedSoldierId === soldier.id;

                          return (
                            <tr
                              key={soldier.id}
                              onClick={() => setSelectedSoldierId(soldier.id)}
                              className={`transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-950/70 border-l-4 border-l-cyan-400 text-white font-medium'
                                  : 'hover:bg-slate-900/60 text-slate-300'
                              }`}
                            >
                              {/* 1. SOLDIER NAME */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <div className="font-tech font-bold text-white text-xs flex items-center gap-1.5">
                                  <span>{soldier.name}</span>
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                  )}
                                </div>
                                <div className="text-[9px] text-slate-400 font-mono-code">
                                  ID: {soldier.serviceNo} • {soldier.role}
                                </div>
                              </td>

                              {/* 2. RANK */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold border ${
                                  soldier.category === 'OFFICER'
                                    ? 'bg-blue-950/80 border-blue-500/60 text-blue-300'
                                    : soldier.category === 'JCO'
                                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                                    : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                                }`}>
                                  {soldier.rank}
                                </span>
                              </td>

                              {/* 3. BLOOD PRESSURE (BP) */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className="font-tech font-bold text-amber-300 text-xs px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30">
                                  {soldier.bp}
                                </span>
                              </td>

                              {/* 4. TEMPERATURE */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className="font-tech font-bold text-sky-300 text-xs px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/30 flex items-center gap-1 w-fit">
                                  <Thermometer className="w-3 h-3 text-sky-400" />
                                  <span>{soldier.temp}</span>
                                </span>
                              </td>

                              {/* Heart Rate */}
                              <td className="py-2 px-3 whitespace-nowrap text-emerald-300">
                                {soldier.hr}
                              </td>

                              {/* SpO2 */}
                              <td className="py-2 px-3 whitespace-nowrap text-cyan-300">
                                {soldier.spo2}
                              </td>

                              {/* Health Issues */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[9.5px] text-emerald-400">
                                  {soldier.healthIssues}
                                </span>
                              </td>

                              {/* Fitness Status */}
                              <td className="py-2 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[9.5px] inline-flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" />
                                  {soldier.fit}
                                </span>
                              </td>

                              {/* Assigned Unit & Sector */}
                              <td className="py-2 px-3 whitespace-nowrap text-[10px] text-slate-400">
                                <div className="text-slate-200 truncate max-w-[180px]">{soldier.unit}</div>
                                <div className="text-slate-400 truncate max-w-[180px]">{soldier.sector}</div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Selected Soldier Detailed Biosensor Dossier Card */}
                {selectedSoldier && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-2.5 animate-fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                          <HeartPulse className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-tech font-bold text-white flex items-center gap-2">
                            <span>{selectedSoldier.rank} {selectedSoldier.name}</span>
                            <span className="text-[10px] font-mono-code text-cyan-400">({selectedSoldier.serviceNo})</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/40 text-[9.5px] text-emerald-300">
                              COMBAT FIT (SHAPE-1)
                            </span>
                          </div>
                          <div className="text-[10px] font-mono-code text-slate-400">
                            {selectedSoldier.unit} • {selectedSoldier.sector} • Role: {selectedSoldier.role}
                          </div>
                        </div>
                      </div>

                      {/* Live ECG Waveform Animation */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-code text-emerald-400">Live ECG:</span>
                        <svg className="w-24 h-5 text-emerald-400" viewBox="0 0 80 18" fill="none">
                          <path
                            d="M0 9 H20 L25 3 L30 16 L35 4 L40 12 L45 9 H80"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code">
                      <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Blood Pressure (BP)</div>
                        <div className="text-base font-tech font-bold text-amber-300 mt-0.5">{selectedSoldier.bp}</div>
                        <div className="text-[9px] text-emerald-400">Optimal Normotensive</div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Body Temperature</div>
                        <div className="text-base font-tech font-bold text-sky-300 mt-0.5">{selectedSoldier.temp}</div>
                        <div className="text-[9px] text-emerald-400">Armor Regulated</div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Heart Rate & SpO2</div>
                        <div className="text-base font-tech font-bold text-emerald-300 mt-0.5">{selectedSoldier.hr} • {selectedSoldier.spo2}</div>
                        <div className="text-[9px] text-cyan-400">Aerobic Baseline</div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">Health Issues & Fitness</div>
                        <div className="text-base font-tech font-bold text-emerald-400 mt-0.5">FIT: YES</div>
                        <div className="text-[9px] text-slate-300">{selectedSoldier.healthIssues}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= VIEW 2: DEPLOYED UNITS & SQUADS ================= */}
            {modalTab === 'UNITS' && (
              <div className="space-y-3 animate-fade-in">
                {/* Filter Tabs for Units */}
                <div className="flex items-center justify-between flex-wrap gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-mono-code text-slate-400 mr-1 flex items-center gap-1">
                      <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                      <span>FILTER UNITS:</span>
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setUnitFilter('ALL')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        unitFilter === 'ALL'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      ALL UNITS ({squadTelemetry.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setUnitFilter('SPECIAL_FORCES')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        unitFilter === 'SPECIAL_FORCES'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      SPECIAL FORCES (3)
                    </button>

                    <button
                      type="button"
                      onClick={() => setUnitFilter('HIGH_ALTITUDE')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        unitFilter === 'HIGH_ALTITUDE'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      HIGH ALTITUDE (2)
                    </button>

                    <button
                      type="button"
                      onClick={() => setUnitFilter('MARITIME')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                        unitFilter === 'MARITIME'
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      MARITIME (1)
                    </button>
                  </div>

                  <div className="text-[11px] font-mono-code text-cyan-400">
                    Click any squad below to expand biometrics
                  </div>
                </div>

                {/* List of Deployed Units with Clear Interactive Selection */}
                <div className="space-y-2">
                  <div className="text-xs font-mono-code font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
                    <span>DEPLOYED UNITS BIOMETRIC BREAKDOWN ({filteredSquads.length} UNITS)</span>
                    <span className="text-[10.5px] text-emerald-400 flex items-center gap-1 font-normal">
                      <CheckCircle2 className="w-3 h-3" />
                      All Units 100% SHAPE-1 Combat Qualified
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono-code">
                    {filteredSquads.map((sq) => {
                      const isSelected = selectedUnitId === sq.id;

                      return (
                        <div 
                          key={sq.id} 
                          className={`rounded-xl border transition-all ${
                            isSelected 
                              ? 'bg-[#031533]/90 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/50' 
                              : 'bg-[#031533]/50 border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#031533]/70'
                          }`}
                        >
                          {/* Clickable Unit Card Header */}
                          <div 
                            onClick={() => setSelectedUnitId(isSelected ? '' : sq.id)}
                            className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer select-none"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-white font-tech font-bold text-xs sm:text-sm">
                                  {sq.unit}
                                </span>
                                {isSelected && (
                                  <span className="text-[9.5px] font-mono-code text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                                    ACTIVE INSPECTION
                                  </span>
                                )}
                              </div>
                              <div className="text-[10.5px] text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span>{sq.count}</span>
                                <span>• HR: <strong className="text-emerald-300">{sq.hr}</strong></span>
                                <span>• SpO2: <strong className="text-cyan-300">{sq.spo2}</strong></span>
                                <span>• Temp: <strong className="text-sky-300">{sq.temp}</strong></span>
                                <span>• BP: <strong className="text-amber-300">{sq.bp}</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2.5 py-0.5 rounded-md border text-[9.5px] font-mono-code font-bold ${sq.badge}`}>
                                {sq.status}
                              </span>
                              <div className="p-1 rounded-lg bg-slate-800/80 text-cyan-400 hover:text-white transition">
                                {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>
                          </div>

                          {/* EXPANDED SQUAD BIOMETRIC DOSSIER */}
                          {isSelected && (
                            <div className="px-3.5 pb-4 pt-2 border-t border-cyan-500/30 space-y-3 bg-slate-950/70 rounded-b-xl animate-fade-in">
                              
                              {/* Top Metric Cards: Body Temperature, BP, Health Issues, Combat Fitness */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                                
                                {/* 1. BODY TEMPERATURE CARD */}
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/40 shadow-sm space-y-1">
                                  <div className="text-[10px] font-mono-code text-sky-400 uppercase font-bold flex items-center gap-1.5">
                                    <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                                    <span>BODY TEMPERATURE</span>
                                  </div>
                                  <div className="text-2xl font-tech font-bold text-white">
                                    {sq.temp}
                                  </div>
                                  <div className="text-[10px] text-emerald-300 font-mono-code flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span>{sq.tempStatus}</span>
                                  </div>
                                  <div className="text-[9px] text-slate-400 font-mono-code">
                                    Optimal Safe Range: 36.5°C – 37.2°C
                                  </div>
                                </div>

                                {/* 2. BLOOD PRESSURE (BP) CARD */}
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 shadow-sm space-y-1">
                                  <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                                    <span>BLOOD PRESSURE (BP)</span>
                                  </div>
                                  <div className="text-2xl font-tech font-bold text-white">
                                    {sq.bp}
                                  </div>
                                  <div className="text-[10px] text-emerald-300 font-mono-code flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span>{sq.bpStatus}</span>
                                  </div>
                                  <div className="text-[9px] text-slate-400 font-mono-code">
                                    Pulse: {sq.hr} • SpO2: {sq.spo2}
                                  </div>
                                </div>

                                {/* 3. HEALTH ISSUES CARD */}
                                <div className={`p-3 rounded-xl border shadow-sm space-y-1 ${
                                  sq.healthIssuesLevel === 'CLEAR' 
                                    ? 'bg-emerald-950/30 border-emerald-500/40' 
                                    : 'bg-amber-950/30 border-amber-500/40'
                                }`}>
                                  <div className="text-[10px] font-mono-code text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                                    <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>HEALTH ISSUES STATUS</span>
                                  </div>
                                  <div className={`text-base font-tech font-bold ${
                                    sq.healthIssuesLevel === 'CLEAR' ? 'text-emerald-300' : 'text-amber-300'
                                  }`}>
                                    {sq.healthIssuesLevel === 'CLEAR' ? '0 MEDICAL FLAGS' : 'MONITORED & STABLE'}
                                  </div>
                                  <div className="text-[9.5px] text-slate-300 font-mono-code leading-relaxed">
                                    {sq.healthIssues}
                                  </div>
                                </div>

                                {/* 4. COMBAT FITNESS VERDICT CARD */}
                                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 shadow-sm space-y-1">
                                  <div className="text-[10px] font-mono-code text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>FIT OR NOT VERDICT</span>
                                  </div>
                                  <div className="text-xl font-tech font-bold text-white flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-xs">
                                      {sq.fitVerdict}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-emerald-300 font-mono-code">
                                    {sq.medicalClassification}
                                  </div>
                                </div>

                              </div>

                              {/* Unit Personnel Table With Soldier Name, Rank, BP, and Temperature */}
                              <div className="pt-2 border-t border-slate-800">
                                <div className="text-[11px] font-tech font-bold text-cyan-300 uppercase mb-1.5 flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Unit Personnel Roster (Soldier Name, Rank, BP & Temperature)</span>
                                </div>

                                <div className="overflow-x-auto rounded-lg border border-slate-800">
                                  <table className="w-full text-left text-xs font-mono-code">
                                    <thead className="bg-slate-900/90 text-cyan-300 border-b border-slate-800 uppercase text-[10px]">
                                      <tr>
                                        <th className="py-2 px-3 font-tech font-bold text-white">SOLDIER NAME & RANK</th>
                                        <th className="py-2 px-3 font-tech font-bold text-sky-300">BODY TEMPERATURE</th>
                                        <th className="py-2 px-3 font-tech font-bold text-amber-300">BLOOD PRESSURE (BP)</th>
                                        <th className="py-2 px-3">HEART RATE</th>
                                        <th className="py-2 px-3">SPO2</th>
                                        <th className="py-2 px-3">HEALTH ISSUES</th>
                                        <th className="py-2 px-3">FITNESS</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                                      {sq.commandSample.map((soldier, idx) => (
                                        <tr key={idx} className="hover:bg-slate-900/40">
                                          <td className="py-2 px-3 font-tech font-bold text-white whitespace-nowrap">
                                            {soldier.rankName}
                                          </td>
                                          <td className="py-2 px-3 text-sky-300 font-bold whitespace-nowrap">
                                            {soldier.temp}
                                          </td>
                                          <td className="py-2 px-3 text-amber-300 font-bold whitespace-nowrap">
                                            {soldier.bp}
                                          </td>
                                          <td className="py-2 px-3 text-emerald-300 whitespace-nowrap">
                                            {soldier.hr}
                                          </td>
                                          <td className="py-2 px-3 text-cyan-300 whitespace-nowrap">
                                            {soldier.spo2}
                                          </td>
                                          <td className="py-2 px-3 text-emerald-400 whitespace-nowrap">
                                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9.5px]">
                                              {soldier.healthIssues}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3 whitespace-nowrap">
                                            <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[9.5px] inline-flex items-center gap-1">
                                              <Check className="w-2.5 h-2.5" />
                                              FIT: YES
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs font-mono-code text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Smart Combat Armor Bio-Mesh: 100% Synced • All 19,450 Personnel SHAPE-1 Cleared</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer shadow-md transition"
                >
                  Acknowledge Vitals
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End modal */}
    </>
  );
};

// Backward compatibility aliases
export const SystemHealthGauges = SoldierHealthGauges;
export default SoldierHealthGauges;
