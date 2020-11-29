/*
 * Возвращает GraphQL запрос на категории
 */
export const getCategoryListQuery = () => {
    return JSON.stringify({
        query: `
            {
                productCategories(where: {hideEmpty: true}) {
                    nodes {
                        name
                        productCategoryId
                        image {
                            mediaDetails {
                                file
                            }
                        }
                    }
                }
            }
        `,
    });
};

/*
 * Возвращает GraphQL запрос на список товаров
 * @param {number} categoryId - id категории
 */
export const getProductListQuery = (categoryId) => {
    return JSON.stringify({
        query: `
            {
                products(where: {categoryId: ${categoryId}}) {
                    nodes {
                        databaseId
                        name
                        description
                        image {
                          mediaDetails {
                            file
                          }
                        }
                        galleryImages {
                            nodes {
                              mediaDetails {
                                file
                              }
                            }
                        }
                        ... on VariableProduct {
                          variations {
                            nodes {
                                price
                                databaseId
                                name
                            }
                          }
                          attributes {
                            nodes {
                                attributeId
                                name
                                options
                            }
                          }
                        }
                        ... on SimpleProduct {
                            price
                        }
                      }
                }
            }
        `,
    });
};