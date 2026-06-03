// --- Weather & Environmental by City ---
export const getWeatherData = (city: string) => {
  if (city === 'Bekasi') {
    return { temp: 33.5, rh: 62, aqi: 45, aqiStatus: 'Moderate' };
  }
  if (city === 'Indralaya Utara') {
    return { temp: 34.1, rh: 78, aqi: 18, aqiStatus: 'Good' };
  }
  if (city === 'Surabaya') {
    return { temp: 35.2, rh: 70, aqi: 52, aqiStatus: 'Moderate' };
  }
  return { temp: 31.2, rh: 65, aqi: 23, aqiStatus: 'Good' };
};

// --- HVAC Assets ---
const hvacAssetsArRoyyan = [
  { id: 'AHU-1', type: 'AHU', status: 'ON', load: 72, temp: 7.2, power: 85 },
  { id: 'AHU-2', type: 'AHU', status: 'ON', load: 68, temp: 7.4, power: 80 },
  { id: 'AHU-3', type: 'AHU', status: 'OFF', load: 0, temp: 14.0, power: 0 },
];

const hvacAssetsCipadung = [
  { id: 'CH-1', type: 'Chiller', status: 'ON', load: 85, temp: 6.8, power: 250 },
  { id: 'CH-2', type: 'Chiller', status: 'ON', load: 82, temp: 6.9, power: 245 },
  { id: 'CH-3', type: 'Chiller', status: 'ON', load: 78, temp: 6.8, power: 230 },
  { id: 'CH-4', type: 'Chiller', status: 'OFF', load: 0, temp: 12.1, power: 0 },
];

const hvacAssetsBekasi = [
  { id: 'CH-1', type: 'Chiller', status: 'ON', load: 92, temp: 6.5, power: 280 },
  { id: 'CH-2', type: 'Chiller', status: 'ON', load: 88, temp: 6.6, power: 275 },
  { id: 'CH-3', type: 'Chiller', status: 'OFF', load: 0, temp: 15.2, power: 0 },
];

const hvacAssetsSurabaya = [
  { id: 'CH-1', type: 'Chiller', status: 'ON', load: 95, temp: 6.2, power: 320 },
  { id: 'CH-2', type: 'Chiller', status: 'ON', load: 90, temp: 6.3, power: 310 },
  { id: 'CH-3', type: 'Chiller', status: 'ON', load: 85, temp: 6.5, power: 290 },
  { id: 'CH-4', type: 'Chiller', status: 'OFF', load: 0, temp: 15.0, power: 0 },
];

export const getHvacAssets = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') return hvacAssetsArRoyyan;
  if (hospitalId === 'bekasi') return hvacAssetsBekasi;
  if (hospitalId === 'surabaya') return hvacAssetsSurabaya;
  return hvacAssetsCipadung;
};

// --- Floor Data ---
export const getFloorData = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') {
    // RS Ar Royyan: 3 Lantai, 150 Bed (Lantai 3: 110 bed, Lantai 2: 48 bed+ICU, Lantai 1: non-bed)
    return [
      { floor: 'L3', name: 'Lantai 3', status: 'Warning', beds: 110, occupied: 92 },
      { floor: 'L2', name: 'Lantai 2', status: 'Critical', beds: 48, occupied: 45 },
      { floor: 'L1', name: 'Lantai 1', status: 'Normal', beds: 0, occupied: 0 },
    ];
  }
  if (hospitalId === 'bekasi') {
    return [
      { floor: 'RF', name: 'Roof', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'L12', name: 'Level 12', status: 'Normal', beds: 20, occupied: 18 },
      { floor: 'L11', name: 'Level 11', status: 'Normal', beds: 20, occupied: 15 },
      { floor: 'L10', name: 'Level 10', status: 'Normal', beds: 20, occupied: 19 },
      { floor: 'L9', name: 'Level 9', status: 'Normal', beds: 20, occupied: 14 },
      { floor: 'L8', name: 'Level 8', status: 'Normal', beds: 20, occupied: 12 },
      { floor: 'L7', name: 'Level 7', status: 'Critical', beds: 20, occupied: 20 },
      { floor: 'L6', name: 'Level 6', status: 'Normal', beds: 20, occupied: 11 },
      { floor: 'L5', name: 'Level 5', status: 'Normal', beds: 20, occupied: 13 },
      { floor: 'L4', name: 'Level 4', status: 'Normal', beds: 20, occupied: 10 },
      { floor: 'L3', name: 'Level 3', status: 'Warning', beds: 20, occupied: 16 },
      { floor: 'L2', name: 'Level 2', status: 'Normal', beds: 25, occupied: 22 },
      { floor: 'L1', name: 'Level 1', status: 'Normal', beds: 25, occupied: 20 },
      { floor: 'B1', name: 'Basement 1', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'B2', name: 'Basement 2', status: 'Normal', beds: 0, occupied: 0 },
    ];
  }
  if (hospitalId === 'surabaya') {
    return [
      { floor: 'RF', name: 'Roof', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'L15', name: 'Level 15', status: 'Normal', beds: 25, occupied: 22 },
      { floor: 'L14', name: 'Level 14', status: 'Normal', beds: 25, occupied: 21 },
      { floor: 'L13', name: 'Level 13', status: 'Normal', beds: 25, occupied: 18 },
      { floor: 'L12', name: 'Level 12', status: 'Normal', beds: 25, occupied: 24 },
      { floor: 'L11', name: 'Level 11', status: 'Normal', beds: 25, occupied: 19 },
      { floor: 'L10', name: 'Level 10', status: 'Warning', beds: 25, occupied: 23 },
      { floor: 'L9', name: 'Level 9', status: 'Normal', beds: 25, occupied: 20 },
      { floor: 'L8', name: 'Level 8', status: 'Normal', beds: 25, occupied: 15 },
      { floor: 'L7', name: 'Level 7', status: 'Critical', beds: 25, occupied: 25 },
      { floor: 'L6', name: 'Level 6', status: 'Normal', beds: 25, occupied: 17 },
      { floor: 'L5', name: 'Level 5', status: 'Normal', beds: 25, occupied: 21 },
      { floor: 'L4', name: 'Level 4', status: 'Normal', beds: 25, occupied: 16 },
      { floor: 'L3', name: 'Level 3', status: 'Normal', beds: 30, occupied: 28 },
      { floor: 'L2', name: 'Level 2', status: 'Normal', beds: 30, occupied: 25 },
      { floor: 'L1', name: 'Level 1', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'B1', name: 'Basement 1', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'B2', name: 'Basement 2', status: 'Normal', beds: 0, occupied: 0 },
      { floor: 'B3', name: 'Basement 3', status: 'Normal', beds: 0, occupied: 0 },
    ];
  }
  return [
    { floor: 'RF', name: 'Roof', status: 'Normal', beds: 0, occupied: 0 },
    { floor: 'L9', name: 'Level 9', status: 'Normal', beds: 15, occupied: 12 },
    { floor: 'L8', name: 'Level 8', status: 'Normal', beds: 15, occupied: 14 },
    { floor: 'L7', name: 'Level 7', status: 'Normal', beds: 15, occupied: 10 },
    { floor: 'L6', name: 'Level 6', status: 'Normal', beds: 15, occupied: 11 },
    { floor: 'L5', name: 'Level 5', status: 'Critical', beds: 15, occupied: 15 },
    { floor: 'L4', name: 'Level 4', status: 'Normal', beds: 15, occupied: 13 },
    { floor: 'L3', name: 'Level 3', status: 'Normal', beds: 15, occupied: 9 },
    { floor: 'L2', name: 'Level 2', status: 'Normal', beds: 18, occupied: 16 },
    { floor: 'L1', name: 'Level 1', status: 'Warning', beds: 18, occupied: 12 },
    { floor: 'B1', name: 'Basement 1', status: 'Normal', beds: 0, occupied: 0 },
  ];
};

// --- Alarms ---
export const getAlarmList = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') {
    return [
      { id: 'AL-3003', time: '13:22:05', system: 'HVAC', severity: 'Warning', message: 'AC Filter Dirty — R.A3 (Lantai 3)', status: 'Active' },
      { id: 'AL-3002', time: '12:50:18', system: 'HVAC', severity: 'Critical', message: 'ΔP Alert — Ruang Operasi (Lantai 2)', status: 'Active' },
      { id: 'AL-3001', time: '11:30:00', system: 'Nurse Call', severity: 'Warning', message: 'Nurse Call Active — Rawat Inap A L3-08', status: 'Active' },
      { id: 'AL-3000', time: '10:15:44', system: 'Power', severity: 'Info', message: 'MER Panel Voltage Check Passed', status: 'Cleared' },
    ];
  }
  if (hospitalId === 'bekasi') {
    return [
      { id: 'AL-2001', time: '11:15:00', system: 'Power', severity: 'Critical', message: 'Main Incomer 1 Voltage Drop', status: 'Active' },
      { id: 'AL-2000', time: '10:50:12', system: 'Water', severity: 'Warning', message: 'Low Level GWT-1 (15%)', status: 'Active' },
      { id: 'AL-1999', time: '09:20:00', system: 'HVAC', severity: 'Info', message: 'Chiller 1 Maintenance Reminder', status: 'Active' },
    ];
  }
  return [
    { id: 'AL-1002', time: '10:45:22', system: 'HVAC', severity: 'Critical', message: 'AHU-L5-1 Supply Temp High (26°C)', status: 'Active' },
    { id: 'AL-1001', time: '10:42:10', system: 'Nurse Call', severity: 'Critical', message: 'Nurse Call Active L5-04', status: 'Active' },
    { id: 'AL-1000', time: '09:15:00', system: 'Power', severity: 'Warning', message: 'L5 Panel Voltage Fluctuation', status: 'Active' },
    { id: 'AL-0999', time: '08:30:15', system: 'Water', severity: 'Info', message: 'Roof Tank 2 Refill Started', status: 'Acknowledged' },
    { id: 'AL-0998', time: '07:12:05', system: 'Fire', severity: 'Info', message: 'System Self-Test Completed', status: 'Cleared' },
  ];
};

// --- KPI Helpers ---
export const getDashboardKPIs = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') {
    return {
      bor: 91.3,
      energyCost: 'Rp 68M',
      savings: 'Rp 4M',
      esgScore: 'B+',
      alerts: 2
    };
  }
  if (hospitalId === 'bekasi') {
    return {
      bor: 84.2,
      energyCost: 'Rp 312M',
      savings: 'Rp 18M',
      esgScore: 'A',
      alerts: 2
    };
  }
  if (hospitalId === 'surabaya') {
    return {
      bor: 88.6,
      energyCost: 'Rp 480M',
      savings: 'Rp 32M',
      esgScore: 'A',
      alerts: 1
    };
  }
  return {
    bor: 79.4,
    energyCost: 'Rp 245M',
    savings: 'Rp 12M',
    esgScore: 'A+',
    alerts: 0
  };
};

// --- Critical Zones ---
export const getCriticalZones = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') {
    return [
      { zone: 'Ruang Operasi', temp: 20.8, rh: 50, pressure: 10.5, ach: 20.0, status: 'ALERT' },
      { zone: 'ICU', temp: 23.2, rh: 55, pressure: 8.1, ach: 16.0, status: 'OK' },
      { zone: 'R.A3 (Rawat Inap A)', temp: 25.4, rh: 68, pressure: 2.1, ach: 6.0, status: 'DIRTY' },
    ];
  }
  if (hospitalId === 'bekasi') {
    return [
      { zone: 'ICU 1', temp: 23.5, rh: 55, pressure: 10.2, ach: 18.5, status: 'OK' },
      { zone: 'OR A', temp: 21.2, rh: 50, pressure: 15.1, ach: 22.4, status: 'OK' },
      { zone: 'NICU', temp: 24.1, rh: 60, pressure: 5.2, ach: 14.1, status: 'OK' },
    ];
  }
  return [
    { zone: 'OR 1', temp: 22.6, rh: 48, pressure: 12.5, ach: 20.1, status: 'OK' },
    { zone: 'OR 2', temp: 22.8, rh: 47, pressure: 11.8, ach: 19.8, status: 'OK' },
    { zone: 'ICU', temp: 23.1, rh: 52, pressure: 8.2, ach: 16.2, status: 'OK' },
  ];
};

// --- Backward Compatibility Exports ---
export const hvacAssets = hvacAssetsCipadung;
export const criticalZones = [
  { zone: 'OR 1', temp: 22.6, rh: 48, pressure: 12.5, ach: 20.1, status: 'OK' },
  { zone: 'OR 2', temp: 22.8, rh: 47, pressure: 11.8, ach: 19.8, status: 'OK' },
  { zone: 'ICU', temp: 23.1, rh: 52, pressure: 8.2, ach: 16.2, status: 'OK' },
];
export const hvacPowerTrend = Array.from({ length: 24 }).map((_, i) => ({
  time: `${String(10 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '30' : '00'}`,
  actual: 500 + Math.random() * 200,
  yesterday: 600 + Math.random() * 100,
}));
export const alarmList = getAlarmList('cipadung');
export const floorData = getFloorData('cipadung');
export const powerIncomers = [
  { id: 'MDP-1 (PLN)', status: 'ACTIVE', voltage: 385, current: 1250, pf: 0.92, load: 850 },
  { id: 'MDP-2 (PLN)', status: 'ACTIVE', voltage: 384, current: 1100, pf: 0.93, load: 720 },
];
export const gensetData = [
  { id: 'GS-1', status: 'STANDBY', fuel: 85, battery: 26.5 },
  { id: 'GS-2', status: 'STANDBY', fuel: 82, battery: 26.4 },
];
export const powerByFloor = [
  { floor: 'L9', load: 125, status: 'Normal' },
  { floor: 'L8', load: 130, status: 'Normal' },
];

export const coolingTowers = [
  { id: 'CT-1', status: 'ON', speed: 82, supplyTemp: 30.2, power: 12.5 },
  { id: 'CT-2', status: 'ON', speed: 78, supplyTemp: 30.1, power: 11.8 },
  { id: 'CT-3', status: 'OFF', speed: 0, supplyTemp: 28.5, power: 0 },
  { id: 'CT-4', status: 'OFF', speed: 0, supplyTemp: 28.5, power: 0 },
];

export const chwPumps = [
  { id: 'P-1', status: 'ON', flow: 45, power: 18.5 },
  { id: 'P-2', status: 'ON', flow: 42, power: 17.2 },
  { id: 'P-3', status: 'OFF', flow: 0, power: 0 },
  { id: 'P-4', status: 'OFF', flow: 0, power: 0 },
];

export const ahuSummary = [
  { floor: 'L12', total: 6, online: 6, offline: 0, warning: 0, avgTemp: 22.8 },
  { floor: 'L11', total: 6, online: 5, offline: 1, warning: 0, avgTemp: 23.2 },
  { floor: 'L10', total: 4, online: 3, offline: 1, warning: 1, avgTemp: 24.5 },
  { floor: 'L9', total: 4, online: 4, offline: 0, warning: 0, avgTemp: 23.1 },
  { floor: 'L8', total: 4, online: 4, offline: 0, warning: 0, avgTemp: 22.9 },
  { floor: 'L7', total: 4, online: 4, offline: 0, warning: 0, avgTemp: 23.4 },
  { floor: 'L6', total: 4, online: 4, offline: 0, warning: 0, avgTemp: 23.2 },
  { floor: 'L5', total: 4, online: 4, offline: 0, warning: 1, avgTemp: 22.8 },
  { floor: 'L4', total: 4, online: 4, offline: 0, warning: 0, avgTemp: 23.0 },
  { floor: 'L3', total: 4, online: 3, offline: 1, warning: 0, avgTemp: 23.5 },
  { floor: 'L2', total: 5, online: 5, offline: 0, warning: 0, avgTemp: 23.1 },
  { floor: 'L1', total: 5, online: 5, offline: 0, warning: 0, avgTemp: 22.9 },
];
// --- Water Systems ---
const waterTanksArRoyyan = [
  { id: 'GWT-1', type: 'Ground Tank', level: 78, capacity: 150000, status: 'Normal' },
  { id: 'RT-1', type: 'Roof Tank', level: 55, capacity: 20000, status: 'Normal' },
];

const waterTanksCipadung = [
  { id: 'GWT-1', type: 'Ground Tank', level: 85, capacity: 500000, status: 'Normal' },
  { id: 'GWT-2', type: 'Ground Tank', level: 82, capacity: 500000, status: 'Normal' },
  { id: 'RT-1', type: 'Roof Tank', level: 65, capacity: 50000, status: 'Normal' },
  { id: 'RT-2', type: 'Roof Tank', level: 70, capacity: 50000, status: 'Normal' },
];

const waterTanksBekasi = [
  { id: 'GWT-1', type: 'Ground Tank', level: 92, capacity: 750000, status: 'Normal' },
  { id: 'GWT-2', type: 'Ground Tank', level: 88, capacity: 750000, status: 'Normal' },
  { id: 'RT-1', type: 'Roof Tank', level: 45, capacity: 80000, status: 'Normal' },
  { id: 'RT-2', type: 'Roof Tank', level: 48, capacity: 80000, status: 'Normal' },
];

export const getWaterTanks = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') return waterTanksArRoyyan;
  if (hospitalId === 'bekasi') return waterTanksBekasi;
  return waterTanksCipadung;
};

const waterPumpsArRoyyan = [
  { id: 'TRP-1', type: 'Transfer Pump', status: 'ON', flow: 8, pressure: 3.8 },
  { id: 'BST-1', type: 'Booster Pump', status: 'ON', flow: 4, pressure: 3.2 },
];

const waterPumpsCipadung = [
  { id: 'TRP-1', type: 'Transfer Pump', status: 'ON', flow: 15, pressure: 5.2 },
  { id: 'TRP-2', type: 'Transfer Pump', status: 'OFF', flow: 0, pressure: 0 },
  { id: 'BST-1', type: 'Booster Pump', status: 'ON', flow: 8, pressure: 4.5 },
  { id: 'BST-2', type: 'Booster Pump', status: 'ON', flow: 7, pressure: 4.2 },
];

const waterPumpsBekasi = [
  { id: 'TRP-1', type: 'Transfer Pump', status: 'ON', flow: 22, pressure: 6.1 },
  { id: 'TRP-2', type: 'Transfer Pump', status: 'ON', flow: 20, pressure: 5.9 },
  { id: 'BST-1', type: 'Booster Pump', status: 'ON', flow: 12, pressure: 5.5 },
  { id: 'BST-2', type: 'Booster Pump', status: 'OFF', flow: 0, pressure: 0 },
];

export const getWaterPumps = (hospitalId: string) => {
  if (hospitalId === 'arroyyan') return waterPumpsArRoyyan;
  if (hospitalId === 'bekasi') return waterPumpsBekasi;
  return waterPumpsCipadung;
};

export const getRoomsForFloor = (floorId: string, hospitalId: string = 'cipadung') => {
  const floors = getFloorData(hospitalId);
  const floor = floors.find(f => f.floor === floorId);
  if (!floor || floor.beds === 0) return [];

  const rooms = [];
  for (let i = 1; i <= floor.beds; i++) {
    const isOccupied = i <= floor.occupied;
    rooms.push({
      id: `${floorId}-${String(i).padStart(2, '0')}`,
      status: isOccupied ? 'Occupied' : 'Available',
      temp: 21 + Math.random() * 3,
      nurseCall: isOccupied && Math.random() > 0.9,
      patientName: isOccupied ? `Patient ${Math.floor(Math.random() * 1000)}` : null,
    });
  }
  return rooms;
};
