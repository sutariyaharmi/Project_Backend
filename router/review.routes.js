const express = require('express');
const reviewRoutes = express.Router();
const { verifyTOken } = require('../helpers/tokenverify');
const {
    addReview,
    getAllReview,
    deleteReview
} = require('../controller/review.controller');

reviewRoutes.post('/add-Review', verifyTOken, addReview);
reviewRoutes.get('/get-All-Review', verifyTOken, getAllReview);
reviewRoutes.delete('/delete-Review', verifyTOken, deleteReview);

module.exports = reviewRoutes;