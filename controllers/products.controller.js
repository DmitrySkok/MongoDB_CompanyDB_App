const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(rand);
    if(!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewProduct = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putProductById = async (req, res) => {
  const { name, client } = req.body;
  try {
    const prod = await Product.findById(req.params.id);
    if(prod) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.status(200).json(prod);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(prod) {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json(prod);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};