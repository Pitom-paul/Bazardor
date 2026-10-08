const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getProducts() {
  return request("/products");
}

export async function getProduct(id) {
  return request(`/products/${id}`);
}

export async function getProductsByCategory(category) {
  return request(`/products?category=${encodeURIComponent(category)}`);
}

export async function getCategories() {
  return request("/categories");
}

export async function getCategory(slug) {
  return request(`/categories/${slug}`);
}