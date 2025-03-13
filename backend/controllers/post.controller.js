import Notification from "../models/Notification.js";
import Post from '../models/Post.js'
import User from '../models/User.js'
import { v2 as cloudinary } from "cloudinary";


export const repostPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Initialize reposts array if it doesn't exist
        if (!post.reposts) {
            post.reposts = [];
        }

        const isReposted = post.reposts.includes(userId);

        if (isReposted) {
            // If already reposted, remove the repost
            await Post.findByIdAndUpdate(postId, {
                $pull: { reposts: userId },
            });
        } else {
            // Otherwise add the repost
            await Post.findByIdAndUpdate(postId, {
                $push: { reposts: userId },
            });
            
            // Add debug log
            console.log("Repost added", {
                postUser: post.user.toString(),
                repostingUser: userId.toString(),
                isUserSame: post.user.toString() === userId.toString()
            });
            
            // Only create notification if the reposter is not the post owner
            if (post.user.toString() !== userId.toString()) {
                const notification = new Notification({
                    type: "repost",
                    from: userId,
                    to: post.user,
                    post: postId
                });
                await notification.save();
                console.log("Repost notification created", notification);
            } else {
                console.log("No notification created: user is reposting their own post");
            }
        }

        // Get the updated list of reposts
        const updatedPost = await Post.findById(postId);
        res.status(200).json(updatedPost.reposts);
    } catch (error) {
        console.log("Error in repostPost controller: ", error);
        res.status(500).json({ error: error.message });
    }
};


export const createPost = async (req, res) => {
	try {
		const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if (!text && !img) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({
			user: userId,
			text,
			img,
		});

		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
		console.log("Error in createPost controller: ", error);
	}
};

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "You are not authorized to delete this post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.log("Error in deletePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		if (posts.length === 0) {
			return res.status(200).json([]);
		}

		res.status(200).json(posts);
	} catch (error) {
		console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getRepostedPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Find all posts where the user's ID is in the reposts array
        const repostedPosts = await Post.find({ reposts: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });
        
        res.status(200).json(repostedPosts);
    } catch (error) {
        console.log("Error in getRepostedPosts controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const bookmarkPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isBookmarked = post.bookmarks.includes(userId);

        if (isBookmarked) {
            // Si déjà enregistré, on le retire des bookmarks
            await Post.findByIdAndUpdate(postId, {
                $pull: { bookmarks: userId },
            });
        } else {
            // Sinon on l'ajoute aux bookmarks
            await Post.findByIdAndUpdate(postId, {
                $push: { bookmarks: userId },
            });
            
            // Add debug log
            console.log("Bookmark added", {
                postUser: post.user.toString(),
                bookmarkingUser: userId.toString(),
                isUserSame: post.user.toString() === userId.toString()
            });
            
            // Only create notification if bookmarker is not the post owner
            if (post.user.toString() !== userId.toString()) {
                const notification = new Notification({
                    type: "bookmarked",
                    from: userId,
                    to: post.user,
                    post: postId  // Include the post reference
                });
                await notification.save();
                console.log("Bookmark notification created", notification);
            } else {
                console.log("No notification created: user is bookmarking their own post");
            }
        }

        // Récupérer la liste mise à jour des bookmarks
        const updatedPost = await Post.findById(postId);
        res.status(200).json(updatedPost.bookmarks);
    } catch (error) {
        console.log("Error in bookmarkPost controller: ", error);
        res.status(500).json({ error: error.message });
    }
};
export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = { user: userId, text };

        post.comments.push(comment);
        await post.save();

        // Only create notification if commenter is not the post owner
        if (post.user.toString() !== userId.toString()) {
            const notification = new Notification({
                type: "comment",
                from: userId,
                to: post.user,
                post: postId  // Include the post reference
            });
            await notification.save();
        }

        res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const likeUnlikePost = async (req, res) => {
	try {
		const userId = req.user._id;
		const { id: postId } = req.params;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

			const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
			res.status(200).json(updatedLikes);
		} else {
			// Like post
			post.likes.push(userId);
			await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
			await post.save();

			// Vérifier si l'utilisateur n'est pas le propriétaire du post avant de créer une notification
			if (userId.toString() !== post.user.toString()) {
				const notification = new Notification({
					from: userId,
					to: post.user,
					type: "like",
					post: postId
				});
				await notification.save();
			}

			const updatedLikes = post.likes;
			res.status(200).json(updatedLikes);
		}
	} catch (error) {
		console.log("Error in likeUnlikePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};



export const getLikedPosts = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(likedPosts);
	} catch (error) {
		console.log("Error in getLikedPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getFollowingPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const following = user.following;

		const feedPosts = await Post.find({ user: { $in: following } })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(feedPosts);
	} catch (error) {
		console.log("Error in getFollowingPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { username } = req.params;

		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: "User not found" });

		const posts = await Post.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(posts);
	} catch (error) {
		console.log("Error in getUserPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getPostById = async (req, res) => {
	try {
	  const { id } = req.params;
	  
	  const post = await Post.findById(id)
		.populate({
		  path: "user",
		  select: "-password",
		})
		.populate({
		  path: "comments.user",
		  select: "-password",
		});
		
	  if (!post) {
		return res.status(404).json({ error: "Post not found" });
	  }
	  
	  res.status(200).json(post);
	} catch (error) {
	  console.log("Error in getPostById controller:", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  };

  export const searchByKeyword = async (req, res) => {
    try {
        const { keyword } = req.query;

        console.log("🔍 Requête reçue avec keyword :", keyword);

        if (!keyword) {
            console.log("⚠ Erreur : aucun mot-clé fourni");
            return res.status(400).json({ error: "Keyword parameter is required" });
        }

        // Fonction pour échapper les caractères spéciaux dans une regex
        const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        const searchQuery = escapeRegex(keyword); // Échapper les caractères spéciaux

        const posts = await Post.find({
            text: { $regex: searchQuery, $options: 'i' } 
        })
        .populate({ path: "user", select: "-password" })
        .populate({ path: "comments.user", select: "-password" });

        console.log("✅ Nombre de posts trouvés :", posts.length);

        res.status(200).json({ posts });
    } catch (error) {
        console.error("❌ Erreur dans searchByKeyword :", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getBookmarkedPosts = async (req, res) => {
	try {
	  const userId = req.user._id;
	  
	  // Find all posts where the user's ID is in the bookmarks array
	  const bookmarkedPosts = await Post.find({ bookmarks: userId })
		.sort({ createdAt: -1 })
		.populate({
		  path: "user",
		  select: "-password",
		})
		.populate({
		  path: "comments.user",
		  select: "-password",
		});
	  
	  res.status(200).json(bookmarkedPosts);
	} catch (error) {
	  console.log("Error in getBookmarkedPosts controller:", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  };