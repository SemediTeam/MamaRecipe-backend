const db = require("../config/mySQL");

module.exports = {
  searchRecipes: (addQuery, urlQuery, total_result, page, offset, limit) => {
    return new Promise((resolve, reject) => {
      const queryString =
        `SELECT id_recipe, recipe_name, recipe_img, recipe_desc from recipes ` +
        addQuery +
        `LIMIT ${limit} OFFSET ${offset}`;
      console.log(urlQuery);
      db.query(queryString, (err, data) => {
        if (!err) {
          if (data.length) {
            newData = {
              recipe: data,
              pageInfo: {
                result: total_result,
                totalPage:
                  total_result % limit === 0
                    ? total_result / limit
                    : Math.floor(total_result / limit) + 1,
                currentPage: page || 1,
                previousPage:
                  page === 1
                    ? null
                    : `/search?${urlQuery}&page=${page}&limit=${limit}`,
                nextPage:
                  total_result - (offset + limit) < 0
                    ? null
                    : `/search?${urlQuery}&page=${page + 1}&limit=${limit}`,
              },
            };
            resolve(newData);
          }
        } else {
          reject(err);
        }
      });
    });
  },
  totalResult: (addQuery) => {
    return new Promise((resolve, reject) => {
      const qs =
        `SELECT count(recipe_name) as total_result FROM recipes ` + addQuery;
      db.query(qs, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
