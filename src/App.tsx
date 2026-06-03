import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Occupancy } from './components/Occupancy';
import { HVAC } from './components/HVAC';
import { Power } from './components/Power';
import { Water } from './components/Water';
import { Alarms } from './components/Alarms';
import { General } from './components/General';
import { Reports } from './components/Reports';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { MedicalGas } from './components/MedicalGas';
import { FireSystem } from './components/FireSystem';
import { Maintenance } from './components/Maintenance';
import { ESG } from './components/ESG';
import { IoTLive } from './components/IoTLive';
import { Login } from './components/Login';
import { hospitals, type Hospital } from './data/hospitals';
import { getWeatherData } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [role, setRole] = useState('direktur');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeHospital, setActiveHospital] = useState<Hospital>(hospitals[0]);

  const weather = useMemo(() => getWeatherData(activeHospital.city), [activeHospital]);

  const handleLogin = (selectedRole: string, selectedHospital: Hospital) => {
    setRole(selectedRole);
    setActiveHospital(selectedHospital);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    const props = { role, hospital: activeHospital };
    
    switch (currentPage) {
      case 'Dashboard': return <Dashboard {...props} />;
      case 'General': return <General {...props} />;
      case 'Occupancy': return <Occupancy hospital={activeHospital} />;
      case 'HVAC': return <HVAC hospital={activeHospital} />;
      case 'Power': return <Power hospital={activeHospital} />;
      case 'Water': return <Water hospital={activeHospital} />;
      case 'Medical Gas': return <MedicalGas hospital={activeHospital} />;
      case 'Fire': return <FireSystem hospital={activeHospital} />;
      case 'Maintenance': return <Maintenance hospital={activeHospital} />;
      case 'ESG': return <ESG hospital={activeHospital} />;
      case 'IoT Live': return <IoTLive hospital={activeHospital} />;
      case 'Alarms': return <Alarms hospital={activeHospital} />;
      case 'Reports': return <Reports hospital={activeHospital} />;
      case 'Analytics': return <Analytics hospital={activeHospital} />;
      case 'Settings': return <Settings hospital={activeHospital} />;
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <h2 className="text-2xl text-slate-500 font-semibold">{currentPage} Page Under Construction</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F6F3] overflow-hidden font-sans">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        role={role} 
        activeHospital={activeHospital}
        onLogout={handleLogout} 
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header 
          role={role} 
          activeHospital={activeHospital}
          onHospitalChange={setActiveHospital}
        />
        <main className="flex-1 overflow-y-auto text-gray-800">
          {renderPage()}
        </main>
        {/* Global Footer */}
        <div className="shrink-0 border-t border-gray-200 bg-white/80 backdrop-blur-md px-5 py-2.5 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-gray-400">🌡</span>
              <span className="text-gray-400 uppercase text-[10px] tracking-wide">Outdoor Temp ({activeHospital.city})</span>
              <span className="font-semibold text-gray-700">{weather.temp} °C</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-blue-400">💧</span>
              <span className="text-gray-400 uppercase text-[10px] tracking-wide">Outdoor RH</span>
              <span className="font-semibold text-gray-700">{weather.rh} %</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-emerald-500">🍃</span>
              <span className="text-gray-400 uppercase text-[10px] tracking-wide">Air Quality</span>
              <span className="font-semibold text-emerald-600">{weather.aqiStatus} ({weather.aqi} AQI)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400">Data Source: {activeHospital.name.toUpperCase()} BMS · </span>
            <span className="text-[10px] text-gray-400">Last Update: 29 Apr 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
