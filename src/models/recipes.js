const db = require("../config/mySQL");
module.exports = {
    addRecipes: () => {
        return new Promise((resolve, reject) => {
            const postQueryString = "INSERT INFO recipes SET ?"
            db.query(postQueryString, [insertBody], (err, data) => {
                if(err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    }
}