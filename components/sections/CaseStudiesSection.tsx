"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { caseStudies } from "@/lib/case-studies";

interface LightboxState {
  isOpen: boolean;
  caseStudyId: string | null;
  currentImageIndex: number;
}

export function CaseStudiesSection() {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    caseStudyId: null,
    currentImageIndex: 0,
  });

  const openLightbox = (caseStudyId: string) => {
    setLightbox({ isOpen: true, caseStudyId, currentImageIndex: 0 });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, caseStudyId: null, currentImageIndex: 0 });
  };

  const goToNextImage = () => {
    const caseStudy = caseStudies.find((c) => c.id === lightbox.caseStudyId);
    if (caseStudy) {
      setLightbox((prev) => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex + 1) % caseStudy.images.length,
      }));
    }
  };

  const goToPrevImage = () => {
    const caseStudy = caseStudies.find((c) => c.id === lightbox.caseStudyId);
    if (caseStudy) {
      setLightbox((prev) => ({
        ...prev,
        currentImageIndex:
          prev.currentImageIndex === 0
            ? caseStudy.images.length - 1
            : prev.currentImageIndex - 1,
      }));
    }
  };

  const activeCaseStudy = caseStudies.find((c) => c.id === lightbox.caseStudyId);

  return (
    <>
      <section
        className="py-20 xl:py-24 bg-gradient-to-b from-white to-gray-50"
        aria-labelledby="case-studies-heading"
      >
        <div className="px-6 md:px-8 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-16 text-center">
            <SectionLabel>Our Work</SectionLabel>
            <h2
              id="case-studies-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              Proven Results for Real Clients
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              See how we've helped businesses like yours streamline operations,
              reduce costs, and accelerate growth.
            </p>
          </div>

          {/* Case Studies Grid */}
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy) => (
                <StaggerItem key={caseStudy.id}>
                  <motion.button
                    onClick={() => openLightbox(caseStudy.id)}
                    className="group h-full text-left bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
                    whileHover={{ y: -4 }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={caseStudy.thumbnail}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback gradient if image fails to load
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {/* Fallback gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50" />

                      {/* Click indicator */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to view
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {caseStudy.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">
                        {caseStudy.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-3">
                        {caseStudy.description}
                      </p>

                      {/* Quick Results Preview */}
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                        {caseStudy.results.slice(0, 2).map((result) => (
                          <div
                            key={result.label}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-gray-600">{result.label}</span>
                            <span className="font-semibold text-green-600">
                              {result.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox.isOpen && activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Close Button */}
              <div className="sticky top-0 right-0 p-4 flex justify-end bg-white border-b">
                <button
                  onClick={closeLightbox}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {activeCaseStudy.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                    {activeCaseStudy.title}
                  </h2>
                  <p className="text-gray-600 mt-4 text-lg">
                    {activeCaseStudy.description}
                  </p>
                </div>

                {/* Image Gallery */}
                <div className="mb-8">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 min-h-96 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={lightbox.currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={activeCaseStudy.images[lightbox.currentImageIndex]}
                        alt={`${activeCaseStudy.title} - Image ${lightbox.currentImageIndex + 1}`}
                        className="max-h-[600px] max-w-full object-contain"
                        onError={(e) => {
                          // Fallback if image fails
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {activeCaseStudy.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors"
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors"
                          aria-label="Next image"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>

                  {/* Image Indicators */}
                  {activeCaseStudy.images.length > 1 && (
                    <div className="flex justify-center gap-2">
                      {activeCaseStudy.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setLightbox((prev) => ({
                              ...prev,
                              currentImageIndex: idx,
                            }))
                          }
                          className={`h-2 rounded-full transition-colors ${
                            idx === lightbox.currentImageIndex
                              ? "bg-blue-600 w-8"
                              : "bg-gray-300 w-2"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 rounded-lg p-6">
                  {activeCaseStudy.results.map((result) => (
                    <div key={result.label} className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{result.label}</p>
                      <p className="text-2xl md:text-3xl font-bold text-blue-600">
                        {result.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
