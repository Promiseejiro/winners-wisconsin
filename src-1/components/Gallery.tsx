"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";
import ModalBackdrop from "./common/modalBackdrop";

const galleryImages = [
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 4);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft" && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        if (
          e.key === "ArrowRight" &&
          selectedIndex < galleryImages.length - 1
        ) {
          setSelectedIndex(selectedIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 p-1 mb-20">
        {displayedImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden cursor-pointer relative group"
            onClick={() => openModal(index)}
          >
            <Image
              src={img}
              alt={`Gallery ${index + 1}`}
              width={400}
              height={240}
              className="h-[180px] sm:h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium bg-black/60 px-3 py-1.5 rounded-full">
                View
              </span>
            </div>
          </div>
        ))}

        {!showAll && galleryImages.length > 5 && (
          <div
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => setShowAll(true)}
          >
            <div className="h-[180px] sm:h-[240px] w-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center transition duration-500 group-hover:scale-105">
              <FaImages className="w-12 h-12 text-white/80 mb-3" />
              <span className="text-white text-lg font-bold">
                +{galleryImages.length - 5} More
              </span>
              <span className="text-white/60 text-sm">View All Photos</span>
            </div>
          </div>
        )}

        {/* View Less Button */}
        {showAll && galleryImages.length > 5 && (
          <div
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => setShowAll(false)}
          >
            <div className="h-[180px] sm:h-[240px] w-full bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center transition duration-500 group-hover:scale-105">
              <span className="text-white text-lg font-bold">Show Less</span>
              <span className="text-white/60 text-sm">Collapse</span>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedIndex !== null && (
        <ModalBackdrop
          onClose={closeModal}
          className="bg-black/95 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Close gallery"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white/80 text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
              {selectedIndex + 1} / {galleryImages.length}
            </div>

            {/* Main Image */}
            <div className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center">
              <Image
                src={galleryImages[selectedIndex]}
                alt={`Gallery ${selectedIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Navigation Buttons */}
            {selectedIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 text-white hover:text-primary transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>
            )}

            {selectedIndex < galleryImages.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 text-white hover:text-primary transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3"
                aria-label="Next image"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default Gallery;
