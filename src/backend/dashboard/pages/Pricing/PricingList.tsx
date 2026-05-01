import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { client } from "../../../sanity/client";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
} from "lucide-react";

interface PricingService {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  startingPrice?: string;
  order?: number;
  isActive: boolean;
  imageUrl?: string;
  _createdAt: string;
}

export default function PricingList() {
  const [services, setServices] = useState<PricingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmTarget, setConfirmTarget] = useState<PricingService | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [schemaError, setSchemaError] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    setLoading(true);
    setSchemaError(false);
    try {
      const query = `*[_type == "pricingService"] | order(order asc, _createdAt desc) {
        _id, _createdAt,
        name, slug, description, startingPrice, order, isActive,
        "imageUrl": image.asset->url
      }`;
      const data = await client.fetch(query);
      setServices(data || []);
    } catch (err: any) {
      console.error("Failed to fetch pricing services:", err);
      if (err?.message?.includes("Unknown type") || err?.statusCode === 400) {
        setSchemaError(true);
      } else {
        showToast("Failed to load pricing services.", "error");
      }
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await client.delete(confirmTarget._id);
      setServices((prev) => prev.filter((s) => s._id !== confirmTarget._id));
      showToast(`"${confirmTarget.name}" deleted.`);
    } catch {
      showToast("Failed to delete.", "error");
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  const handleToggleActive = async (service: PricingService) => {
    setToggling(service._id);
    try {
      await client.patch(service._id).set({ isActive: !service.isActive }).commit();
      setServices((prev) =>
        prev.map((s) => s._id === service._id ? { ...s, isActive: !s.isActive } : s)
      );
      showToast(`"${service.name}" ${!service.isActive ? "activated" : "deactivated"}.`);
    } catch {
      showToast("Failed to update status.", "error");
    } finally {
      setToggling(null);
    }
  };

  return (
    <>
      <PageMeta title="Pricing | Admin" description="Manage pricing services" />
      <PageBreadcrumb pageTitle="Pricing Pages" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-800">Services & Pricing</h3>
            <p className="text-xs text-gray-400 mt-0.5">{services.length} total services</p>
          </div>
          <Link
            to="/admin/pages/pricing/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} /> Add New Service
          </Link>
        </div>

        {/* Content */}
        {schemaError ? (
          <div className="py-16 px-6 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="text-orange-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Schema Not Found</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The <code className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">pricingService</code> schema
                doesn't exist in Sanity yet. Add one service via the button above and it will be created automatically.
              </p>
              <button
                onClick={load}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : services.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No pricing services yet.{" "}
            <Link to="/admin/pages/pricing/create" className="text-brand-500 hover:underline font-medium">
              Add your first service
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {services.map((service, idx) => (
              <div key={service._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {/* Order badge */}
                <span className="text-xs font-bold text-gray-400 w-6 text-center shrink-0">
                  {String(service.order ?? idx + 1).padStart(2, "0")}
                </span>

                {/* Image */}
                <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{service.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{service.description || "—"}</p>
                  {service.startingPrice && (
                    <p className="text-xs font-medium text-brand-600 mt-1">Starting from {service.startingPrice}</p>
                  )}
                </div>

                {/* Active Toggle */}
                <button
                  onClick={() => handleToggleActive(service)}
                  disabled={toggling === service._id}
                  className="flex items-center gap-1.5 text-xs font-medium shrink-0 disabled:opacity-50"
                  title={service.isActive ? "Click to deactivate" : "Click to activate"}
                >
                  {toggling === service._id ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : service.isActive ? (
                    <ToggleRight size={22} className="text-green-500" />
                  ) : (
                    <ToggleLeft size={22} className="text-gray-400" />
                  )}
                  <span className={service.isActive ? "text-green-600" : "text-gray-400"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </button>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={`/admin/pages/pricing/edit/${service._id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-lg transition-colors"
                  >
                    <Edit size={12} /> Edit
                  </Link>
                  <button
                    onClick={() => setConfirmTarget(service)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={22} />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Delete Service?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                You are about to delete{" "}
                <span className="font-semibold text-gray-700">"{confirmTarget.name}"</span>.{" "}
                <br />
                <span className="text-red-500 font-medium">This action cannot be undone.</span>
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setConfirmTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
