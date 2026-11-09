"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

import ModalBackdrop from "./common/modalBackdrop";
import homeContent from "@/content/home.json";

const gallery = homeContent.gallery;
const galleryImages = gallery.images;

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialDisplayCount = gallery.initialDisplayCount;

  const displayedImages = showAll
    ? galleryImages
    : galleryImages.slice(0, initialDisplayCount);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        closeModal();
      }

      if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex((current) => (current !== null ? current - 1 : null));
      }

      if (e.key === "ArrowRight" && selectedIndex < galleryImages.length - 1) {
        setSelectedIndex((current) => (current !== null ? current + 1 : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  if (!galleryImages.length) return null;

  return (
    <>
      {/* Gallery Heading */}
      <section className="mb-10 px-4 text-center">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[2px] text-primary">
          {gallery.label}
        </span>

        <h2 className="font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
          {gallery.title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[#555]">
          {gallery.description}
        </p>
      </section>

      {/* Gallery Images */}
      <section className="mb-20 grid grid-cols-2 gap-1 p-1 sm:grid-cols-3 md:grid-cols-5">
        {displayedImages.map((img, index) => (
          <div
            key={`${img}-${index}`}
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => openModal(index)}
          >
            <Image
              src={img}
              alt={`Gallery ${index + 1}`}
              width={400}
              height={240}
              className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[240px]"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
                {gallery.viewButtonText}
              </span>
            </div>
          </div>
        ))}

        {/* View All Button */}
        {!showAll && galleryImages.length > initialDisplayCount && (
          <div
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => setShowAll(true)}
          >
            <div className="flex h-[180px] w-full flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 transition duration-500 group-hover:scale-105 sm:h-[240px]">
              <FaImages className="mb-3 h-12 w-12 text-white/80" />

              <span className="text-lg font-bold text-white">
                +{galleryImages.length - initialDisplayCount} More
              </span>

              <span className="text-sm text-white/60">
                {gallery.viewAllText}
              </span>
            </div>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && galleryImages.length > initialDisplayCount && (
          <div
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => setShowAll(false)}
          >
            <div className="flex h-[180px] w-full flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 transition duration-500 group-hover:scale-105 sm:h-[240px]">
              <span className="text-lg font-bold text-white">
                {gallery.showLessText}
              </span>

              <span className="text-sm text-white/60">
                {gallery.collapseText}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Image Preview Modal */}
      {selectedIndex !== null && (
        <ModalBackdrop
          onClose={closeModal}
          className="z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
        >
          <div className="relative flex h-full w-full items-center justify-center p-4">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 hover:text-primary"
              aria-label="Close gallery"
            >
              <FaTimes className="h-6 w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-sm font-medium text-white/80">
              {selectedIndex + 1} / {galleryImages.length}
            </div>

            {/* Main Image */}
            <div className="relative flex h-full max-h-[85vh] w-full max-w-5xl items-center justify-center">
              <Image
                src={galleryImages[selectedIndex]}
                alt={`Gallery ${selectedIndex + 1}`}
                width={1200}
                height={800}
                priority
                unoptimized
                className="h-full w-full object-contain"
              />
            </div>

            {/* Previous Button */}
            {selectedIndex > 0 && (
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 hover:text-primary"
                aria-label="Previous image"
              >
                <FaChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Next Button */}
            {selectedIndex < galleryImages.length - 1 && (
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 hover:text-primary"
                aria-label="Next image"
              >
                <FaChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default Gallery;
