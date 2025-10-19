/**
 * @file اسکریپت عمومی وبسایت همگام پلاستیک
 * @description This file contains shared logic for cart management and UI updates (header).
 * @version 2.3.0 (Menu Bug Fix)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Global App Object ---
    const App = {
        // --- Cart Logic ---
        cart: {
            get: () => JSON.parse(localStorage.getItem('shoppingCart')) || [],
            save(cartData) {
                localStorage.setItem('shoppingCart', JSON.stringify(cartData));
                this.updateCounter();
            },
            add(product, quantity = 1) {
                let currentCart = this.get();
                const existingProduct = currentCart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    currentCart.push({ ...product, quantity });
                }
                this.save(currentCart);
                this.showNotification();
            },
            updateCounter() {
                const totalItems = this.get().reduce((sum, item) => sum + item.quantity, 0);
                const counterEl = document.getElementById('cart-counter');
                if(counterEl) {
                    counterEl.textContent = totalItems;
                    counterEl.style.display = totalItems > 0 ? 'flex' : 'none';
                }
            },
            showNotification() {
                const notification = document.getElementById('cart-notification');
                if (notification) {
                    notification.classList.add('show');
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 2500);
                }
            }
        },

        // --- Auth Logic ---
        auth: {
            checkLoginStatus() {
                const userDisplay = document.getElementById('user-display');
                const token = localStorage.getItem('auth-token');
                const username = localStorage.getItem('username');
                
                if (token && username && userDisplay) {
                    const firstLetter = username.charAt(0).toUpperCase();
                    userDisplay.innerHTML = `
                        <div class="flex items-center space-x-2 space-x-reverse text-slate-200">
                            <a href="my-account.html" class="flex items-center group p-1 rounded-full hover:bg-slate-700/50 transition-colors duration-300">
                                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-slate-900 text-lg flex-shrink-0 group-hover:ring-2 group-hover:ring-amber-300 transition-all">
                                    ${firstLetter}
                                </div>
                                <span class="hidden sm:block font-bold text-sm text-white mr-2 group-hover:text-amber-300 transition-colors">${username}</span>
                            </a>
                            
                            <!-- Logout Button -->
                            <button id="logout-btn" class="text-xl text-slate-400 hover:text-amber-300 transition-colors" title="خروج">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    `;

                    const logoutHandler = () => {
                        localStorage.removeItem('auth-token');
                        localStorage.removeItem('username');
                        window.location.reload();
                    };

                    const logoutBtn = document.getElementById('logout-btn');
                    if(logoutBtn) logoutBtn.addEventListener('click', logoutHandler);

                } else if (userDisplay) {
                    // Fallback to the login button if not logged in
                    userDisplay.innerHTML = `<a href="login.html" id="login-btn" class="btn-primary !py-1.5 !px-4 sm:!py-2 sm:!px-6 text-sm">ورود</a>`;
                }
            }
        },
        
        // --- Mobile Menu Logic (Robust and Simplified) ---
        menu: {
            init() {
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileToggle = document.getElementById('mobile-toggle');
                const mobileClose = document.getElementById('mobile-close');
                const mobileLinks = document.querySelectorAll('.mobile-link');

                function toggleMenu() {
                    const isOpening = !document.body.classList.contains('menu-open');
                    
                    if (isOpening) {
                        // Prepare to open: remove 'hidden' to make it part of the layout
                        if (mobileMenu) {
                            mobileMenu.classList.remove('hidden');
                        }
                        
                        // Wait a tiny moment for the browser to register the display change, then trigger the animation
                        setTimeout(() => {
                            document.body.classList.add('menu-open');
                        }, 10);
                    } else {
                        // Start closing animation
                        document.body.classList.remove('menu-open');
                        
                        // Wait for the animation to finish (300ms from CSS), then hide the element completely
                        if (mobileMenu) {
                           setTimeout(() => {
                                // Only hide if the menu wasn't re-opened in the meantime
                                if (!document.body.classList.contains('menu-open')) {
                                    mobileMenu.classList.add('hidden');
                                }
                            }, 300); // This duration must match the CSS transition duration
                        }
                    }
                }

                if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
                if (mobileClose) mobileClose.addEventListener('click', toggleMenu);
                if (mobileLinks) mobileLinks.forEach(link => {
                    link.addEventListener('click', toggleMenu);
                });
            }
        },

        // --- Initializer ---
        init() {
            this.cart.updateCounter();
            this.auth.checkLoginStatus();
            this.menu.init();
        }
    };

    // Make App object globally accessible
    window.App = App;

    // Run the app
    App.init();

});

