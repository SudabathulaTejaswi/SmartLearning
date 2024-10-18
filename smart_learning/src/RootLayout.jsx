import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from './AuthContext';
import './RootLayout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RootLayout() {
  const { isAuthenticated, user } = useAuth(); // Get authentication and user info
  
  return (
    <div className={`root-layout ${isAuthenticated ? 'with-sidebar' : ''}`}>
      {/* Top Navbar for users only, not admin */}
      {(isAuthenticated && user?.role !== 'admin') && <Header />}
      {(!isAuthenticated && user?.role !== 'admin') && <Header />}
      <div className="d-flex">
        {/* Sidebar for authenticated users */}
        {isAuthenticated && <Sidebar />}
        
        {/* Main content area */}
        <div className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
          <Outlet />
        </div>
      </div>



      {/* Footer (only copyright for logged-in users or admins) */}
      {isAuthenticated ? (
        <footer className="text-center p-3">
          <p>© {new Date().getFullYear()} Skill Forge. All Rights Reserved.</p>
        </footer>
      ) : <Footer /> }
    </div>
  );
}

export default RootLayout;
