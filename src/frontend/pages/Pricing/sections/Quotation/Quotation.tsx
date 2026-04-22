import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Input, TextArea } from '../../../../components/ui/Input';

type QuotationForm = {
  name: string;
  profileType: string;
  eventType: string;
  serviceNeeded: string;
  eventDate: string;
  location: string;
  budgetRange: string;
  description: string;
};

const initialForm: QuotationForm = {
  name: '',
  profileType: '',
  eventType: '',
  serviceNeeded: '',
  eventDate: '',
  location: '',
  budgetRange: '',
  description: '',
};

const Quotation = () => {
  const [form, setForm] = useState<QuotationForm>(initialForm);

  const whatsappHref = useMemo(() => {
    const text = [
      'Hi 3NT Studio,',
      'I would like to request a quotation for my event.',
      '',
      `Name: ${form.name || '-'}`,
      `Company / Personal: ${form.profileType || '-'}`,
      `Event Type: ${form.eventType || '-'}`,
      `Service Needed: ${form.serviceNeeded || '-'}`,
      `Event Date: ${form.eventDate || '-'}`,
      `Location: ${form.location || '-'}`,
      `Budget Range: ${form.budgetRange || '-'}`,
      `Description: ${form.description || '-'}`,
    ].join('\n');

    return `https://wa.me/628xxxx?text=${encodeURIComponent(text)}`;
  }, [form]);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Request Quotation - ${form.eventType || 'Event'}`);
    const body = encodeURIComponent(
      [
        'Hi 3NT Studio,',
        'I would like to request a quotation for my event.',
        '',
        `Name: ${form.name || '-'}`,
        `Company / Personal: ${form.profileType || '-'}`,
        `Event Type: ${form.eventType || '-'}`,
        `Service Needed: ${form.serviceNeeded || '-'}`,
        `Event Date: ${form.eventDate || '-'}`,
        `Location: ${form.location || '-'}`,
        `Budget Range: ${form.budgetRange || '-'}`,
        `Description: ${form.description || '-'}`,
      ].join('\n')
    );

    return `mailto:hello@3nt.studio?subject=${subject}&body=${body}`;
  }, [form]);

  const updateField = (key: keyof QuotationForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-32 pb-24 bg-pure-white">
      <section className="container-custom max-w-4xl space-y-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-gray font-bold">Request Quotation</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tighter">
            Tell us your event details
          </h1>
          <p className="text-medium-gray text-lg">
            Submit your requirement first, then send directly via WhatsApp or email for sales follow-up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Name</label>
            <Input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Full name" required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Company / Personal</label>
            <Input value={form.profileType} onChange={(e) => updateField('profileType', e.target.value)} placeholder="Example: ABC Corp / Personal" required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Event Type</label>
            <select
              value={form.eventType}
              onChange={(e) => updateField('eventType', e.target.value)}
              className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body"
              required
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Corporate">Corporate</option>
              <option value="Concert">Concert</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Service Needed</label>
            <Input value={form.serviceNeeded} onChange={(e) => updateField('serviceNeeded', e.target.value)} placeholder="Example: Multicam + Streaming" required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Event Date</label>
            <Input type="date" value={form.eventDate} onChange={(e) => updateField('eventDate', e.target.value)} required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Location</label>
            <Input value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="City / event venue" required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Budget Range</label>
            <Input value={form.budgetRange} onChange={(e) => updateField('budgetRange', e.target.value)} placeholder="Example: IDR 15M - 30M" required />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Description</label>
            <TextArea value={form.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Share technical requirements, rundown, and expected output." required />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4 pt-2">
            <button type="submit" className="bg-primary-black text-pure-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform">
              Send via WhatsApp
            </button>
            <a href={emailHref} className="border border-primary-black text-primary-black px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-black hover:text-pure-white transition-all">
              Send via Email
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Quotation;
