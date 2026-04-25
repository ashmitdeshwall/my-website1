import { useEffect, useState } from 'react';
import { fetchGallery } from '../lib/api';
import Loader from '../components/Loader';
import { X } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetchGallery().then(data => setImages(data || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-2 mb-6">Photo Gallery</h1>

      {loading ? <Loader /> : images.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No images in the gallery yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div
              key={img.id}
              onClick={() => setSelected(img)}
              className="cursor-pointer bg-white border border-gray-200 rounded shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-gray-100">
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-[#003366] truncate">{img.title}</p>
                {img.caption && <p className="text-[10px] text-gray-500 truncate">{img.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <X size={28} />
            </button>
            <img src={selected.image_url} alt={selected.title} className="w-full rounded shadow-lg" />
            <div className="mt-3 text-white text-center">
              <p className="font-bold">{selected.title}</p>
              {selected.caption && <p className="text-sm text-gray-300">{selected.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
