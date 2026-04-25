import { useEffect, useState } from 'react';
import { fetchPosts } from '../lib/api';

export default function NewsTicker() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts({ latest: 5 }).then(res => setItems(res.data || []));
  }, []);

  if (items.length === 0) return null;

  const tickerText = items.map(i => `📢 ${i.title}`).join('    |    ');

  return (
    <div className="bg-yellow-50 border-y border-yellow-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <span className="bg-red-600 text-white px-3 py-2 text-xs font-bold flex-shrink-0 uppercase tracking-wider">Latest</span>
        <div className="overflow-hidden flex-1 py-2 px-3">
          <div className="animate-marquee whitespace-nowrap text-sm text-[#003366] font-medium">
            {tickerText}    |    {tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}
