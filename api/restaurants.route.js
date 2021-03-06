import express from "express";
import RestaurantsController from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);

//get res by id
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById)

//get all cuisines
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines)



router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)



export default router;
