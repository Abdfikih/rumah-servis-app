const Carts = require("../models/Cart");
const serve = require("../models/serve");

module.exports = {
  addProductToCart: async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const { productId, totalPrice, quantity } = req.body;
    let count;
    try {
      const existingProduct = await Carts.findOne({ userId, productId });
      count = await Carts.countDocuments({ userId });

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += totalPrice;
        await existingProduct.save();
        console.log("tambah produk");
      } else {
        const newCartEntry = new Carts({
          userId: userId,
          productId: req.body.productId,
          additives: req.body.additives,
          instructions: req.body.instructions,
          totalPrice: req.body.totalPrice,
          quantity: req.body.quantity,
        });
        console.log("new produk");
        await newCartEntry.save();
        count = await Carts.countDocuments({ userId });
      }

      res.status(201).json({ status: true, count: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  removeProductFromCart: async (req, res) => {
    const itemId = req.params.id;
    const userId = req.user.id;

    try {
      await Carts.findOneAndDelete({ _id: itemId });
      count = await Carts.countDocuments({ userId });
      res.status(200).json({ status: true, cartCount: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  fetchUserCart: async (req, res) => {
    const id = req.user.id;

    try {
      const userCart = await Carts.find({ userId: id }).populate({
        path: "productId",
        select: "imageUrl title shop rating ratingCount",
      });

      res.status(200).json({ status: true, cart: userCart });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  clearUserCart: async (req, res) => {
    const userId = req.user.id;

    try {
      await Carts.deleteMany({ userId });
      res
        .status(200)
        .json({ status: true, message: "User cart cleared successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCartCount: async (req, res) => {
    const userId = req.user.id;

    try {
      const count = await Carts.countDocuments({ userId });
      res.status(200).json({ status: true, cartCount: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  decrementProductQuantity: async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;

    try {
      const cartItem = await Carts.findOne({ userId, productId });

      if (cartItem) {
        // Calculate the price of a single product
        const productPrice = cartItem.totalPrice / cartItem.quantity;

        // If quantity is more than 1, decrement and adjust price
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          cartItem.totalPrice -= productPrice;
          await cartItem.save();
          res
            .status(200)
            .json({
              status: true,
              message: "Product quantity decreased successfully",
            });
        }
        // If quantity is 1, remove the item from the cart
        else {
          await Carts.findOneAndDelete({ userId, productId });
          res
            .status(200)
            .json({ status: true, message: "Product removed from cart" });
        }
      } else {
        res
          .status(404)
          .json({ status: false, message: "Product not found in cart" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
