const recipesModel = require("../models/recipes");
const form = require("../helpers/form")

module.exports ={
    addRecipes : (req, res) => {
        const { body } = req;
        const filePathImages = JSON.stringify(
            req.files.images.map((e) => "http://localhost:6000" + "/images" + "/" + e.filename + " ")
        )

         
        const filePathVideo = JSON.stringify(
            req.files.videos.map((e) => "http://localhost:6000" + "/videos" + "/" + e.filename + " ")
        )
        const insertBody = { ...body, updated_at: new Date(Date.now()), recipe_img: filePathImages, recipe_video: filePathVideo};

        recipesModel
        .addRecipes(insertBody, filePathImages, filePathVideo)
        .then((data) => {
            console.log(data);
            const successAdd = {
                msg: "Recipe has been added",
                data: {
                    id:data.insertId,
                    ...insertBody
                }
            }
            form.success(res, successAdd);
        })
        .catch((err) => { 
            const error ={
                msg: "Recipe failed to add",
                err,
            }
            form.error(res, error);
        })
    },

}