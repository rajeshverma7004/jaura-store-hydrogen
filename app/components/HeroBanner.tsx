//import React from 'react';

export default function HeroBanner() {
  return (
    <section className="bg-gray-100 py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
      <p className="text-lg text-gray-600 max-w-2xl m-px-auto">
        Discover the latest products, hand-picked just for you.
      </p>
      <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
        Shop Now
      </button>
    </section>
  );
}