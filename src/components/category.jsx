import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clothesIcon from "../assets/category/Clothes.png";
import electronicsIcon from "../assets/category/Electronics.png";
import shoesIcon from "../assets/category/Shoes.png";
import watchIcon from "../assets/category/Watch.png";
import beautyIcon from "../assets/category/Beauty.png";
import bagIcon from "../assets/category/Bag.png";

const categories = [
    { id: 1, name: "Clothes", icon: clothesIcon },
    { id: 2, name: "Electronics", icon: electronicsIcon },
    { id: 3, name: "Shoes", icon: shoesIcon },
    { id: 4, name: "Watch", icon: watchIcon },
    { id: 5, name: "Beauty", icon: beautyIcon },
    { id: 6, name: "Bags", icon: bagIcon },
];

const Category = () => {
    const [showAll, setShowAll] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    // Dynamically track screen width
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine number of categories to show by default
    const defaultVisible = isDesktop ? 5 : 4;

    return (
        <section className="category-section py-4">
            <div className="container">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-semibold mb-0">Category</h5>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "See All"}
                    </button>
                </div>

                {/* Categories Row / Grid */}
                <div
                    className={`d-flex gap-3 flex-nowrap flex-md-wrap ${showAll ? "justify-start flex-wrap" : "overflow-auto"
                        }`}
                >
                    {(showAll ? categories : categories.slice(0, defaultVisible)).map(
                        ({ id, name, icon }) => (
                            <Link
                                key={id}
                                to={`/category/${name.toLowerCase()}`}
                                className="text-center category-item text-decoration-none flex-shrink-0"
                                style={{
                                    width: isDesktop
                                        ? `calc(20% - 1rem)` // 5 items per row on desktop
                                        : "22%", // ~4 items per row on mobile
                                    minWidth: "80px",
                                }}
                            >
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mb-2 mx-auto shadow-sm"
                                    style={{
                                        width: 70,
                                        height: 70,
                                        backgroundColor: "#fff1f1",
                                    }}
                                >
                                    <img
                                        src={icon}
                                        alt={name}
                                        style={{ width: 35, height: 35, objectFit: "contain" }}
                                    />
                                </div>
                                <p className="small mb-0 text-muted">{name}</p>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Category;
