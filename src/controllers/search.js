const searchModel = require("../models/search");
const form = require("../helpers/form");

module.exports = {
  searchRecipes: (req, res) => {
    const { query } = req;
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    const { recipe_name } = req.query;
    let addQuery = ``;
    let urlQuery = ``;
    let query_length = Object.keys(req.query).length - 1;
    if (query.page) {
      query_length -= 1;
    }
    if (query.limit) {
      query_length -= 1;
    }

    if (Object.keys(req.query).length) {
      addQuery += `WHERE `;
      if (recipe_name != null) {
        addQuery += `recipe_name like '%${recipe_name}%' `;
        urlQuery += `recipe_name=${recipe_name}`;
      }
    }
    console.log(addQuery, urlQuery, offset, limit);
    searchModel
      .totalResult(addQuery)
      .then((result) => {
        searchModel
          .searchRecipes(
            addQuery,
            urlQuery,
            result[0].total_result,
            page,
            offset,
            limit
          )
          .then((data) => {
            res.status(200).json(data);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
