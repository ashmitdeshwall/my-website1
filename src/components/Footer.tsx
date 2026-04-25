import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#002244] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-yellow-300">BSNLEUUPW</h3>
            <p className="text-sm text-blue-200 leading-relaxed">
              BSNL Employees Union, Uttar Pradesh (West) is dedicated to protecting the rights and welfare of BSNL employees in the UP West circle.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-yellow-300">Quick Links</h3>
            <ul className="space-y-1 text-sm text-blue-200">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/news" className="hover:text-white">News & Updates</Link></li>
              <li><Link to="/circulars" className="hover:text-white">Circulars</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-yellow-300">Contact Info</h3>
            <div className="text-sm text-blue-200 space-y-2">
              <p>📍 BSNL Bhawan, Meerut, Uttar Pradesh</p>
              <p>📞 011-23036668</p>
              <p>✉️ bsnleuupw@gmail.com</p>
              <p>🌐 bsnleuupw.in</p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-400/20 mt-6 pt-4 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} BSNLEUUPW — BSNL Employees Union Uttar Pradesh (West). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
