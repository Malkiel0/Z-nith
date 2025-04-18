<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# Zénith – Backend E-commerce

**Backend complet, scalable et ultra custom pour la boutique Zénith.**

---

## Présentation

- **Framework** : Nest.js (GraphQL + Prisma)
- **Base de données** : PostgreSQL
- **Auth** : NextAuth.js (JWT, OAuth, à brancher côté frontend)
- **Temps réel** : WebSockets (Socket.io, à venir)
- **Microservices** : Docker, Kubernetes, RabbitMQ (scalable, à brancher)
- **Frontend** : Next.js + Tailwind CSS (voir dossier frontend)

---

## Structure des modules

- **Produit** : Product, ProductVariant, ProductAttribute, ProductAttributeValue
- **Panier** : Cart, CartItem
- **Commande** : Order, OrderItem
- **Paiement** : Payment
- **Livraison** : ShippingAddress, ShippingMethod, OrderShipment
- **Commission** : Commission
- **Coupon** : Coupon
- **Retour** : Return
- **Transaction** : FinancialTransaction

Chaque module possède : modèle GraphQL, service, resolver, module Nest.js. Tout est ultra commenté et structuré.

---

## Exemples de requêtes GraphQL (CRUD)

### Produit
```graphql
# Créer un produit
mutation {
  createProduct(data: "{\"name\":\"T-shirt\",\"slug\":\"tshirt\",\"description\":\"Coton bio\",\"price\":29.99,\"type\":\"simple\",\"stock_quantity\":100,\"sku\":\"TSHIRT001\"}") {
    id
    name
    price
  }
}

# Lister tous les produits
query {
  products {
    id
    name
    price
  }
}
```

### Panier
```graphql
# Ajouter un item au panier
mutation {
  addCartItem(cart_id: 1, product_id: 2, quantity: 1, unit_price: 29.99) {
    id
    product_id
    quantity
  }
}
```

### Commande
```graphql
# Créer une commande
mutation {
  createOrder(user_id: 1, cart_id: 1) {
    id
    status
    total_amount
  }
}
```

### Paiement
```graphql
# Créer un paiement
mutation {
  createPayment(order_id: 1, amount: 29.99, method: "card", status: "success", transaction_id: "TRX123") {
    id
    status
  }
}
```

### Livraison
```graphql
# Ajouter une adresse de livraison
mutation {
  createShippingAddress(data: "{\"user_id\":1,\"full_name\":\"Jean Dupont\",\"phone\":\"0600000000\",\"address\":\"10 rue de Paris\",\"city\":\"Paris\",\"country\":\"France\",\"postal_code\":\"75001\"}") {
    id
    city
  }
}
```

### Commission
```graphql
mutation {
  createCommission(order_id: 1, amount: 5.0, collected: false) {
    id
    amount
    collected
  }
}
```

### Coupon
```graphql
mutation {
  createCoupon(data: "{\"code\":\"ZENITH10\",\"discount_type\":\"fixed\",\"discount_value\":10,\"max_usage\":100,\"is_active\":true}") {
    id
    code
    discount_value
  }
}
```

### Retour
```graphql
mutation {
  createReturn(order_id: 1, user_id: 1, reason: "Produit défectueux", status: "pending", refund_amount: 29.99) {
    id
    status
    refund_amount
  }
}
```

### Transaction financière
```graphql
mutation {
  createFinancialTransaction(order_id: 1, amount: 29.99, type: "payment", status: "completed", user_id: 1) {
    id
    status
    amount
  }
}
```

---

## Relations et fonctionnement

- **User** → Cart, Order, ShippingAddress, Return, FinancialTransaction
- **Order** → OrderItem, Payment, Commission, OrderShipment, Coupon, Return, FinancialTransaction
- **Produit** → ProductVariant, CartItem, OrderItem
- **Panier** → CartItem
- **Livraison** → ShippingAddress (utilisateur), ShippingMethod (prix/délai), OrderShipment (suivi)
- **Commission** → liée à Order
- **Coupon** → appliqué sur Order
- **Retour** → lié à Order et User
- **Transaction** → lié à Order et User

Tout est clean, extensible, sans enum (strings pour la flexibilité), et chaque module respecte la base de données.

---

## Lancer le backend

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Démarrer le serveur
npm run start:dev
```

---

## Conseils & Liens utiles

- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [GraphQL Playground](http://localhost:3000/graphql) (après démarrage)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## Contact & Support

Projet développé par Zénith. Code ultra commenté, prêt pour la scalabilité et la personnalisation.

Pour toute question ou contribution, contactez l’équipe ou ouvrez une issue sur le repo.

---

**Bon dev sur Zénith !**
