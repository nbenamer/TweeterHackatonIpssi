import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
	getPostById,
	bookmarkPost,
	getBookmarkedPosts,
	repostPost,
	getRepostedPosts
} from "../controllers/post.controller.js";
import { advancedSearch, getPopularHashtags, searchByKeyword, searchHashtags } from "../controllers/advancedSearch.controller.js";

const router = express.Router();

router.post("/bookmark/:id", protectRoute, bookmarkPost);
router.get("/bookmarks", protectRoute, getBookmarkedPosts);
router.post("/repost/:id", protectRoute, repostPost);
router.get("/reposts/:id", getRepostedPosts);
router.get("/all", protectRoute, getAllPosts);
router.get("/:id", protectRoute, getPostById);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/search", advancedSearch);
router.get("/search-by-keyword", searchByKeyword);
router.get("/search/hashtags", searchHashtags);
router.get("/search/hashtags/popular", getPopularHashtags); 
export default router;
