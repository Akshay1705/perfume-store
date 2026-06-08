import { useState, useEffect } from "react";
import { Upload, Trash2, Star, Loader2 } from "lucide-react";

export default function VariantImageManager({
    variant,
    csrf_token,
    onImagesChange,
}) {
    const [images, setImages] = useState(variant.images || []);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    useEffect(() => {
        setImages(variant.images || []);
    }, [variant.id]);

    const updateImages = (newImages) => {
        setImages(newImages);
        onImagesChange?.(newImages);
    };

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("image", file);
        if (images.length === 0) {
            formData.append("is_primary", "1");
        }

        try {
            setUploading(true);
            setUploadError("");
            const response = await fetch(
                `/admin/variants/${variant.id}/images`,
                {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrf_token,
                        Accept: "application/json",
                    },
                    body: formData,
                },
            );
            const text = await response.text();
            let data = {};
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server returned non-JSON response");
            }
            if (!response.ok) throw new Error(data.error || "Upload failed");
            updateImages([...images, data.image]);
        } catch (err) {
            setUploadError(err.message);
            setTimeout(() => setUploadError(""), 4000);
        } finally {
            setUploading(false);
        }
    }

    async function deleteImage(imageId) {
        if (!confirm("Delete this image?")) return;
        try {
            const response = await fetch(
                `/admin/variants/${variant.id}/images/${imageId}`,
                {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": csrf_token,
                        Accept: "application/json",
                    },
                },
            );
            const text = await response.text();
            let data = {};
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server returned non-JSON response");
            }
            if (!response.ok) throw new Error(data.error || "Delete failed");
            updateImages(data.images);
        } catch (err) {
            alert(err.message);
        }
    }

    async function setPrimary(imageId) {
        try {
            const response = await fetch(
                `/admin/variants/${variant.id}/images/${imageId}/primary`,
                {
                    method: "PUT",
                    headers: {
                        "X-CSRF-TOKEN": csrf_token,
                        Accept: "application/json",
                    },
                },
            );
            const text = await response.text();
            let data = {};
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server returned non-JSON response");
            }
            if (!response.ok) throw new Error(data.error);
            updateImages(data.images);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-900/30 p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Images
                </span>
                <span className="text-xs text-slate-500">
                    {images.length} {images.length === 1 ? "image" : "images"}
                </span>
            </div>

            {/* Error */}
            {uploadError && (
                <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    ⚠️ {uploadError}
                </div>
            )}

            {/* Images grid + upload button */}
            <div className="flex flex-wrap gap-3 items-start">
                {/* Existing images */}
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative group w-24 h-24 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-800/40 flex-shrink-0"
                    >
                        <img
                            src={image.url}
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        {/* Primary badge */}
                        {!!image.is_primary && (
                            <div className="absolute top-1 left-1">
                                <span className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md shadow">
                                    <Star size={9} fill="white" /> Primary
                                </span>
                            </div>
                        )}

                        {/* Hover overlay with actions */}
                        <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                            {!image.is_primary && (
                                <button
                                    type="button"
                                    onClick={() => setPrimary(image.id)}
                                    className="w-full text-[10px] font-medium bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 rounded px-1.5 py-1 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Star size={9} /> Set Primary
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => deleteImage(image.id)}
                                className="w-full text-[10px] font-medium bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 rounded px-1.5 py-1 transition-colors flex items-center justify-center gap-1"
                            >
                                <Trash2 size={9} /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Upload button */}
                <label className="w-24 h-24 flex-shrink-0 cursor-pointer group">
                    <div
                        className={`w-full h-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all
                        ${
                            uploading
                                ? "border-slate-600 bg-slate-800/20 cursor-not-allowed"
                                : "border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/5 cursor-pointer"
                        }`}
                    >
                        {uploading ? (
                            <Loader2
                                size={18}
                                className="text-slate-400 animate-spin"
                            />
                        ) : (
                            <>
                                <Upload
                                    size={18}
                                    className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                                />
                                <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors text-center leading-tight px-1">
                                    Add Image
                                </span>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                uploadImage(file);
                                e.target.value = "";
                            }
                        }}
                    />
                </label>
            </div>
        </div>
    );
}
