import category from "../models/category.js";

const categoryGet = async (req, res) => {
    const { value } = req.query;
  const category = await category
  .find({
      $or:[
          {name: new RegExp(value, 'i')},
          {description: new RegExp(value, 'i')}
      ]
  })
  .sort({ createAt: -1 });
  res.json({
    category,
  });
};

const categoryPost = async (req, res) => {
  const { name, description } = req.body;
  const category = new category({ name, description });
  await category.save();
  res.json({
    category,
  });
};

const categoryById = async (req, res) => {
  const { id } = req.params;
  const category = await category.findOne({ _id: id });
  res.json({

  })
};

export { categoryGet, categoryPost, categoryById };
