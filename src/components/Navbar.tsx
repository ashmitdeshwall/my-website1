import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/news', label: 'News' },
  { to: '/circulars', label: 'Circulars' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#002244] text-white border-t border-blue-400/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start">
          <button onClick={() => setOpen(!open)} className="md:hidden py-3">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-[#003366] ${
                  location.pathname === link.to ? 'bg-[#004488] border-b-2 border-yellow-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/admin" className="md:ml-auto px-4 py-3 text-sm text-yellow-300 hover:text-yellow-100 font-medium">
            Admin
          </Link>
        </div>
        {open && (
          <div className="md:hidden border-t border-blue-400/20 pb-2">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm hover:bg-[#003366] ${
                  location.pathname === link.to ? 'bg-[#004488] text-yellow-300' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
