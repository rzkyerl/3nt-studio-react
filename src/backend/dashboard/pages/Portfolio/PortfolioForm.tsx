import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { client } from "../../../sanity/client";
import { Loader2, Save, X, Upload, AlertTriangle, CheckCircle2 } from "lucide-react";

interface MediaItem {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface FormData {
  title: string;
  mediaItems: MediaItem[];
}

export default function PortfolioForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [existingMediaItems, setExistingMediaItems] = useState<any[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState<FormData>({
    title: "",
    mediaItems: [],
  });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (isEdit && id) {
      const load = async () => {
        try {
          const data = await client.fetch(
            `*[_type == "portfolio" && _id == $id][0] {
              _id, 
              title,
              "mediaItems": mediaItems[]{
                _key,
                "imageUrl": image.asset->url,
                "videoUrl": video.asset->url,
                "imageRef": image.asset._ref,
                "videoRef": video.asset._ref
              }
            }`,
            { id }
          );
          if (data) {
            setForm({
              title: data.title || "",
              mediaItems: [],
            });
            if (data.mediaItems) {
              setExistingMediaItems(data.mediaItems);
            }
          }
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [isEdit, id]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMediaItems: MediaItem[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const isVideo = file.type.startsWith('video/');
        newMediaItems.push({
          file,
          preview: reader.result as string,
          type: isVideo ? 'video' : 'image',
        });
        
        if (newMediaItems.length === files.length) {
          setForm((prev) => ({
            ...prev,
            mediaItems: [...prev.mediaItems, ...newMediaItems],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMediaItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      mediaItems: prev.mediaItems.filter((_, i) => i !== index),
    }));
  };

  const removeExistingMediaItem = (index: number) => {
    setExistingMediaItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Title is required.", "error");
      return;
    }
    if (form.mediaItems.length === 0 && existingMediaItems.length === 0) {
      showToast("At least one image or video is required.", "error");
      return;
    }

    setSaving(true);
    try {
      // Upload new media items
      const uploadedMediaItems = await Promise.all(
        form.mediaItems.map(async (item) => {
          if (item.type === 'image') {
            const uploadedAsset = await client.assets.upload("image", item.file, {
              filename: item.file.name,
            });
            return {
              _type: "mediaItem",
              _key: uploadedAsset._id,
              image: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: uploadedAsset._id,
                },
              },
            };
          } else {
            const uploadedAsset = await client.assets.upload("file", item.file, {
              filename: item.file.name,
            });
            return {
              _type: "mediaItem",
              _key: uploadedAsset._id,
              video: {
                _type: "file",
                asset: {
                  _type: "reference",
                  _ref: uploadedAsset._id,
                },
              },
            };
          }
        })
      );

      // Combine existing and new media items
      const allMediaItems = [
        ...existingMediaItems.map((item) => ({
          _type: "mediaItem",
          _key: item._key,
          ...(item.imageRef && {
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: item.imageRef },
            },
          }),
          ...(item.videoRef && {
            video: {
              _type: "file",
              asset: { _type: "reference", _ref: item.videoRef },
            },
          }),
        })),
        ...uploadedMediaItems,
      ];

      const slug = generateSlug(form.title);
      
      if (isEdit && id) {
        // Update: Don't change publishedAt
        const updateDoc = {
          title: form.title,
          slug: { _type: "slug", current: slug },
          mediaItems: allMediaItems,
        };
        await client.patch(id).set(updateDoc).commit();
        showToast("Portfolio updated successfully!");
      } else {
        // Create: Set publishedAt to now
        const createDoc = {
          _type: "portfolio",
          title: form.title,
          slug: { _type: "slug", current: slug },
          mediaItems: allMediaItems,
          publishedAt: new Date().toISOString(),
        };
        await client.create(createDoc);
        showToast("Portfolio created successfully!");
      }

      setTimeout(() => navigate("/admin/pages/portfolio"), 1500);
    } catch (err) {
      console.error(err);
      showToast("Failed to save portfolio.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-gray-400" size={36} />
      </div>
    );
  }

  return (
    <>
      <PageMeta title={`${isEdit ? "Edit" : "Create"} Portfolio | Admin`} description={`${isEdit ? "Edit" : "Create"} portfolio item`} />
      <PageBreadcrumb pageTitle={`${isEdit ? "Edit" : "Create"} Portfolio`} />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-base font-medium text-gray-800">
              {isEdit ? "Edit Portfolio Item" : "Create New Portfolio"}
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="e.g. Wedding at Bali"
                required
              />
            </div>

            {/* Media Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images / Videos <span className="text-red-500">*</span>
              </label>
              
              {/* Existing Media Items */}
              {existingMediaItems.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {existingMediaItems.map((item, index) => (
                    <div key={item._key} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : item.videoUrl ? (
                        <video src={item.videoUrl} className="w-full h-full object-cover" />
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removeExistingMediaItem(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Media Items */}
              {form.mediaItems.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {form.mediaItems.map((item, index) => (
                    <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                      {item.type === 'image' ? (
                        <img src={item.preview} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <video src={item.preview} className="w-full h-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeMediaItem(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        {item.type === 'image' ? 'Image' : 'Video'}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload images or videos</span>
                <span className="text-xs text-gray-400 mt-1">You can select multiple files</span>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  multiple 
                  onChange={handleFilesChange} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/pages/portfolio")}
              disabled={saving}
              className="px-4 py-2.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? "Update" : "Create"} Portfolio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
