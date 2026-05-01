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
import { Trash2, Pencil, Plus, Loader2, X, UploadCloud } from "lucide-react";

const DOC_TYPE = "clients";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  logo?: any;
}

const emptyForm = { name: "" };

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
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
      setClients(data as Client[]);
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

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({ name: c.name });
    setImageFile(null);
    setImagePreview(c.logoUrl || "");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      showToast("Client name is required.", "error");
      return;
    }
    setSaving(true);
    try {
      let logoRef = editing?.logo;

      if (imageFile) {
        logoRef = await uploadImage(imageFile);
      }

      const data: Record<string, any> = { name: form.name };
      if (logoRef) data.logo = logoRef;

      if (editing) {
        await updateDoc(editing.id, data);
        setClients((prev) =>
          prev.map((c) =>
            c.id === editing.id
              ? { ...c, ...data, logoUrl: imageFile ? imagePreview : c.logoUrl }
              : c
          )
        );
        showToast("Client updated!");
      } else {
        const id = await createDoc(DOC_TYPE, data);
        setClients((prev) => [{ id, ...data, logoUrl: imagePreview } as Client, ...prev]);
        showToast("Client added!");
      }
      setShowModal(false);
    } catch {
      showToast("Save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (c: Client) => {
    if (!confirm(`Delete "${c.name}"?`)) return;
    try {
      await deleteDoc(c.id);
      setClients((prev) => prev.filter((x) => x.id !== c.id));
      showToast("Deleted.");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  return (
    <>
      <PageMeta title="Clients | Admin" description="Manage Clients" />
      <PageBreadcrumb pageTitle="Clients" />

      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Client Logos</h3>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg">
            <Plus size={14} /> Add Client
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No clients yet. Add one!</div>
        ) : (
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center gap-3 bg-gray-50 dark:bg-gray-800/50">
                <div className="h-16 flex items-center justify-center">
                  {c.logoUrl ? (
                    <img src={c.logoUrl} alt={c.name} className="max-h-16 max-w-[120px] object-contain" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-2xl">🏢</div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">{c.name}</p>
                <div className="flex gap-2 w-full">
                  <button onClick={() => openEdit(c)} className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg">
                    <Pencil size={11} /> Edit
                  </button>
                  <button onClick={() => handleDelete(c)} className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 rounded-lg">
                    <Trash2 size={11} /> Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h4 className="font-semibold text-gray-800 dark:text-white">{editing ? "Edit Client" : "Add Client"}</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 transition-colors bg-gray-50 dark:bg-gray-800"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="max-h-20 max-w-[160px] object-contain" />
                  ) : (
                    <>
                      <UploadCloud className="text-gray-400 mb-2" size={28} />
                      <p className="text-xs text-gray-400">Click to upload logo</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Kementerian Perhubungan"
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
