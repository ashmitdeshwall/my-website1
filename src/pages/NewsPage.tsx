import { useEffect, useState, useCallback } from 'react';
import { fetchPosts } from '../lib/api';
import Loader from '../components/Loader';
import { Search, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function NewsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchPosts({ search, page, limit });
      setPosts(res.data || []);
      setTotal(res.count || 0);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  function whatsappShare(title: string) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} — BSNLEUUPW`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-2 mb-6">News & Updates</h1>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]"
          />
        </div>
      </div>

      {loading ? <Loader /> : (
        <>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No news found.</p>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <article key={post.id} className="bg-white border border-gray-200 rounded shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="inline-block bg-blue-100 text-[#003366] text-[10px] font-semibold uppercase px-2 py-0.5 rounded mb-1">
                        {post.category || 'General'}
                      </span>
                      <h2 className="font-bold text-[#003366] text-base">{post.title}</h2>
                      <p className="text-gray-600 text-sm mt-1">{post.description}</p>
                      {post.content && (
                        <p className="text-gray-500 text-xs mt-2 line-clamp-3">{post.content}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-400">📅 {formatDate(post.created_at)}</span>
                        <button onClick={() => whatsappShare(post.title)} className="text-green-600 hover:text-green-700 flex items-center gap-1 text-xs">
                          <Share2 size={12} /> Share on WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
