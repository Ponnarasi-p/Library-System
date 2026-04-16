export const BOOK_PAGE_DEFAULTS = {
  PAGE: 0,
  PAGE_SIZE: 5,
};

export const BOOK_TABLE = {
  ID_WIDTH: 80,
  ACTIONS_WIDTH: 150,
};

export const BOOK_ROUTES = {
  CREATE: "/books/create",
  VIEW: (id: number) => `/books/view/${id}`,
  EDIT: (id: number) => `/books/edit/${id}`,
};