import { useState } from 'react';
import { submitContact } from '../lib/api';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-2 mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
          <h2 className="font-bold text-[#003366] text-lg mb-4">Send us a Message</h2>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-green-600">
              <CheckCircle size={48} />
              <p className="mt-3 font-bold">Message Sent Successfully!</p>
              <p className="text-sm text-gray-500 mt-1">We will get back to you soon.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-[#003366] underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#003366] resize-none"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#003366] text-white py-2.5 rounded font-medium text-sm hover:bg-[#004488] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={14} /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
            <h2 className="font-bold text-[#003366] text-lg mb-4">Contact Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#003366] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Office Address</p>
                  <p className="text-gray-600">BSNL Employees Union<br/>BSNL Bhawan, Near GPO<br/>Meerut, Uttar Pradesh - 250001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#003366] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">011-23036668</p>
                  <p className="text-gray-600">+91-9412345678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#003366] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">bsnleuupw@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-bold text-[#003366] text-sm mb-2">Office Hours</h3>
            <p className="text-xs text-gray-600">Monday to Friday: 10:00 AM – 5:00 PM</p>
            <p className="text-xs text-gray-600">Saturday: 10:00 AM – 1:00 PM</p>
            <p className="text-xs text-gray-600">Sunday & Public Holidays: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
