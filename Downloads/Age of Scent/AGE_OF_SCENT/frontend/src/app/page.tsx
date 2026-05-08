"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from "react";
import ProductCard, { type ProductCardData } from "@/components/shop/ProductCard";
import ProductVisual from "@/components/shop/ProductVisual";
import { api } from "@/lib/api";
import { addToCart } from "@/lib/cart";

type Product = ProductCardData & {
    isActive?: boolean;
};

type ContactState = {
    name: string;
    email: string;
    message: string;
};

const fallbackProducts: Product[] = [
    {
        id: 1,
        slug: "aurum-noir-parfum",
        name: "Aurum Noir Parfum",
        description: "A velvet evening fragrance built around black orchid, smoked vanilla, and warm amber.",
        scentNotes: "Black orchid, vanilla, amber, cedar",
        volume: "50 ml",
        mood: "Evening scent",
        price: 3490,
        stock: 18,
        imageUrl: "/images/products/aurum-noir.svg"
    },
    {
        id: 2,
        slug: "rose-velours-eau-de-parfum",
        name: "Rose Velours Eau de Parfum",
        description: "A luminous rose composition softened with lychee, iris, and white musk.",
        scentNotes: "Damask rose, lychee, iris, white musk",
        volume: "75 ml",
        mood: "Romantic floral",
        price: 2890,
        stock: 24,
        imageUrl: "/images/products/rose-velours.svg"
    },
    {
        id: 3,
        slug: "citrus-atelier-eau-de-parfum",
        name: "Citrus Atelier Eau de Parfum",
        description: "Fresh bergamot and neroli wrapped in tea leaves, vetiver, and sunlit woods.",
        scentNotes: "Bergamot, neroli, tea, vetiver",
        volume: "50 ml",
        mood: "Daylight elegance",
        price: 2490,
        stock: 30,
        imageUrl: "/images/products/citrus-atelier.svg"
    }
];

const storySteps = [
    {
        number: "01",
        title: "For the Student",
        text: 'Stay "fresh" from the morning lecture to the late-night group study.'
    },
    {
        number: "02",
        title: "For the Driver & Worker",
        text: "A scent that cuts through the smoke and the sweat, keeping you smelling clean and professional through every shift."
    },
    {
        number: "03",
        title: "For Every Pinoy",
        text: "A high-quality fragrance that doesn't break the bank. Because looking and smelling \"premium\" shouldn't be a luxury—it should be your daily standard"
    }
];

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productMessage, setProductMessage] = useState("Loading perfumes...");
    const [scrollY, setScrollY] = useState(0);
    const [heroAdded, setHeroAdded] = useState(false);
    const [contact, setContact] = useState<ContactState>({
        name: "",
        email: "",
        message: ""
    });
    const [contactMessage, setContactMessage] = useState("");
    const [contactLoading, setContactLoading] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get<{
                    success: boolean;
                    message: string;
                    data: Product[];
                }>("/products");

                setProducts(response.data || []);
                setProductMessage("");
            } catch (error) {
                setProductMessage(
                    error instanceof Error
                        ? `${error.message} Showing curated preview perfumes.`
                        : "Showing curated preview perfumes."
                );
            }
        }

        loadProducts();
    }, []);

    useEffect(() => {
        let ticking = false;

        function handleScroll() {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                setScrollY(window.scrollY);
                ticking = false;
            });
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        revealTargets.forEach((target) => observer.observe(target));
        return () => observer.disconnect();
    }, [products.length]);

    useEffect(() => {
        if (!heroAdded) return;

        const timeout = window.setTimeout(() => setHeroAdded(false), 1500);
        return () => window.clearTimeout(timeout);
    }, [heroAdded]);

    const featuredProducts = useMemo(
        () => (products.length > 0 ? products : fallbackProducts),
        [products]
    );

    const heroProduct = featuredProducts[0] || fallbackProducts[0];

    function handleHeroAdd() {
        addToCart(heroProduct, 1);
        setHeroAdded(true);
    }

    async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setContactLoading(true);
        setContactMessage("");

        try {
            const response = await api.post<{
                success: boolean;
                message: string;
                data: unknown;
            }>("/contact", contact);

            setContactMessage(response.message || "Your private consultation request has been received.");
            setContact({ name: "", email: "", message: "" });
        } catch (error) {
            setContactMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to submit your consultation request right now."
            );
        } finally {
            setContactLoading(false);
        }
    }

    return (
        <div className="luxury-home">
            <section className="cinematic-hero" id="home">
                <div
                    className="hero-parallax hero-parallax--back"
                    style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
                />
                <div
                    className="hero-parallax hero-parallax--mid"
                    style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
                />

                <div className="cinematic-hero__content">
                    <div className="cinematic-hero__copy reveal is-visible">
                        <p className="eyebrow">Age of Scent</p>
                        <h1>The energy of youth in every spray</h1>
                        <p className="hero-lede">
                            bacause your best years are expertly handled by Age of Scent
                        </p>

                        <div className="hero-actions">
                            <Link href="/shop" className="btn">
                                Shop Perfumes
                            </Link>
                            <Link href="#story" className="btn btn--ghost">
                                Read Story
                            </Link>
                        </div>
                    </div>

                    <div
                        className="cinematic-hero__visual reveal is-visible"
                        style={{
                            "--parallax-lift": `${Math.min(scrollY * -0.1, 0)}px`
                        } as CSSProperties}
                    >
                        <ProductVisual
                            name={heroProduct.name}
                            imageUrl={heroProduct.imageUrl}
                            className="product-visual--hero"
                        />
                        <div className="hero-product-card">
                            <span>{heroProduct.mood || "Iconic scent"}</span>
                            <strong>{heroProduct.name}</strong>
                            <button
                                className={`btn btn--small ${heroAdded ? "is-added" : ""}`}
                                type="button"
                                onClick={handleHeroAdd}
                            >
                                {heroAdded ? "Added to Cart" : `Add - PHP ${heroProduct.price.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>

                <a className="scroll-cue" href="#story" aria-label="Scroll to brand story">
                    <span />
                    Begin the story
                </a>
            </section>

            <section className="story-section section-pad" id="story">
                <div className="section-kicker reveal">The Maison</div>
                <div className="story-grid">
                    <div className="story-copy reveal">
                        <p className="eyebrow">Brand Story</p>
                        <h2>The Fragrance of the Filipino Grind</h2>
                        <p className="muted large-copy">
                            Because the hustle never stops, and neither should your scent. Whether you’re a student chasing a degree, a driver navigating the heat of the highway, or a worker keeping the world moving your day is long, demanding, and tough. But no matter how hard the &quot;grind&quot; gets, you deserve to feel at your best.
                        </p>
                    </div>

                    <div className="story-panel reveal">
                        <p>
                            Age of Scent is for the everyday heroes. It’s for the people who wake up before the sun and come home long after it sets. We didn’t just create a perfume; we created a shield against the heat, the dust, and the exhaustion of daily life.
                        </p>
                    </div>
                </div>

                <div className="story-steps">
                    {storySteps.map((step, index) => (
                        <article
                            className="story-step reveal"
                            key={step.number}
                            style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
                        >
                            <span>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p className="muted">{step.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="shop-story-section section-pad" id="atelier">
                <div className="section-heading reveal">
                    <p className="eyebrow">Admin Managed Product List</p>
                    <h2>Perfumes pulled from your backend API.</h2>
                    {productMessage ? <p className="muted">{productMessage}</p> : null}
                </div>

                <div className="product-grid product-grid--cinematic">
                    {featuredProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            revealDelay={index * 110}
                        />
                    ))}
                </div>
            </section>

            <section className="contact-section section-pad" id="contact">
                <div className="contact-card reveal">
                    <div>
                        <p className="eyebrow">Private Consultation</p>
                        <h2>Let the atelier help you choose your signature.</h2>
                        <p className="muted">
                            Tell us the mood, occasion, or notes you love. Your message is submitted
                            through the backend API without changing the existing admin, auth, or order
                            routes.
                        </p>
                    </div>

                    <form className="form-card contact-form" onSubmit={handleContactSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={contact.name}
                                onChange={(event) =>
                                    setContact((current) => ({ ...current, name: event.target.value }))
                                }
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={contact.email}
                                onChange={(event) =>
                                    setContact((current) => ({ ...current, email: event.target.value }))
                                }
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                value={contact.message}
                                onChange={(event) =>
                                    setContact((current) => ({ ...current, message: event.target.value }))
                                }
                                placeholder="I want something warm, elegant, and long lasting..."
                                required
                            />
                        </div>

                        <button className="btn" type="submit" disabled={contactLoading}>
                            {contactLoading ? "Sending..." : "Request Consultation"}
                        </button>

                        {contactMessage ? <p className="muted">{contactMessage}</p> : null}
                    </form>
                </div>
            </section>
        </div>
    );
}
