# VinylVault — Indie Record Online Store

## 1. Project Setup & Execution Instructions

### Prerequisites

- Node.js v21 or later and npm.

Check the installed versions:

```bash
node --version
npm --version
git --version
```

### Install and run locally

1. Install the project dependencies:

   ```bash
   npm install
   ```

   The project uses **React 18+**, **Vite**, and **react-router-dom v6+**. If starting from a new Vite React template rather than cloning the finished repository, create the app and install the router:

   ```bash
   npm create vite@latest VinylVault -- --template react
   cd VinylVault
   npm install
   npm install react-router-dom
   ```

2. Start the Vite development server:

   ```bash
   npm run dev
   ```

3. Open the **Local** URL printed in the terminal (typically `http://localhost:5173/`) in a browser. Verify that the album grid loads at `/`, filtering changes the displayed albums, selecting a cover opens `/album/:albumId`, and cart/checkout interactions work without refreshing the browser. Press **Ctrl+C** in the terminal to stop the server.

## 2. React Component Hierarchy & State Flow Architecture

```text
<App /> → src/App.jsx
│  Owner: cart [CartItem[]] — shared cart items, initially []
│  Owner: isCartOpen [boolean] — slide-over visibility, initially false
│  Derived: cartCount [number] — sum of all cart item quantities
│  Derived: cartSubtotal [number] — sum of price × quantity
│  Handlers: onAddToCart(album: Album), onIncrement(id: string),
│            onDecrement(id: string), onRemove(id: string),
│            onToggleCart(), onCloseCart(), onClearCart()
│  State updates: immutable .map(), .filter(), and object/array spread
│
├── <Navbar /> → src/components/Navbar.jsx [STICKY / ALL ROUTES]
│   Props: cartCount [number], onToggleCart [() => void]
│   No local state
│   ├── <BrandLink> — logo/title "VinylVault"; <Link to="/">
│   └── <CartBadgeButton> — cart icon + cartCount
│       Event: click → onToggleCart()
│
├── <Routes> — react-router-dom [CONDITIONAL ROUTED PAGES]
│   │
│   ├── <Route path="/" element={<CatalogPage />} /> [HOME ROUTE]
│   │   └── <CatalogPage /> → src/pages/CatalogPage.jsx
│   │       Props: albums [Album[]], onAddToCart [(album: Album) => void]
│   │       Owner: selectedGenre [string] — initial value "All"
│   │       Derived: filteredAlbums [Album[]] — filter albums by genre
│   │       Handler: setSelectedGenre(genre: string)
│   │       │
│   │       ├── <CatalogHero> [SECTION INSIDE CatalogPage]
│   │       │   Displays: "Browse Vinyl Records" and short intro
│   │       │
│   │       ├── <GenreFilterBar /> → src/components/GenreFilterBar.jsx
│   │       │   Props: genres [string[]], selectedGenre [string],
│   │       │          onGenreChange [(genre: string) => void]
│   │       │   Genres: All, Jazz, Electronic, Rock, Classical
│   │       │   No local state (selection is owned by CatalogPage)
│   │       │   └── <GenreButton> × genres.map(...) [REPEATED BUTTONS]
│   │       │       Event: click → onGenreChange(genre)
│   │       │       Display: selected button style based on selectedGenre
│   │       │
│   │       └── <AlbumGrid /> → src/components/AlbumGrid.jsx
│   │           Props: albums [Album[]] (filteredAlbums),
│   │                  onAddToCart [(album: Album) => void]
│   │           No local state
│   │           Layout: responsive CSS Grid below genre filter
│   │           └── <AlbumCard /> × albums.map(album => ...) [REPEATED]
│   │               → src/components/AlbumCard.jsx
│   │               Props: album [Album],
│   │                      onAddToCart [(album: Album) => void]
│   │               No local state
│   │               Displays: album.image, title, artist, genre, price
│   │               Event: album cover click → <Link to={`/album/${album.id}`}>
│   │               Event: Add to Cart click → onAddToCart(album)
│   │               Availability: disable cart button if stock is 0
│   │
│   ├── <Route path="/album/:albumId" element={<AlbumDetailPage />} />
│   │   [DYNAMIC ALBUM ROUTE]
│   │   └── <AlbumDetailPage /> → src/pages/AlbumDetailPage.jsx
│   │       Props: albums [Album[]], onAddToCart [(album: Album) => void]
│   │       No local state
│   │       Router: useParams() reads albumId [string]
│   │       Derived: album [Album | undefined] via albums.find(...)
│   │       ├── <BackToCatalogLink> — <Link to="/">
│   │       ├── <AlbumCover> — enlarged album.image
│   │       ├── <AlbumInformation> — album.id, title, artist, genre,
│   │       │                      price, stock, description
│   │       ├── <VinylSpecifications> — pressing weight, catalog
│   │       │                        number, speed (from dataset)
│   │       ├── <AddToCartButton>
│   │       │   Event: click → onAddToCart(album)
│   │       │   Disabled when album.stock is 0
│   │       └── <NotFoundMessage> [CONDITIONAL if ID does not match]
│   │           Displays: album unavailable + link to catalog
│   │
│   └── <Route path="/checkout" element={<CheckoutPage />} />
│       [CHECKOUT ROUTE]
│       └── <CheckoutPage /> → src/pages/CheckoutPage.jsx
│           Props: cart [CartItem[]], cartSubtotal [number],
│                  onClearCart [() => void]
│           Owner: formData [object] — fullName, address, city,
│                  postalCode, cardDetails [all string]
│           Owner: errors [object] — per-field validation messages
│           Owner: isConfirmed [boolean] — initial value false
│           Handler: handleInputChange(event) — update formData
│           Handler: handleSubmit(event) — preventDefault(), validate,
│                    show errors or clear cart + confirm order
│           Router: useNavigate() for programmatic navigation if needed
│           │
│           ├── <OrderSummary> [SECTION INSIDE CheckoutPage]
│           │   Displays: itemized albums, quantities, line totals,
│           │             and cartSubtotal
│           │   └── <OrderLine> × cart.map(item => ...) [REPEATED]
│           │       Displays: album title, quantity, price × quantity
│           │
│           ├── <CheckoutForm> [CONTROLLED FORM SECTION]
│           │   Props from parent state: formData, errors,
│           │                            handleInputChange, handleSubmit
│           │   ├── <FullNameInput> — value={formData.fullName}
│           │   ├── <AddressInput> — value={formData.address}
│           │   ├── <CityInput> — value={formData.city}
│           │   ├── <PostalCodeInput> — value={formData.postalCode}
│           │   ├── <CardDetailsInput> — value={formData.cardDetails}
│           │   └── <PlaceOrderButton> — form submit
│           │       Events: input change → handleInputChange(event)
│           │               submit → handleSubmit(event)
│           │
│           └── <OrderConfirmation> [CONDITIONAL if isConfirmed]
│               Displays: successful order + <Link to="/">
│
├── <CartDrawer /> → src/components/CartDrawer.jsx [SHARED SLIDE-OVER]
│   Props: isOpen [boolean], cart [CartItem[]],
│          cartSubtotal [number], onClose [() => void],
│          onIncrement [(id: string) => void],
│          onDecrement [(id: string) => void],
│          onRemove [(id: string) => void]
│   No local state (visibility and cart belong to App)
│   Layout: fixed slide-over panel and backdrop; visible if isOpen
│   ├── <CartHeader> — "Your Cart" + close button
│   │   Event: close click → onClose()
│   ├── <CartEmptyState> [CONDITIONAL if cart.length === 0]
│   ├── <CartItem /> × cart.map(item => ...) [REPEATED]
│   │   → src/components/CartItem.jsx
│   │   Props: item [CartItem], onIncrement [(id: string) => void],
│   │          onDecrement [(id: string) => void],
│   │          onRemove [(id: string) => void]
│   │   No local state
│   │   Displays: cover, title, price, quantity, item line total
│   │   Events: plus click → onIncrement(item.id)
│   │           minus click → onDecrement(item.id)
│   │           remove click → onRemove(item.id)
│   ├── <CartSubtotal> — displays cartSubtotal [number]
│   └── <CheckoutLink> — <Link to="/checkout">
│       Event: click → onClose() then client-side navigation
│
└── <Footer> [STATIC SECTION INSIDE App]
    Displays: "© 2026 VinylVault"
```
