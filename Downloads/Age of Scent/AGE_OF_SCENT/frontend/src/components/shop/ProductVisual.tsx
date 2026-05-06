"use client";

import { useEffect, useMemo, useState } from "react";
import { mediaUrl } from "@/lib/api";

type ProductVisualProps = {
    name: string;
    imageUrl?: string;
    className?: string;
};

function resolveProductImageUrl(imageUrl?: string) {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("/uploads/")) return mediaUrl(imageUrl);
    return imageUrl;
}

export default function ProductVisual({
    name,
    imageUrl,
    className = ""
}: ProductVisualProps) {
    const [imageFailed, setImageFailed] = useState(false);
    const resolvedImageUrl = useMemo(() => resolveProductImageUrl(imageUrl), [imageUrl]);
    useEffect(() => {
        setImageFailed(false);
    }, [resolvedImageUrl]);

    const showImage = Boolean(resolvedImageUrl) && !imageFailed;

    return (
        <div className={`product-visual ${className}`.trim()} aria-label={name}>
            <div className="product-visual__halo" />
            {showImage ? (
                <img
                    src={resolvedImageUrl}
                    alt={name}
                    className="product-visual__image"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <div className="product-visual__bottle" aria-hidden="true">
                    <span className="product-visual__cap" />
                    <span className="product-visual__neck" />
                    <span className="product-visual__glass">
                        <span className="product-visual__shine" />
                        <span className="product-visual__label">{name.split(" ")[0]}</span>
                    </span>
                </div>
            )}
        </div>
    );
}
