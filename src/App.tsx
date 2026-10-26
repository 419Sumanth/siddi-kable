/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VideoHeroBanner } from './components/VideoHeroBanner';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductBrand, FOUR_PRODUCTS } from './data/websiteContent';

export default function App() {
  const [activeBrandId, setActiveBrandId] = useState<string>('lapp');
  const [selectedBrandModal, setSelectedBrandModal] = useState<ProductBrand | null>(null);

  const handleSelectBrand = (brandId: string) => {
    setActiveBrandId(brandId);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBrandDetails = (brand: ProductBrand) => {
    setSelectedBrandModal(brand);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-width Video Showcase Banner scrolling after each minute */}
        <VideoHeroBanner />

        {/* Transforming Indian Industry Section */}
        <Hero
          onSelectBrand={handleSelectBrand}
        />

        {/* 4 Products Section: LAPP, EATON, MENNEKES, PARTEX */}
        <ProductsSection
          activeBrandId={activeBrandId}
          onSelectBrand={(id) => setActiveBrandId(id)}
          onOpenBrandDetails={handleOpenBrandDetails}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />
      </main>

      {/* Footer */}
      <Footer
        onSelectBrand={handleSelectBrand}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        brand={selectedBrandModal}
        onClose={() => setSelectedBrandModal(null)}
      />
    </div>
  );
}
