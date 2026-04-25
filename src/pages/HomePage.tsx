import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchCirculars, fetchNotices } from '../lib/api';
import NewsTicker from '../components/NewsTicker';
import Loader from '../components/Loader';
import { FileText, Download, Bell, ExternalLink, ChevronRight, Share2 } from 'lucide-react';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function whatsappShare(title: string) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${title} — BSNLEUUPW`);
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [circulars, setCirculars] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchPosts({ latest: 6 }),
      fetchCirculars({ limit: 8 }),
      fetchNotices(),
    ]).then(([p, c, n]) => {
      setPosts(p.data || []);
      setCirculars(c.data || []);
      setNotices(n || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <NewsTicker />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="bg-[#003366] text-white px-4 py-2 font-bold text-sm uppercase tracking-wide rounded-t">
                Important Links
              </div>
              <ul className="divide-y divide-gray-100">
                {[
                  { label: 'BSNL Corporate Office', url: 'https://www.bsnl.co.in' },
                  { label: 'BSNL EU (Central)', url: 'https://bsnleu.in' },
                  { label: 'DoT India', url: 'https://dot.gov.in' },
                  { label: 'BSNL Intranet Portal', url: 'https://intranet.bsnl.co.in' },
                  { label: 'ERP SAP Portal', url: 'https://erp.bsnl.co.in' },
                  { label: 'HRMS BSNL', url: 'https://hrms.bsnl.co.in' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#003366] hover:bg-blue-50 transition-colors">
                      <ExternalLink size={14} className="flex-shrink-0 text-gray-400" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded shadow-sm mt-4">
              <div className="bg-[#003366] text-white px-4 py-2 font-bold text-sm uppercase tracking-wide rounded-t">
                Quick Navigation
              </div>
              <ul className="divide-y divide-gray-100">
                {[
                  { label: 'About BSNLEUUPW', to: '/about' },
                  { label: 'Latest News', to: '/news' },
                  { label: 'Download Circulars', to: '/circulars' },
                  { label: 'Photo Gallery', to: '/gallery' },
                  { label: 'Contact Us', to: '/contact' },
                ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#003366] hover:bg-blue-50 transition-colors">
                      <ChevronRight size={14} className="flex-shrink-0 text-gray-400" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* CENTER CONTENT */}
          <main className="lg:col-span-6">
            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="bg-[#003366] text-white px-4 py-2 font-bold text-sm uppercase tracking-wide rounded-t flex items-center justify-between">
                <span>Latest News & Updates</span>
                <Link to="/news" className="text-yellow-300 text-xs hover:text-yellow-100">View All →</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {posts.length === 0 && (
                  <p className="px-4 py-8 text-center text-gray-500 text-sm">No news updates available.</p>
                )}
                {posts.map(post => (
                  <article key={post.id} className="px-4 py-4 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="inline-block bg-blue-100 text-[#003366] text-[10px] font-semibold uppercase px-2 py-0.5 rounded mb-1">
                          {post.category || 'General'}
                        </span>
                        <h3 className="font-bold text-[#003366] text-sm leading-snug">{post.title}</h3>
                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{post.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-gray-400">📅 {formatDate(post.created_at)}</span>
                          <button onClick={() => whatsappShare(post.title)} className="text-green-600 hover:text-green-700 flex items-center gap-1 text-[10px]">
                            <Share2 size={10} /> WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="bg-[#003366] text-white px-4 py-2 font-bold text-sm uppercase tracking-wide rounded-t flex items-center gap-2">
                <FileText size={14} /> Circulars
              </div>
              <ul className="divide-y divide-gray-100">
                {circulars.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500 text-xs">No circulars available.</li>
                )}
                {circulars.map(c => (
                  <li key={c.id} className="px-4 py-2.5">
                    <a href={c.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-[#003366] hover:text-blue-700">
                      <Download size={14} className="flex-shrink-0 mt-0.5 text-red-500" />
                      <div>
                        <span className="text-xs leading-snug block">{c.title}</span>
                        <span className="text-[10px] text-gray-400">{formatDate(c.created_at)}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <Link to="/circulars" className="block text-center text-xs text-[#003366] font-semibold py-2 border-t border-gray-100 hover:bg-blue-50">
                View All Circulars →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded shadow-sm mt-4">
              <div className="bg-[#003366] text-white px-4 py-2 font-bold text-sm uppercase tracking-wide rounded-t flex items-center gap-2">
                <Bell size={14} /> Notices & Announcements
              </div>
              <ul className="divide-y divide-gray-100">
                {notices.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500 text-xs">No notices available.</li>
                )}
                {notices.slice(0, 8).map((n: any) => (
                  <li key={n.id} className="px-4 py-2.5">
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'urgent' ? 'bg-red-500' : n.type === 'announcement' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                      <div>
                        <p className="text-xs text-[#003366] font-medium leading-snug">{n.title}</p>
                        <span className="text-[10px] text-gray-400">{formatDate(n.created_at)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
