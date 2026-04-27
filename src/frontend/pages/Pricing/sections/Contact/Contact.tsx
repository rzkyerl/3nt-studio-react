const Contact = () => {
  return (
    <div className="pt-32 pb-24 bg-pure-white">
      <section className="container-custom max-w-4xl space-y-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-gray font-bold">Contact</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tighter">Send Inquiry</h1>
          <p className="text-medium-gray text-lg">
            Choose your preferred channel for general inquiries and collaboration opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="mailto:3nteamprod@gmail.com"
            className="border border-border-gray rounded-2xl p-8 space-y-3 hover:border-primary-black transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Email Form</p>
            <p className="text-2xl font-bold">3nteamprod@gmail.com</p>
            <p className="text-medium-gray">Send your inquiry detail by email.</p>
          </a>

          <a
            href="https://wa.me/6285697229466"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-gray rounded-2xl p-8 space-y-3 hover:border-primary-black transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">WhatsApp</p>
            <p className="text-2xl font-bold">+62 856-9722-9466</p>
            <p className="text-medium-gray">Quick discussion for availability and pricing.</p>
          </a>

          <a
            href="https://instagram.com/3ntstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-gray rounded-2xl p-8 space-y-3 hover:border-primary-black transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Instagram</p>
            <p className="text-2xl font-bold">@3nt_studio</p>
            <p className="text-medium-gray">See latest projects and send DM.</p>
          </a>

          <div className="border border-border-gray rounded-2xl p-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-medium-gray font-bold">Location</p>
            <p className="text-2xl font-bold">Kota Tangerang, Banten</p>
            <p className="text-medium-gray">Available for projects nationwide.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
