"use client";

import Stripe from "stripe";
import { ProductCard } from "./productCard";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByBestSellers, setSortByBestSellers] = useState<boolean>(false);

  const filteredProducts = products
    .filter((product) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(term);
      const descriptionMatch = product.description
        ? product.description.toLowerCase().includes(term)
        : false;
      return nameMatch || descriptionMatch;
    })
    .sort((a, b) => {
      if (!sortByBestSellers) return 0;
      const purchaseCountA = a.metadata.purchase_count
        ? parseInt(a.metadata.purchase_count)
        : 0;
      const purchaseCountB = b.metadata.purchase_count
        ? parseInt(b.metadata.purchase_count)
        : 0;
      return purchaseCountB - purchaseCountA;
    });

  return (
    <div>
      <div className="mb-6 flex justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => setSortByBestSellers((prev) => !prev)}>
          {sortByBestSellers ? "Clear Sort" : "Best Sellers"}
        </Button>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
