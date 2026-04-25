import { useState, useEffect, useCallback } from 'react';
import { signIn, signOut, onAuthChange } from '../lib/auth';
import { fetchPosts, createPost, deletePost, fetchCirculars, createCircular, deleteCircular, fetchGallery, createGalleryItem, deleteGalleryItem, fetchNotices, createNotice, deleteNotice, fetchContactMessages } from '../lib/api';
import { LogIn, LogOut, Plus, Trash2, RefreshCw, Newspaper, FileText, Image, Bell, MessageSquare } from 'lucide-react';

type Tab = 'news' | 'circulars' | 'gallery' | 'notices' | 'messages';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('admin@bsnleuupw.in');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<Tab>('news');
  const [loading, setLoading] = useState(false);

  // Data states
  const [posts, setPosts] = useState<any[]>([]);
  const [circulars, setCirculars] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Form states
  const [postForm, setPostForm] = useState({ title: '', description: '', content: '', category: 'general' });
  const [circularForm, setCircularForm] = useState({ title: '', pdf_url: '', category: 'general' });
  const [galleryForm, setGalleryForm] = useState({ title: '', image_url: '', caption: '' });
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', type: 'notice' });

  useEffect(() => {
    const { data: { subscription } } = onAuthChange(setUser);
    return () => subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (tab === 'news') { const r = await fetchPosts({ limit: 50 }); setPosts(r.data || []); }
      if (tab === 'circulars') { const r = await fetchCirculars({ limit: 50 }); setCirculars(r.data || []); }
      if (tab === 'gallery') { const r = await fetchGallery(); setGallery(r || []); }
      if (tab === 'notices') { const r = await fetchNotices(); setNotices(r || []); }
      if (tab === 'messages') { const r = await fetchContactMessages(); setMessages(r || []); }
    } finally { setLoading(false); }
  }, [tab]);

  useEffect(() => { if (user) loadData(); }, [user, loadData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    try { await signIn(email, password); } catch (err: any) { setAuthError(err.message); }
  }

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    await createPost(postForm);
    setPostForm({ title: '', description: '', content: '', category: 'general' });
    loadData();
  }

  async function handleAddCircular(e: React.FormEvent) {
    e.preventDefault();
    await createCircular(circularForm);
    setCircularForm({ title: '', pdf_url: '', category: 'general' });
    loadData();
  }

  async function handleAddGallery(e: React.FormEvent) {
    e.preventDefault();
    await createGalleryItem(galleryForm);
    setGalleryForm({ title: '', image_url: '', caption: '' });
    loadData();
  }

  async function handleAddNotice(e: React.FormEvent) {
    e.preventDefault();
    await createNotice(noticeForm);
    setNoticeForm({ title: '', content: '', type: 'notice' });
    loadData();
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
          <h1 className="text-xl font-bold text-[#003366] mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" required />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button type="submit" className="w-full bg-[#003366] text-white py-2.5 rounded font-medium text-sm hover:bg-[#004488] flex items-center justify-center gap-2">
              <LogIn size={14} /> Sign In
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">Demo: admin@bsnleuupw.in / admin123456</p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'news', label: 'News', icon: Newspaper },
    { key: 'circulars', label: 'Circulars', icon: FileText },
    { key: 'gallery', label: 'Gallery', icon: Image },
    { key: 'notices', label: 'Notices', icon: Bell },
    { key: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#003366]">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{user.email}</span>
          <button onClick={() => signOut()} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-6 bg-gray-100 rounded p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded transition-colors ${
              tab === t.key ? 'bg-[#003366] text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button onClick={loadData} className="flex items-center gap-1 text-sm text-[#003366] hover:text-blue-700">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* NEWS TAB */}
      {tab === 'news' && (
        <div className="space-y-4">
          <form onSubmit={handleAddPost} className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h3 className="font-bold text-sm text-[#003366] mb-3 flex items-center gap-1"><Plus size={14} /> Add News Post</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Title *" required value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
              <select value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm">
                <option value="general">General</option>
                <option value="pay-revision">Pay Revision</option>
                <option value="transfer">Transfer</option>
                <option value="promotion">Promotion</option>
                <option value="meeting">Meeting</option>
                <option value="strike">Strike/Agitation</option>
              </select>
            </div>
            <input placeholder="Short description" value={postForm.description} onChange={e => setPostForm(f => ({ ...f, description: e.target.value }))} className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
            <textarea placeholder="Full content" rows={3} value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366] resize-none" />
            <button type="submit" className="mt-3 bg-[#003366] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#004488]">Add Post</button>
          </form>
          <div className="bg-white border border-gray-200 rounded shadow-sm">
            {posts.map(p => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#003366]">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.category} · {new Date(p.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={async () => { await deletePost(p.id); loadData(); }} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CIRCULARS TAB */}
      {tab === 'circulars' && (
        <div className="space-y-4">
          <form onSubmit={handleAddCircular} className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h3 className="font-bold text-sm text-[#003366] mb-3 flex items-center gap-1"><Plus size={14} /> Add Circular</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Title *" required value={circularForm.title} onChange={e => setCircularForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
              <select value={circularForm.category} onChange={e => setCircularForm(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm">
                <option value="general">General</option>
                <option value="pay-revision">Pay Revision</option>
                <option value="transfer">Transfer</option>
                <option value="promotion">Promotion</option>
                <option value="pension">Pension</option>
                <option value="other">Other</option>
              </select>
            </div>
            <input placeholder="PDF URL *" required value={circularForm.pdf_url} onChange={e => setCircularForm(f => ({ ...f, pdf_url: e.target.value }))} className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
            <button type="submit" className="mt-3 bg-[#003366] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#004488]">Add Circular</button>
          </form>
          <div className="bg-white border border-gray-200 rounded shadow-sm">
            {circulars.map(c => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#003366]">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.category} · {new Date(c.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={async () => { await deleteCircular(c.id); loadData(); }} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GALLERY TAB */}
      {tab === 'gallery' && (
        <div className="space-y-4">
          <form onSubmit={handleAddGallery} className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h3 className="font-bold text-sm text-[#003366] mb-3 flex items-center gap-1"><Plus size={14} /> Add Image</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Title *" required value={galleryForm.title} onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
              <input placeholder="Caption" value={galleryForm.caption} onChange={e => setGalleryForm(f => ({ ...f, caption: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
            </div>
            <input placeholder="Image URL *" required value={galleryForm.image_url} onChange={e => setGalleryForm(f => ({ ...f, image_url: e.target.value }))} className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
            <button type="submit" className="mt-3 bg-[#003366] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#004488]">Add Image</button>
          </form>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map(g => (
              <div key={g.id} className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <img src={g.image_url} alt={g.title} className="w-full aspect-square object-cover" />
                <div className="p-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[#003366] truncate">{g.title}</p>
                  <button onClick={async () => { await deleteGalleryItem(g.id); loadData(); }} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTICES TAB */}
      {tab === 'notices' && (
        <div className="space-y-4">
          <form onSubmit={handleAddNotice} className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h3 className="font-bold text-sm text-[#003366] mb-3 flex items-center gap-1"><Plus size={14} /> Add Notice</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Title *" required value={noticeForm.title} onChange={e => setNoticeForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]" />
              <select value={noticeForm.type} onChange={e => setNoticeForm(f => ({ ...f, type: e.target.value }))} className="px-3 py-2 border border-gray-300 rounded text-sm">
                <option value="notice">Notice</option>
                <option value="announcement">Announcement</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <textarea placeholder="Content" rows={2} value={noticeForm.content} onChange={e => setNoticeForm(f => ({ ...f, content: e.target.value }))} className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366] resize-none" />
            <button type="submit" className="mt-3 bg-[#003366] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#004488]">Add Notice</button>
          </form>
          <div className="bg-white border border-gray-200 rounded shadow-sm">
            {notices.map((n: any) => (
              <div key={n.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#003366]">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.type} · {new Date(n.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={async () => { await deleteNotice(n.id); loadData(); }} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {tab === 'messages' && (
        <div className="bg-white border border-gray-200 rounded shadow-sm">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">No messages yet.</p>
          ) : messages.map((m: any) => (
            <div key={m.id} className="px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#003366]">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.email} · {new Date(m.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-1">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
