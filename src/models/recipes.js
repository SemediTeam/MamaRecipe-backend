const db = require("../config/mySQL");
module.exports = {
    addRecipes: (insertBody) => {
        return new Promise((resolve, reject) => {
            const postQueryString = "INSERT INTO recipes SET ?";
            db.query(postQueryString, insertBody, (err, data) => {
                console.log(data)
                if(!err) {
                    resolve(data);
                    // const recipeVideo = {
                    //     recipes_id: data.insertId,
                    //     recipe_video: filePathVideo,
                    // }
                    // console.log(recipeVideo)
                    // const qsVideo = "INSERT INTO recipes_video SET ?";
                    // db.query(qsVideo, recipeVideo);
                    // console.log(recipeVideo)
                } else {
                    reject(err);
                }
            })
        })
    }
}