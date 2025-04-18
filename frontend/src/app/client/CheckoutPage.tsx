// Page de paiement/checkout Zénith (adresse, récapitulatif, validation)
// Clean code, design extravagant, animations, commentaires détaillés
"use client";
import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Soumission du formulaire de commande
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Appel API backend pour créer la commande
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          city,
          postal,
          phone,
          items: cart,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Erreur lors de la commande.");
      } else {
        setSuccess("Commande validée ! Merci pour votre achat chez Zénith ✨");
        clearCart();
      }
    } catch (e) {
      setError("Erreur réseau ou serveur. Veuillez réessayer.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] flex flex-col items-center py-16 animate-fadein">
      <div className="p-8 rounded-3xl shadow-2xl bg-white/95 flex flex-col gap-8 max-w-lg w-full animate-slidein">
        <h1 className="text-3xl font-extrabold text-[#ffb347] text-center tracking-wide animate-pulse mb-2">Paiement & Livraison</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom complet" className="input input-bordered input-primary rounded-xl px-4 py-3 text-lg" value={name} onChange={e => setName(e.target.value)} required />
          <input type="text" placeholder="Adresse" className="input input-bordered input-primary rounded-xl px-4 py-3 text-lg" value={address} onChange={e => setAddress(e.target.value)} required />
          <div className="flex gap-2">
            <input type="text" placeholder="Ville" className="input input-bordered input-primary rounded-xl px-4 py-3 text-lg flex-1" value={city} onChange={e => setCity(e.target.value)} required />
            <input type="text" placeholder="Code postal" className="input input-bordered input-primary rounded-xl px-4 py-3 text-lg w-32" value={postal} onChange={e => setPostal(e.target.value)} required />
          </div>
          <input type="tel" placeholder="Téléphone (optionnel)" className="input input-bordered input-primary rounded-xl px-4 py-3 text-lg" value={phone} onChange={e => setPhone(e.target.value)} />
          <div className="mt-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-4 rounded-xl shadow-xl">
            <h2 className="text-lg font-bold text-white mb-2">Récapitulatif</h2>
            {cart.length === 0 ? (
              <div className="text-white/80">Votre panier est vide.</div>
            ) : (
              <ul className="text-white/90 text-base">
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between py-1">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </li>
                ))}
                <li className="flex justify-between font-bold border-t border-white/30 pt-2 mt-2 text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </li>
              </ul>
            )}
          </div>
          {error && <div className="text-red-500 text-center animate-pulse">{error}</div>}
          {success && <div className="text-green-600 text-center animate-bounce">{success}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60 mt-4"
            disabled={loading || cart.length === 0}
          >
            {loading ? "Validation..." : "Valider la commande"}
          </button>
        </form>
      </div>
    </div>
  );
}
