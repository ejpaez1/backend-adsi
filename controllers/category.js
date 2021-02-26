import category from '../models/category.js'

const categoryGet = async ( req, res ) => {
    const category = await category.find().sort({'createAt':-1});

    res.json({
        category
    })
}

const categoryPost = async (req, res) => {
    
}

export {categoryGet}