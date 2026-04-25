import { useEffect, useState, useCallback } from 'react';
import { fetchCirculars } from '../lib/api';
import Loader from '../components/Loader';
import { Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['all', 'general', 'pay-revision', 'transfer', 'promotion', 'pension', 'other'];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CircularsPage() {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchCirculars({ category, page, limit });
      setCirculars(res.data || []);
      setTotal(res.count || 0);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-2 mb-6">Circulars & Orders</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors capitalize ${
              category === cat
                ? 'bg-[#003366] text-white border-[#003366]'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        <>
          {circulars.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No circulars found in this category.</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#003366] text-white text-left">
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Title</th>
                    <th className="px-4 py-2 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-2 font-medium hidden md:table-cell">Date</th>
                    <th className="px-4 py-2 font-medium text-center">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {circulars.map((c, i) => (
                    <tr key={c.id} className="hover:bg-blue-50/50">
                      <td className="px-4 py-2.5 text-gray-500">{(page - 1) * limit + i + 1}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-start gap-2">
                          <FileText size={14} className="flex-shrink-0 mt-0.5 text-red-500" />
                          <span className="text-[#003366] font-medium">{c.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded capitalize">{c.category}</span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs hidden md:table-cell">{formatDate(c.created_at)}</td>
                      <td className="px-4 py-2.5 text-center">
                        <a href={c.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-medium">
                          <Download size={14} /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50">
                <ChevronLeft size={14} /> Prev
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50">
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
