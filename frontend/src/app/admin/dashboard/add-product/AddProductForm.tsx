"use client";
// Formulaire dynamique d’ajout de produit pour Zénith
// Clean code, ultra commenté, animations, validation, prêt pour GraphQL
import React, { useState } from "react";

// Interface des props du formulaire (pour évolutivité)
interface AddProductFormProps {
  // callback de succès ou props additionnels si besoin
}

// Valeurs initiales du formulaire
const initialForm = {
  name: "",
  description: "",
  image_url: "",
  price: "",
  discount_price: "",
  type: "simple",
  stock_quantity: "",
  sku: "",
  is_active: true,
};

// Liste des types de produits possibles (adapté au modèle Prisma)
const productTypes = [
  { value: "simple", label: "Simple" },
  { value: "variable", label: "Variable" },
  { value: "bundle", label: "Bundle" },
];

export default function AddProductForm({}: AddProductFormProps) {
  // State pour les valeurs du formulaire
  const [form, setForm] = useState(initialForm);
  // State pour les erreurs de validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // State pour l’état d’envoi
  const [loading, setLoading] = useState(false);
  // State pour le succès
  const [success, setSuccess] = useState(false);

  // Validation du formulaire (simple mais extensible)
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Le nom du produit est requis.";
    if (!form.description.trim()) newErrors.description = "La description est requise.";
    if (!form.price || isNaN(Number(form.price))) newErrors.price = "Prix valide requis.";
    if (!form.stock_quantity || isNaN(Number(form.stock_quantity))) newErrors.stock_quantity = "Stock valide requis.";
    if (!form.sku.trim()) newErrors.sku = "Le SKU est requis.";
    return newErrors;
  };

  // Gestion du changement de champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      // TODO : Appel mutation GraphQL pour créer le produit
      // Simule l’envoi (à remplacer par mutation réelle)
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setErrors({ global: "Erreur lors de l’ajout du produit." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 animate-fadein"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold text-[#0f3460]">Nom du produit *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`rounded-xl px-4 py-2 border-2 focus:outline-none focus:border-pink-400 transition ${errors.name ? "border-red-400" : "border-gray-300"}`}
          placeholder="Ex: T-shirt Zénith"
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-semibold text-[#0f3460]">Description *</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className={`rounded-xl px-4 py-2 border-2 focus:outline-none focus:border-pink-400 transition ${errors.description ? "border-red-400" : "border-gray-300"}`}
          placeholder="Décrivez le produit..."
          rows={3}
        />
        {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="image_url" className="font-semibold text-[#0f3460]">Image (URL)</label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition"
          placeholder="https://...jpg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="price" className="font-semibold text-[#0f3460]">Prix (€) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className={`rounded-xl px-4 py-2 border-2 focus:outline-none focus:border-pink-400 transition ${errors.price ? "border-red-400" : "border-gray-300"}`}
            placeholder="Prix"
            min="0"
            step="0.01"
          />
          {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="discount_price" className="font-semibold text-[#0f3460]">Prix remisé (€)</label>
          <input
            type="number"
            id="discount_price"
            name="discount_price"
            value={form.discount_price}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition"
            placeholder="Remise"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="stock_quantity" className="font-semibold text-[#0f3460]">Stock *</label>
          <input
            type="number"
            id="stock_quantity"
            name="stock_quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            className={`rounded-xl px-4 py-2 border-2 focus:outline-none focus:border-pink-400 transition ${errors.stock_quantity ? "border-red-400" : "border-gray-300"}`}
            placeholder="Quantité"
            min="0"
          />
          {errors.stock_quantity && <span className="text-red-500 text-xs">{errors.stock_quantity}</span>}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="sku" className="font-semibold text-[#0f3460]">SKU *</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            className={`rounded-xl px-4 py-2 border-2 focus:outline-none focus:border-pink-400 transition ${errors.sku ? "border-red-400" : "border-gray-300"}`}
            placeholder="Référence unique"
          />
          {errors.sku && <span className="text-red-500 text-xs">{errors.sku}</span>}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="type" className="font-semibold text-[#0f3460]">Type de produit *</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition"
          >
            {productTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="is_active" className="font-semibold text-[#0f3460]">Actif ?</label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="w-5 h-5 accent-pink-400"
          />
        </div>
      </div>
      {errors.global && <div className="text-red-500 text-center">{errors.global}</div>}
      {success && <div className="text-green-600 text-center font-semibold animate-pulse">Produit ajouté avec succès !</div>}
      <button
        type="submit"
        className="mt-4 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform animate-bounce disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Ajout en cours..." : "Ajouter le produit"}
      </button>
    </form>
  );
}
