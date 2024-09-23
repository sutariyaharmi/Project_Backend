const express = require('express');
const favoriteRoutes = express.Router();
const { verifyTOken } = require('../helpers/tokenverify');

const {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} = require('../controller/wishlist.controller')

favoriteRoutes.post('/add-To-Favorite', verifyTOken, addToFavorite);
favoriteRoutes.get('/get-All-Favorites', verifyTOken, getAllFavorite);
favoriteRoutes.delete('/delete-Favorite', verifyTOken, deleteFavorite);

module.exports = favoriteRoutes;