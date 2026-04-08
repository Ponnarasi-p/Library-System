exports.paginationDto = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;

  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
};