import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../config";

export const useProductsStore = defineStore({
  id: "product",
  state: () => ({
    products: [],
    product: null,
    error: null,
    loading: false,
  }),
  actions: {
    async fetchProducts() {
      this.products = [];
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/products`);
        this.products = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(slug) {
      this.product = null;
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/products/${slug}`);
        this.product = response.data[0];
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async getProduct(slug) {
      try {
        const response = await axios.get(`${API_URL}/products/${slug}`);
        return response.data[0]
      } catch (error) {
        this.error = error;
      } 
    },
  },
});