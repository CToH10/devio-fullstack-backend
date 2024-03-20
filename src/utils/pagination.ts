export const pagination = (countObj: number, perPage: number, page: number) => {
  let perPageQuery: number = perPage;
  let pageQuery: number = page;
  if (perPage === 0) {
    perPageQuery = 1;
  }

  if (Number.isNaN(perPage)) {
    perPageQuery = 12;
  }

  if (Number.isNaN(page)) {
    pageQuery = 1;
  }

  if (Number(page) <= 0) {
    pageQuery = 1;
  }
  const paginationObj = {
    previousPage:
      perPageQuery * (pageQuery - 1) === 0 ||
      pageQuery * perPageQuery >= countObj
        ? null
        : `${'url'}page=${Number(pageQuery) - 1}&perPage=${perPageQuery}`,
    nextPage:
      countObj <= Number(perPageQuery * pageQuery)
        ? null
        : `${'url'}page=${Number(pageQuery) + 1}&perPage=${perPageQuery}`,
  };
  return paginationObj;
};
