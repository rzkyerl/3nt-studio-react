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

const DOC_TYPE = "team";

interface Member {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  image?: any;
}

const emptyForm = { name: "", role: "" };

export default function MembersSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
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
      setMembers(data as Member[]);
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

  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role });
    setImageFile(null);
    setImagePreview(m.imageUrl || "");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      showToast("Name and role are required.", "error");
      return;
    }
    setSaving(true);
    try {
      let imageRef = editing?.image;

      if (imageFile) {
        imageRef = await uploadImage(imageFile);
      }

      const data: Record<string, any> = { name: form.name, role: form.role };
      if (imageRef) data.image = imageRef;

      if (editing) {
        await updateDoc(editing.id, data);
        setMembers((prev) =>
          prev.map((m) =>
            m.id === editing.id
              ? { ...m, ...data, imageUrl: imageFile ? imagePreview : m.imageUrl }
              : m
          )
        );
        showToast("Member updated!");
      } else {
        const id = await createDoc(DOC_TYPE, data);
        setMembers((prev) => [
          { id, ...data, imageUrl: imagePreview } as Member,
          ...prev,
        ]);
        showToast("Member added!");
      }
      setShowModal(false);
    } catch {
      showToast("Save failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (m: Member) => {
    if (!confirm(`Delete "${m.name}"?`)) return;
    try {
      await deleteDoc(m.id);
      setMembers((prev) => prev.filter((x) => x.id !== m.id));
      showToast("Deleted.");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  return (
    <>
      <PageMeta title="Team Members | Admin" description="Manage Team Members" />
      <PageBreadcrumb pageTitle="Team Members" />

      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Team Members</h3>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg">
            <Plus size={14} /> Add Member
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No members yet. Add one!</div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {members.map((m) => (
              <div key={m.id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">👤</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.role}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => openEdit(m)} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg">
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(m)} className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 rounded-lg">
                      <Trash2 size={12} /> Delete
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h4 className="font-semibold text-gray-800 dark:text-white">{editing ? "Edit Member" : "Add Member"}</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-brand-400 mx-auto flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <UploadCloud className="text-gray-400" size={28} />
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
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Photographer"
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
