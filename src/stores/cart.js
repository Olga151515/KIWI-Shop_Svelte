import { defineStore } from "pinia";
import { useProductsStore } from "./products";
const { getProduct } = useProductsStore();

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart: localStorage.getItem("estoreCart")
      ? JSON.parse(localStorage.getItem("estoreCart"))
      : [],
  }),
  getters: {
    totalCount: (state) => {
      let total = 0;
      state.cart.forEach((item) => (total += item.quantity));
      return total;
    },
    totalPrice: (state) => {
      let total = 0;
      state.cart.forEach((item) => (total += item.quantity * item.price));
      return total;
    },
  },
  actions: {
    async addToCart(slug) {
      const tmp = [...this.cart];
      const foundIndex = this.cart.findIndex((item) => item.slug === slug);
      if (foundIndex === -1) {
        const product = await getProduct(slug);
        product.quantity = 1;
        tmp.push(product);
      } else {
        tmp[foundIndex].quantity++;
      }
      localStorage.setItem("estoreCart", JSON.stringify(tmp));
      this.cart = tmp;
    },
    removeFromCart(slug) {
      const tmp = [...this.cart];
      const foundIndex = this.cart.findIndex((item) => item.slug === slug);
      tmp.splice(foundIndex, 1);
      localStorage.setItem("estoreCart", JSON.stringify(tmp));
      this.cart = tmp;
    },
    increaseQuantity(slug) {
      const tmp = [...this.cart];
      const foundIndex = this.cart.findIndex((item) => item.slug === slug);
      tmp[foundIndex].quantity++;
      localStorage.setItem("estoreCart", JSON.stringify(tmp));
      this.cart = tmp;
    },
    decreaseQuantity(slug) {
      const tmp = [...this.cart];
      const foundIndex = this.cart.findIndex((item) => item.slug === slug);
      if (tmp[foundIndex].quantity > 1) {
        tmp[foundIndex].quantity--;
      }
      localStorage.setItem("estoreCart", JSON.stringify(tmp));
      this.cart = tmp;
    },
    isInCart(slug) {
      return this.cart.findIndex((item) => item.slug === slug);
    },
  },
});