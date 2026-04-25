import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#003366] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[#003366] font-bold text-xs leading-tight text-center">BSNL<br/>EU</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">BSNLEUUPW</h1>
            <p className="text-xs md:text-sm text-blue-200">BSNL Employees Union — Uttar Pradesh (West)</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-3 text-sm text-blue-200">
          <span>📞 011-23036668</span>
          <span>✉️ bsnleuupw@gmail.com</span>
        </div>
      </div>
    </header>
  );
}
