// Page AdminProductAttributesPage : gestion dynamique des attributs et valeurs produits
// Clean code, ultra commenté, design extravagant
"use client";
import React, { useEffect, useState } from "react";

interface ProductAttribute {
  id: number;
  name: string;
}
interface ProductAttributeValue {
  id: number;
  value: string;
}

export default function AdminProductAttributesPage() {
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [selectedAttr, setSelectedAttr] = useState<number|null>(null);
  const [values, setValues] = useState<ProductAttributeValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newAttr, setNewAttr] = useState("");
  const [newValue, setNewValue] = useState("");

  // Récupère tous les attributs au chargement
  useEffect(() => {
    fetchAttributes();
  }, []);

  async function fetchAttributes() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query { productAttributes { id name } }`
        })
      });
      const data = await res.json();
      setAttributes(data.data.productAttributes);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  // Récupère les valeurs pour un attribut sélectionné
  async function fetchValues(attrId: number) {
    setLoading(true);
    setError("");
    try {
      setSelectedAttr(attrId);
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query { productAttributeValuesByAttribute(attribute_id: ${attrId}) { id value } }`
        })
      });
      const data = await res.json();
      setValues(data.data.productAttributeValuesByAttribute);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  // Ajout d'un nouvel attribut
  async function handleAddAttr(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation { createProductAttribute(name: "${newAttr}") { id name } }`
        })
      });
      await fetchAttributes();
      setNewAttr("");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  // Ajout d'une nouvelle valeur pour l'attribut sélectionné
  async function handleAddValue(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAttr) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation { createProductAttributeValue(attribute_id: ${selectedAttr}, value: "${newValue}") { id value } }`
        })
      });
      await fetchValues(selectedAttr);
      setNewValue("");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  // Suppression d'un attribut
  async function handleDeleteAttr(id: number) {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation { removeProductAttribute(id: ${id}) { id } }`
        })
      });
      setSelectedAttr(null);
      setValues([]);
      await fetchAttributes();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  // Suppression d'une valeur
  async function handleDeleteValue(id: number) {
    if (!selectedAttr) return;
    setLoading(true);
    setError("");
    try {
      await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation { removeProductAttributeValue(id: ${id}) { id } }`
        })
      });
      await fetchValues(selectedAttr);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-pink-600">Gestion des attributs produits</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleAddAttr} className="flex gap-2 mb-4">
        <input type="text" value={newAttr} onChange={e => setNewAttr(e.target.value)} placeholder="Nouvel attribut" className="border rounded px-3 py-2 flex-1" required />
        <button type="submit" className="bg-gradient-to-r from-blue-400 via-yellow-400 to-pink-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:scale-105 transition-transform">Ajouter</button>
      </form>
      <div className="flex gap-8">
        <div className="w-1/2">
          <h3 className="font-bold mb-2">Attributs existants</h3>
          <ul>
            {attributes.map(attr => (
              <li key={attr.id} className="flex items-center justify-between mb-2 p-2 bg-blue-50 rounded cursor-pointer hover:bg-blue-100" onClick={() => fetchValues(attr.id)}>
                <span className={selectedAttr === attr.id ? "font-bold text-blue-700" : ""}>{attr.name}</span>
                <button onClick={e => { e.stopPropagation(); handleDeleteAttr(attr.id); }} className="text-red-500 hover:text-red-700 font-bold ml-2">Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          {selectedAttr && <>
            <h3 className="font-bold mb-2">Valeurs pour l’attribut sélectionné</h3>
            <form onSubmit={handleAddValue} className="flex gap-2 mb-2">
              <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Nouvelle valeur" className="border rounded px-3 py-2 flex-1" required />
              <button type="submit" className="bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:scale-105 transition-transform">Ajouter</button>
            </form>
            <ul>
              {values.map(val => (
                <li key={val.id} className="flex items-center justify-between mb-2 p-2 bg-pink-50 rounded">
                  <span>{val.value}</span>
                  <button onClick={() => handleDeleteValue(val.id)} className="text-red-500 hover:text-red-700 font-bold ml-2">Supprimer</button>
                </li>
              ))}
            </ul>
          </>}
        </div>
      </div>
      {loading && <div className="mt-4 text-blue-500">Chargement...</div>}
    </div>
  );
}
