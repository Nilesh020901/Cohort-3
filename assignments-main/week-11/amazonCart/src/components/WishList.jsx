import { useState } from "react";
import { cartItemsState } from "../store/cartItemsState";
import { cartTotalSelector } from "../store/cartTotalSelector";
import { useRecoilState, useRecoilValue } from 'recoil';
import { styles } from "./WishListStyles.module.js";
import { wishItemsState } from "../store/wishItemsState.js";
import { ProductModal, Header, Sidebar } from "./";

const WishList = () => {
    // Get the total and item count from the cart selector
    const { total, itemCount } = useRecoilValue(cartTotalSelector);

    // State for managing modal and selected product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Open and close the modal for the selected product
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Recoil states for wishItems and cartItems
    const [wishItems, setWishItems] = useRecoilState(wishItemsState); // Corrected state name to wishItems
    const [cartItems, setCartItems] = useRecoilState(cartItemsState);
    
    // Track which items have already been added to the cart
    const [addedProducts, setAddedProducts] = useState({});

    // Function to add item to cart
    const addToCart = (id) => {
        if (addedProducts[id]) return;  // Prevent adding the same product more than once

        setAddedProducts(prev => ({...prev, [id]: true}));  // Mark item as added
        
        // Find the item from the wish list
        const wishItem = wishItems.find(item => item.id === id);

        // Check if the item is already in the cart
        const existingCartItem = cartItems.find(item => item.id === id);

        if (existingCartItem) {
            // Update quantity if the item already exists in the cart
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id
                      ? {...item, quantity: item.quantity + 1}
                      : item
                )
            );
        } else {
            // Add the item to the cart with quantity 1
            setCartItems(prevItems => [
                ...prevItems,
                {...wishItem, quantity: 1}
            ]);
        }
    };

    return (
        <div style={styles.container}>
            <Header itemCount={itemCount} />
            <div style={styles.main}>
                <Sidebar />
                <main style={styles.content}>
                    {/* Loop over wishItems to display each product */}
                    {wishItems.map((product) => (
                        <div key={product.id} style={styles.productCard}>
                            <img src={product.image} alt={product.name} style={styles.productImage} />
                            <h3 style={styles.productName}>{(product.name).substring(0, 21)}</h3>
                            <p style={styles.productPrice}>₹{product.price.toFixed(2)}</p>
                            
                            {/* Conditionally render the button based on whether it's added to cart */}
                            <button
                                style={styles.addToCartButton}
                                onClick={() => addToCart(product.id)}  // Call addToCart on button click
                                disabled={!!addedProducts[product.id]}  // Disable if already added
                            >
                                {addedProducts[product.id] ? (
                                    // If added to cart, show 'Proceed to Checkout'
                                    <span>
                                        <a href="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                                            Proceed to Checkout
                                        </a>
                                    </span>
                                ) : (
                                    'Add to Cart'  // Otherwise, show 'Add to Cart'
                                )}
                            </button>

                            <button
                                style={styles.quickViewButton}
                                onClick={() => handleOpenModal(product)}  // Open modal on quick view button click
                                aria-label={`Quick View ${product.name}`}
                            >
                                Quick View
                            </button>

                            {/* Product Modal */}
                            <ProductModal
                                product={selectedProduct}
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                            />
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default WishList;
