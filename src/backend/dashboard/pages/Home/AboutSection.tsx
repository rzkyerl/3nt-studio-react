import React, { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  fetchSingletonDoc,
  upsertSingleton,
  fetchMediaCollection,
  addImageMedia,
  deleteDoc,
} from "../../services/sanityService";
import { Trash2, UploadCloud, Loader2, Plus } from "lucide-react";

const SINGLETON_TYPE = "homeContent";
const SINGLETON_ID = "homeContent-about";
const IMAGES_TYPE = "aboutImages";

interface AboutImage {
  id: string;
  url: string;
  name: string;
}

export default function AboutSection() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<AboutImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const doc = await fetchSingletonDoc(SINGLETON_TYPE);
        if (doc) {
          setTitle(doc.aboutTitle || "");
          setDesc(doc.aboutDesc || "");
        }
        const imgs = await fetchMediaCollection(IMAGES_TYPE);
        setImages(imgs as AboutImage[]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertSingleton(SINGLETON_TYPE, SINGLETON_ID, {
        aboutTitle: title,
        aboutDesc: desc,
      });
      showToast("About content saved!");
    } catch {
      showToast("Failed to save.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const item = await addImageMedia(IMAGES_TYPE, file);
        setImages((prev) => [item as AboutImage, ...prev]);
      }
      showToast("Image uploaded!");
    } catch {
      showToast("Upload failed.", "error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (item: AboutImage) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteDoc(item.id);
      setImages((prev) => prev.filter((i) => i.id !== item.id));
      showToast("Deleted.");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  return (
    <>
      <PageMeta title="About Section | Admin" description="Manage About Section" />
      <PageBreadcrumb pageTitle="About Section" />

      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-400" size={36} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Text Content */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Text Content</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="About title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  placeholder="About description..."
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg disabled:opacity-60"
              >
                {saving && <Loader2 className="animate-spin" size={14} />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Images</h3>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg disabled:opacity-60"
              >
                {uploading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                Upload
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
            </div>
            <div className="p-6">
              {images.length === 0 ? (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center cursor-pointer hover:border-brand-400 transition-colors"
                >
                  <UploadCloud className="mx-auto mb-3 text-gray-400" size={36} />
                  <p className="text-sm text-gray-500">Click to upload images</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((item) => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-square bg-gray-100 dark:bg-gray-800">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDelete(item)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">{item.name}</span>
                    </div>
                  ))}
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 transition-colors"
                  >
                    <Plus className="text-gray-400" size={24} />
                    <span className="text-xs text-gray-400 mt-1">Add more</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
