import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { client } from "../../../sanity/client";
import {
  Loader2, Save, X, Upload, AlertTriangle, CheckCircle2,
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

interface PriceItem  { label: string; price: string }
interface PackageGroup { title: string; items: PriceItem[] }
interface FeatureGroup { title: string; items: string }   // items = newline-separated string
interface AddOnItem   { label: string; price: string }

interface PricingForm {
  name: string;
  slug: string;
  description: string;
  startingPrice: string;
  order: number | string;
  isActive: boolean;
  packageGroups: PackageGroup[];
  features: FeatureGroup[];
  addOns: AddOnItem[];
}

const emptyForm: PricingForm = {
  name: "", slug: "", description: "", startingPrice: "",
  order: "", isActive: true,
  packageGroups: [], features: [], addOns: [],
};

// ─── Helper: generate slug ────────────────────────────────────

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// ─── Sub-components ───────────────────────────────────────────

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${props.className ?? ""}`}
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none ${props.className ?? ""}`}
  />
);

const SectionCard = ({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</h4>
      {action}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────

export default function PricingForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PricingForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageRef, setExistingImageRef] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Load existing doc for edit mode ──────────────────────────
  useEffect(() => {
    if (!isEdit || !id) return;
    (async () => {
      try {
        const doc = await client.fetch(
          `*[_type == "pricingService" && _id == $id][0] {
            _id, name, slug, description, startingPrice, order, isActive,
            "imageUrl": image.asset->url,
            "imageRef": image.asset._ref,
            packageGroups[]{ title, items[]{ label, price } },
            features[]{ title, items },
            addOns[]{ label, price }
          }`,
          { id }
        );
        if (doc) {
          setForm({
            name: doc.name || "",
            slug: doc.slug || "",
            description: doc.description || "",
            startingPrice: doc.startingPrice || "",
            order: doc.order ?? "",
            isActive: doc.isActive !== false,
            packageGroups: doc.packageGroups || [],
            features: (doc.features || []).map((f: any) => ({
              title: f.title,
              items: Array.isArray(f.items) ? f.items.join("\n") : (f.items || ""),
            })),
            addOns: doc.addOns || [],
          });
          if (doc.imageUrl) setImagePreview(doc.imageUrl);
          if (doc.imageRef) setExistingImageRef(doc.imageRef);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, id]);

  // ── Image handling ────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setExistingImageRef(null);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageRef(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Package Groups ────────────────────────────────────────────
  const addGroup = () =>
    setForm((f) => ({ ...f, packageGroups: [...f.packageGroups, { title: "", items: [{ label: "", price: "" }] }] }));

  const removeGroup = (gi: number) =>
    setForm((f) => ({ ...f, packageGroups: f.packageGroups.filter((_, i) => i !== gi) }));

  const updateGroupTitle = (gi: number, title: string) =>
    setForm((f) => {
      const groups = [...f.packageGroups];
      groups[gi] = { ...groups[gi], title };
      return { ...f, packageGroups: groups };
    });

  const addGroupItem = (gi: number) =>
    setForm((f) => {
      const groups = [...f.packageGroups];
      groups[gi] = { ...groups[gi], items: [...groups[gi].items, { label: "", price: "" }] };
      return { ...f, packageGroups: groups };
    });

  const removeGroupItem = (gi: number, ii: number) =>
    setForm((f) => {
      const groups = [...f.packageGroups];
      groups[gi] = { ...groups[gi], items: groups[gi].items.filter((_, i) => i !== ii) };
      return { ...f, packageGroups: groups };
    });

  const updateGroupItem = (gi: number, ii: number, field: "label" | "price", value: string) =>
    setForm((f) => {
      const groups = [...f.packageGroups];
      const items = [...groups[gi].items];
      items[ii] = { ...items[ii], [field]: value };
      groups[gi] = { ...groups[gi], items };
      return { ...f, packageGroups: groups };
    });

  // ── Features / Includes ───────────────────────────────────────
  const addFeature = () =>
    setForm((f) => ({ ...f, features: [...f.features, { title: "", items: "" }] }));

  const removeFeature = (fi: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== fi) }));

  const updateFeature = (fi: number, field: "title" | "items", value: string) =>
    setForm((f) => {
      const features = [...f.features];
      features[fi] = { ...features[fi], [field]: value };
      return { ...f, features };
    });

  // ── Add-Ons ───────────────────────────────────────────────────
  const addAddOn = () =>
    setForm((f) => ({ ...f, addOns: [...f.addOns, { label: "", price: "" }] }));

  const removeAddOn = (ai: number) =>
    setForm((f) => ({ ...f, addOns: f.addOns.filter((_, i) => i !== ai) }));

  const updateAddOn = (ai: number, field: "label" | "price", value: string) =>
    setForm((f) => {
      const addOns = [...f.addOns];
      addOns[ai] = { ...addOns[ai], [field]: value };
      return { ...f, addOns };
    });

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) { showToast("Service name is required.", "error"); return; }
    if (!form.startingPrice.trim()) { showToast("Starting price is required.", "error"); return; }
    if (!imageFile && !existingImageRef) { showToast("Service image is required.", "error"); return; }

    setSaving(true);
    try {
      // 1. Upload image if new
      let imageField: any = null;
      if (imageFile) {
        const asset = await client.assets.upload("image", imageFile, { filename: imageFile.name });
        imageField = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      } else if (existingImageRef) {
        imageField = { _type: "image", asset: { _type: "reference", _ref: existingImageRef } };
      }

      // 2. Build features array (convert textarea items to string[])
      const featuresPayload = form.features.map((f) => ({
        title: f.title,
        items: f.items.split("\n").map((s) => s.trim()).filter(Boolean),
      }));

      // 3. Build doc payload
      const payload: any = {
        name: form.name.trim(),
        slug: form.slug.trim() || toSlug(form.name),
        description: form.description.trim(),
        startingPrice: form.startingPrice.trim(),
        order: form.order !== "" ? Number(form.order) : 0,
        isActive: form.isActive,
        image: imageField,
        packageGroups: form.packageGroups,
        features: featuresPayload,
        addOns: form.addOns,
      };

      if (isEdit && id) {
        await client.patch(id).set(payload).commit();
        showToast("Pricing service updated!");
      } else {
        await client.create({ _type: "pricingService", ...payload });
        showToast("Pricing service created!");
      }

      setTimeout(() => navigate("/admin/pages/pricing"), 1500);
    } catch (err) {
      console.error(err);
      showToast("Failed to save. Please try again.", "error");
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
      <PageMeta
        title={`${isEdit ? "Edit" : "Add"} Pricing Service | Admin`}
        description="Manage pricing service"
      />
      <PageBreadcrumb pageTitle={isEdit ? "Edit Pricing Service" : "Add Pricing Service"} />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">

        {/* ── Section A: Basic Info ─────────────────────────── */}
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label required>Service Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: toSlug(e.target.value) })}
                placeholder="e.g. Photobooth"
              />
            </div>
            <div>
              <Label required>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })}
                placeholder="e.g. photobooth"
              />
              <p className="text-xs text-gray-400 mt-1">Used to match the /services/[slug] route</p>
            </div>
            <div>
              <Label required>Starting Price</Label>
              <Input
                value={form.startingPrice}
                onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                placeholder="e.g. Rp 3.300.000"
              />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                placeholder="e.g. 1"
                min={0}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Short description shown in the accordion header..."
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isActive ? "bg-brand-500" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isActive ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {form.isActive ? "Active — visible on pricing page" : "Inactive — hidden from pricing page"}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* ── Section B: Image ──────────────────────────────── */}
        <SectionCard title="Service Image (Required)">
          {imagePreview ? (
            <div className="relative w-full max-w-sm">
              <img src={imagePreview} alt="Preview" className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-200" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Upload size={28} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Click to upload service image</span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — shown in ecosystem card</span>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </SectionCard>

        {/* ── Section C: Package Groups ─────────────────────── */}
        <SectionCard
          title="Pricing Packages"
          action={
            <button type="button" onClick={addGroup} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-brand-500 hover:bg-brand-600 text-white rounded-lg">
              <Plus size={12} /> Add Package Group
            </button>
          }
        >
          {form.packageGroups.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No package groups yet. Click "Add Package Group" to start.</p>
          ) : (
            <div className="space-y-6">
              {form.packageGroups.map((group, gi) => (
                <div key={gi} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  {/* Group header */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                    <GripVertical size={14} className="text-gray-400 shrink-0" />
                    <Input
                      value={group.title}
                      onChange={(e) => updateGroupTitle(gi, e.target.value)}
                      placeholder="Package group name e.g. Classic Unlimited"
                      className="flex-1 !py-1.5 text-xs"
                    />
                    <button type="button" onClick={() => removeGroup(gi)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Group items */}
                  <div className="p-4 space-y-2">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="flex items-center gap-2">
                        <Input
                          value={item.label}
                          onChange={(e) => updateGroupItem(gi, ii, "label", e.target.value)}
                          placeholder="Label e.g. 2 Hours"
                          className="flex-1 !py-1.5 text-xs"
                        />
                        <Input
                          value={item.price}
                          onChange={(e) => updateGroupItem(gi, ii, "price", e.target.value)}
                          placeholder="Price e.g. Rp 3.500.000"
                          className="flex-1 !py-1.5 text-xs"
                        />
                        <button type="button" onClick={() => removeGroupItem(gi, ii)} className="p-1.5 text-red-400 hover:text-red-600 shrink-0">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addGroupItem(gi)} className="mt-2 inline-flex items-center gap-1 text-xs text-brand-500 hover:underline">
                      <Plus size={12} /> Add item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* ── Section D: Features / Includes ───────────────── */}
        <SectionCard
          title="Features / Includes"
          action={
            <button type="button" onClick={addFeature} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-brand-500 hover:bg-brand-600 text-white rounded-lg">
              <Plus size={12} /> Add Feature Group
            </button>
          }
        >
          {form.features.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No feature groups yet. Click "Add Feature Group" to start.</p>
          ) : (
            <div className="space-y-4">
              {form.features.map((feat, fi) => (
                <div key={fi} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                    <Input
                      value={feat.title}
                      onChange={(e) => updateFeature(fi, "title", e.target.value)}
                      placeholder="Group name e.g. Man Power, Equipment"
                      className="flex-1 !py-1.5 text-xs"
                    />
                    <button type="button" onClick={() => removeFeature(fi)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-4">
                    <Textarea
                      value={feat.items}
                      onChange={(e) => updateFeature(fi, "items", e.target.value)}
                      rows={4}
                      placeholder={"1 Director Photography\n1 Crew Runner\nLighting Godox SL200"}
                    />
                    <p className="text-xs text-gray-400 mt-1">One item per line</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* ── Section E: Add-Ons ────────────────────────────── */}
        <SectionCard
          title="Add-Ons"
          action={
            <button type="button" onClick={addAddOn} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-brand-500 hover:bg-brand-600 text-white rounded-lg">
              <Plus size={12} /> Add Add-On
            </button>
          }
        >
          {form.addOns.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No add-ons yet.</p>
          ) : (
            <div className="space-y-2">
              {form.addOns.map((addon, ai) => (
                <div key={ai} className="flex items-center gap-2">
                  <Input
                    value={addon.label}
                    onChange={(e) => updateAddOn(ai, "label", e.target.value)}
                    placeholder="Add-on name e.g. Greenscreen Setup"
                    className="flex-1 !py-1.5 text-xs"
                  />
                  <Input
                    value={addon.price}
                    onChange={(e) => updateAddOn(ai, "price", e.target.value)}
                    placeholder="Price e.g. Rp 2.500.000"
                    className="w-40 !py-1.5 text-xs"
                  />
                  <button type="button" onClick={() => removeAddOn(ai)} className="p-1.5 text-red-400 hover:text-red-600 shrink-0">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* ── Footer Actions ────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/pages/pricing")}
            disabled={saving}
            className="px-5 py-2.5 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 size={16} className="animate-spin" /> Saving...</>
            ) : (
              <><Save size={16} /> {isEdit ? "Update Service" : "Create Service"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
