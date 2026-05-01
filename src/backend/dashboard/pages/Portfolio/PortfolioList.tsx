import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/client";
import {
  Loader2,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  RefreshCw,
  X,
} from "lucide-react";

interface MediaItem {
  _key: string;
  _type: string;
  imageUrl?: string;
  videoUrl?: string;
  mimeType?: string;
}

interface Portfolio {
  _id: string;
  title: string;
  slug?: { current?: string } | null;
  mainImage?: any;
  mediaItems?: MediaItem[];
  publishedAt?: string;
}

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmTarget, setConfirmTarget] = useState<Portfolio | null>(null);
  const [viewTarget, setViewTarget] = useState<Portfolio | null>(null);
  const [deleting, setDeleting] = useState(false);
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
      const query = `*[_type == "portfolio"] | order(_createdAt desc) {
        _id, 
        _createdAt,
        title,
        slug,
        "mediaItems": mediaItems[]{
          _key,
          _type,
          "imageUrl": image.asset->url,
          "videoUrl": video.asset->url,
          "mimeType": asset->mimeType
        },
        "mainImage": mediaItems[0].image,
        "publishedAt": _createdAt
      }`;
      const data = await client.fetch(query);
      setPortfolios(data || []);
    } catch (err: any) {
      console.error("Failed to fetch portfolios:", err);
      if (err?.message?.includes("Unknown type") || err?.statusCode === 400) {
        setSchemaError(true);
      } else {
        showToast("Failed to load portfolios.", "error");
      }
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await client.delete(confirmTarget._id);
      setPortfolios((prev) => prev.filter((p) => p._id !== confirmTarget._id));
      showToast(`Portfolio "${confirmTarget.title}" deleted.`);
    } catch {
      showToast("Failed to delete portfolio.", "error");
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  const filtered = portfolios.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "—";

  return (
    <>
      <PageMeta title="Portfolio | Admin" description="Manage portfolio items" />
      <PageBreadcrumb pageTitle="Portfolio" />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-800">Portfolio Items</h3>
            <p className="text-xs text-gray-400 mt-0.5">{portfolios.length} total items</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title..."
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
            />
            <Link
              to="/admin/pages/portfolio/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} /> Add New
            </Link>
          </div>
        </div>

        {/* Grid */}
        {schemaError ? (
          <div className="py-16 px-6 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="text-orange-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Portfolio Schema Not Found</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The <code className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">portfolio</code> schema
                doesn't exist in your Sanity Studio yet.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Setup:</p>
                <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Open your Sanity Studio</li>
                  <li>Add the portfolio schema (see PORTFOLIO_SCHEMA.md)</li>
                  <li>Deploy your studio</li>
                  <li>Refresh this page</li>
                </ol>
              </div>
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
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? "No results found." : "No portfolio items yet."}
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {p.mainImage ? (
                    <img
                      src={urlFor(p.mainImage).width(400).height(300).url()}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-gray-800 line-clamp-2">{p.title || 'Untitled'}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{formatDate(p.publishedAt || '')}</p>
                    {p.mediaItems && p.mediaItems.length > 0 && (
                      <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded">
                        {p.mediaItems.length} {p.mediaItems.length === 1 ? 'file' : 'files'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex items-center gap-2">
                  <button
                    onClick={() => setViewTarget(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Eye size={13} /> View
                  </button>
                  <Link
                    to={`/admin/pages/portfolio/edit/${p._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-lg transition-colors"
                  >
                    <Edit size={13} /> Edit
                  </Link>
                  <button
                    onClick={() => setConfirmTarget(p)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
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
              <h4 className="text-base font-semibold text-gray-800">Delete Portfolio?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                You are about to delete{" "}
                <span className="font-semibold text-gray-700">"{confirmTarget.title}"</span>.
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

      {/* View Portfolio Modal */}
      {viewTarget && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{viewTarget.title || 'Untitled'}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(viewTarget.publishedAt || '')}
                  {viewTarget.slug?.current && (
                    <span className="ml-2">• Slug: <span className="font-mono">{viewTarget.slug.current}</span></span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setViewTarget(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Media Grid */}
            <div className="p-6">
              {viewTarget.mediaItems && viewTarget.mediaItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {viewTarget.mediaItems.map((item, index) => (
                    <div key={item._key || index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={`${viewTarget.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : item.videoUrl ? (
                        <video 
                          src={item.videoUrl} 
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon size={48} />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        {index + 1} / {viewTarget.mediaItems?.length || 0}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <ImageIcon size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No media items</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {viewTarget.mediaItems?.length || 0} media item{viewTarget.mediaItems?.length !== 1 ? 's' : ''}
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/pages/portfolio/edit/${viewTarget._id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                >
                  <Edit size={13} /> Edit Portfolio
                </Link>
                <button
                  onClick={() => setViewTarget(null)}
                  className="px-4 py-2 text-xs border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
