import React, { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  fetchCollection,
  createDoc,
  updateDoc,
  deleteDoc,
  uploadImage,
} from "../../services/sanityService";
import { Trash2, Pencil, Plus, Loader2, X, UploadCloud, Quote } from "lucide-react";

const DOC_TYPE = "testimonials";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  image?: any;
}

const emptyForm = { name: "", role: "", quote: "" };

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCollection(DOC_TYPE);
      setItems(data as Testimonial[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, quote: t.quote });
    setImageFile(null);
    setImagePreview(t.imageUrl || "");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      showToast("Name and quote are required.", "error");
      return;
    }
    setSaving(true);
    try {
      let imageRef = editing?.image;

      if (imageFile) {
        imageRef = await uploadImage(imageFile);
      }

      const data: Record<string, any> = {
        name: form.name,
        role: form.role,
        quote: form.quote,
      };
      if (imageRef) data.image = imageRef;

      if (editing) {
        await updateDoc(editing.id, data);
        setItems((prev) =>
          prev.map((t) =>
            t.id === editing.id
              ? { ...t, ...data, imageUrl: imageFile ? imagePreview : t.imageUrl }
              : t
          )
        );
        showToast("Testimonial updated!");
      } else {
        const id = await createDoc(DOC_TYPE, data);
        setItems((prev) => [{ id, ...data, imageUrl: imagePreview } as Testimonial, ...prev]);
        showToast("Testimonial added!");
      }
      setShowModal(false);
    } catch {
      showToast("Save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (t: Testimonial) => {
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    try {
      await deleteDoc(t.id);
      setItems((prev) => prev.filter((x) => x.id !== t.id));
      showToast("Deleted.");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  return (
    <>
      <PageMeta title="Testimonials | Admin" description="Manage Testimonials" />
      <PageBreadcrumb pageTitle="Testimonials" />

      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Testimonials</h3>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg">
            <Plus size={14} /> Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No testimonials yet. Add one!</div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t) => (
              <div key={t.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50 relative">
                <Quote className="absolute top-4 right-4 text-gray-200 dark:text-gray-700" size={28} />
                <p className="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-3 mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                    {t.imageUrl ? (
                      <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t.role}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => openEdit(t)} className="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(t)} className="p-1.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-500 rounded-lg">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h4 className="font-semibold text-gray-800 dark:text-white">{editing ? "Edit Testimonial" : "Add Testimonial"}</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-brand-400 mx-auto flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <UploadCloud className="text-gray-400" size={24} />
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role / Company</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. CEO, PT Example"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  placeholder="What did the client say?"
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                {saving && <Loader2 className="animate-spin" size={14} />}
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
