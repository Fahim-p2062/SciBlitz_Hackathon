import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  LayoutDashboard, 
  Sparkles, 
  Trash2, 
  Navigation, 
  Bell, 
  Sun, 
  Moon
} from 'lucide-react';
import { DashboardPage } from './pages/dashboard';
import { ClassifierPage } from './pages/classifier';
import { DustbinsPage } from './pages/dustbins';
import { RouteOptimizerPage } from './pages/routes';
import { NotificationsPage } from './pages/notifications';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'classifier' | 'dustbins' | 'routes' | 'notifications'
  >('dashboard');

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(1);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-shell">
      {/* Top Glass Header */}
      <header className="app-header">
        <div className="logo-group" onClick={() => setCurrentTab('dashboard')}>
          <div className="logo-icon">
            <Recycle size={24} />
          </div>
          <div>
            <div className="logo-text">EcoSortha</div>
            <div className="logo-sub">Circular Bangladesh AI & Blockchain</div>
          </div>
        </div>

        <nav>
          <ul className="nav-menu">
            <li>
              <a
                className={`nav-link ${currentTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentTab('dashboard')}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </a>
            </li>

            <li>
              <a
                className={`nav-link ${currentTab === 'classifier' ? 'active' : ''}`}
                onClick={() => setCurrentTab('classifier')}
              >
                <Sparkles size={18} />
                AI Waste Classifier
              </a>
            </li>

            <li>
              <a
                className={`nav-link ${currentTab === 'dustbins' ? 'active' : ''}`}
                onClick={() => setCurrentTab('dustbins')}
              >
                <Trash2 size={18} />
                Smart Dustbins
              </a>
            </li>

            <li>
              <a
                className={`nav-link ${currentTab === 'routes' ? 'active' : ''}`}
                onClick={() => setCurrentTab('routes')}
              >
                <Navigation size={18} />
                Route Optimizer
              </a>
            </li>

            <li>
              <a
                className={`nav-link ${currentTab === 'notifications' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTab('notifications');
                  setUnreadNotifCount(0);
                }}
              >
                <Bell size={18} />
                Notifications
                {unreadNotifCount > 0 && (
                  <span className="badge-pill">{unreadNotifCount}</span>
                )}
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.8rem' }}
            onClick={toggleTheme}
            title="Toggle Dark/Light Eco Mode"
          >
            {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#10b981" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-container">
        {currentTab === 'dashboard' && <DashboardPage />}
        {currentTab === 'classifier' && <ClassifierPage />}
        {currentTab === 'dustbins' && <DustbinsPage />}
        {currentTab === 'routes' && <RouteOptimizerPage />}
        {currentTab === 'notifications' && <NotificationsPage />}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem 1rem', borderTop: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        EcoSortha • Created for CUET Hackathon by SciBlitz • Powered by Python AI & TypeScript + Mongoose Blockchain Ledger
      </footer>
    </div>
  );
};

export default App;
