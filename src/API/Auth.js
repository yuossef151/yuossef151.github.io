import api from "./axios";

export const registerApi = (data) => {
  return api.post("/register", data);
};
export const message = (data) => {
  return api.post("/contacts/store", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginApi = (data) => {
  return api.post("/login", data);
};
export const EmailApi = (data) => {
  return api.post("/forget-password", data);
};
export const ResetPassword = (data) => {
  return api.post("/otp", data);
};
export const nowPassword = (data) => {
  return api.post("/reset-password", data);
};

export const getbooks = () => {
  return api.get("/home");
};

export const profile = () => {
  const token = localStorage.getItem("token");
  return api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateprofile = (data) => {
  const token = localStorage.getItem("token");

  return api.post("/profile/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getbooksAPI = (page, params = {}) => {
  return api.get("/book", {
    params: {
      page,
      search: params.search || "",
      category_id: params.category_id || "",
    },
  });
};
export const getcategoryAPI = () => {
  return api.get("/category");
};
export const getcartAPI = () => {
  const token = localStorage.getItem("token");

  return api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getWishlistAPI = () => {
  const token = localStorage.getItem("token");
  return api.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addToWishlistAPI = (bookId) => {
  const token = localStorage.getItem("token");

  return api.post(
    `/wishlist/store/${bookId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const OrdarAPI = () => {
  const token = localStorage.getItem("token");

  return api.post(
    `/order`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const CheckOutAPI = (payload) => {
  const token = localStorage.getItem("token");

  return api.post(`/order/checkout`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeWishlistAPI = (bookId) => {
  const token = localStorage.getItem("token");

  return api.delete(`/wishlist/destroy/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCartAPI = (book) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("qty", 1);

  return api.post(`/cart/store/${book.bookId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const singleBookAPI = (bookId) => {
  const token = localStorage.getItem("token");

  return api.get(`/book/show/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartQuantityAPI = (bookId, qty) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("qty", qty);

  return api.post(`/cart/update/${bookId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const removeCartAPI = (cartId) => {
  const token = localStorage.getItem("token");

  return api.delete(`/cart/destroy/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const OrderAPI = () => {
  const token = localStorage.getItem("token");

  return api.post(
    "/order",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const OrdarHestoryAPI = ()=> {
  const token = localStorage.getItem("token");
  return api.get(
    "/order/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

}

export const OrdardataAPI = (ordarId) => {
  const token = localStorage.getItem("token");

  return api.get(`/order/show/${ordarId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
