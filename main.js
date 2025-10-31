// // menu togle
// const menuTogle = document.getElementById('menu-togle');
// const mobileMenu = document.getElementById(`mobile-menu`);

// menuTogle.addEventListener(`click`, () => {
//   mobileMenu.classList.toggle(`hidden`);
// });
// // end menu togle


// fungsi alert
function showAlert(title, message, color ="green") {
    const alertContainer = document.getElementById("alert-container");
    const alertId = "alert-" + Date.now();

    const alertHTML = `
    <div id="${alertId}" role="alert"
      class="rounded-md border border-gray-300 bg-white p-4 shadow-md animate-fade-in">
        <div class="flex items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor"
                class="size-6 text-${color}-600">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 
                    11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <div class="flex-1">
                <strong class="font-medium text-gray-900"> ${title} </strong>
                <p class="mt-0.5 text-sm text-gray-700">${message}</p>
            </div>

            <button class="-m-3 rounded-full p-1.5 text-gray-500 transition-colors 
                hover:bg-gray-50 hover:text-gray-700" 
                onclick="document.getElementById('${alertId}').remove()"
                aria-label="Dismiss alert">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </button>
        </div>
    </div>    
    `;

    alertContainer.insertAdjacentHTML("beforebegin", alertHTML);

}

// tambah produk  ke keranjang
function addToCart(id, name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    price = Number(price);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, img, qty: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showAlert("berhasil ditambahkan!", `${name} masuk ke keranjang. `);
}
// end tambah produk

// menampilkan produk di keranjang
const cartItems = document.getElementById("cart-items");
const cart = JSON.parse (localStorage.getItem("cart")) || [];

if (cart.length === 0) {
    cartItems.innerHTML = `
    <div class="text-center text-gray-600 bg-white py-10 rounded-lg shadow-sm">
        <p class="text-lg">keranjang kosong</p>
        <a href="index.html" class="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-600">
            Belanja dulu
        </a>
    </div>`;
} else {
    let total = 0 ;
    const innerHTML = cart.map((item, index) =>{

        const subtotal = item.price * item.qty;
        total += subtotal;
        return `
            <li class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <img src="${item.img}" alt="${item.name}" class="size-16 rounded-md object-cover">
              <div>
                <h3 class="text-sm font-medium text-gray-900">${item.name}</h3>
                <p class="text-xs text-gray-500">Harga: Rp ${item.price.toLocaleString()}</p>
              </div>
    
              <div class="flex flex-1 items-center justify-end gap-2">
                <input 
                  type="number" min="1" value="${item.qty}" 
                  onchange="updateQty(${index}, this.value)"
                  class="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-hidden"
                >
                <button onclick="removeFromCart(${index})" 
                  class="text-gray-600 transition hover:text-red-600">
                  <span class="sr-only">Hapus item</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                    viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21
                      c.342.052.682.107 1.022.166m-1.022-.165L18.16
                      19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25
                      2.25 0 01-2.244-2.077L4.772 5.79m14.456
                      0a48.108 48.108 0 00-3.478-.397m-12
                      .562c.34-.059.68-.114 1.022-.165m0
                      0a48.11 48.11 0 013.478-.397m7.5
                      0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
                      51.964 0 00-3.32 0c-1.18.037-2.09
                      1.022-2.09 2.201v.916m7.5
                      0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </li>
        `;
    }).join('');

    cartItems.innerHTML = `
    <ul class="space-y-4">${innerHTML}</ul>
      <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
        <div class="w-screen max-w-lg space-y-4">
          <dl class="space-y-1 text-sm text-gray-700">
            <div class="flex justify-between font-medium">
              <dt>Total</dt>
              <dd class="text-indigo-700 font-semibold">Rp ${total.toLocaleString()}</dd>
            </div>
          </dl>

          <div class="flex justify-between items-center">
            <button onclick="cleanCart()" 
              class="block rounded-md bg-red-600 px-5 py-3 text-white text-sm hover:bg-red-400">Kosongkan Keranjang</button>
            <a href="checkout.html" class="block rounded-md bg-gray-800 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-700">
              Checkout
            </a>
          </div>
        </div>
      </div>`;
}
// end menampilkan produk

// tambah jumlah
function updateQty(index, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart[index].qty = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
// end tambah jumlah

// hapus produk
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const removed = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showAlert("item dihapus", `${removed} telah dihapus`, "red");
    setTimeout(() => location.reload(), 1200);
}
// end hapus produk

// kosongkan produk
function cleanCart() {
  if (confirm("apakah anda yakin ingin mengosongkan keranjang?")) {
    localStorage.removeItem("cart");
    showAlert("keranjang dikosongkan", "semua produk telah di hapus", "yellow");
    setTimeout(() => location.reload(), 1500);
  }
}
// end kosongkan produk
