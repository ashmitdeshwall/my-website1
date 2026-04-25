import { getToken } from './auth';

async function authHeaders() {
  const token = await getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function fetchPosts(params?: { search?: string; page?: number; limit?: number; latest?: number }) {
  const qs = new URLSearchParams();
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.limit) qs.set('limit', String(params.limit));
  if (params?.latest) qs.set('latest', String(params.latest));
  const res = await fetch(`/api/posts?${qs.toString()}`);
  return res.json();
}

export async function createPost(post: { title: string; description: string; content: string; category: string }) {
  const res = await fetch('/api/posts', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(post) });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(post: { id: number; title?: string; description?: string; content?: string; category?: string }) {
  const res = await fetch('/api/posts', { method: 'PUT', headers: await authHeaders(), body: JSON.stringify(post) });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(id: number) {
  const res = await fetch('/api/posts', { method: 'DELETE', headers: await authHeaders(), body: JSON.stringify({ id }) });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}

export async function fetchCirculars(params?: { category?: string; page?: number; limit?: number }) {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.limit) qs.set('limit', String(params.limit));
  const res = await fetch(`/api/circulars?${qs.toString()}`);
  return res.json();
}

export async function createCircular(circular: { title: string; pdf_url: string; category: string }) {
  const res = await fetch('/api/circulars', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(circular) });
  if (!res.ok) throw new Error('Failed to create circular');
  return res.json();
}

export async function deleteCircular(id: number) {
  const res = await fetch('/api/circulars', { method: 'DELETE', headers: await authHeaders(), body: JSON.stringify({ id }) });
  if (!res.ok) throw new Error('Failed to delete circular');
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch('/api/gallery');
  return res.json();
}

export async function createGalleryItem(item: { title: string; image_url: string; caption: string }) {
  const res = await fetch('/api/gallery', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(item) });
  if (!res.ok) throw new Error('Failed to create gallery item');
  return res.json();
}

export async function deleteGalleryItem(id: number) {
  const res = await fetch('/api/gallery', { method: 'DELETE', headers: await authHeaders(), body: JSON.stringify({ id }) });
  if (!res.ok) throw new Error('Failed to delete gallery item');
  return res.json();
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to submit message');
  return res.json();
}

export async function fetchContactMessages() {
  const res = await fetch('/api/contact', { headers: await authHeaders() });
  return res.json();
}

export async function fetchNotices() {
  const res = await fetch('/api/notices');
  return res.json();
}

export async function createNotice(notice: { title: string; content: string; type: string }) {
  const res = await fetch('/api/notices', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(notice) });
  if (!res.ok) throw new Error('Failed to create notice');
  return res.json();
}

export async function deleteNotice(id: number) {
  const res = await fetch('/api/notices', { method: 'DELETE', headers: await authHeaders(), body: JSON.stringify({ id }) });
  if (!res.ok) throw new Error('Failed to delete notice');
  return res.json();
}
