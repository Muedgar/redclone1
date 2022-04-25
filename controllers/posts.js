const mongoose = require("mongoose");
const post = require("../models/posts/post");
const postCrud = require("../models/posts/postCrud");

const viewPosts = async (req,res) => {
    try {
        await new postCrud().getPost().then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const createPosts = async (req,res) => {
    try {
        const {creator,title,content,votes,comments} = req.body;
        await new postCrud().createPost(creator,title,content,votes,comments).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const updatePosts = async (req,res) => {
    try {
        const {id,title,content,votes,comments} = req.body;
        await new postCrud().updatePost(id,title,content,votes,comments).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const deletePosts = async (req,res) => {
    try {
        const {id} = req.body;
        await new postCrud().deletePost(id).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const addComment = async(req,res) => {
    try {
        const {id,commentInput,creator} = req.body;
        await new postCrud().addCommentToPost(id,commentInput,creator).then(d=> {
            res.status(200).json({activity: "added comment..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}


const voteComment = async(req,res) => {
    try {
        const {id,vote} = req.body;
        await new postCrud().addVoteToPost(id,vote).then(d=> {
            res.status(200).json({activity: "added vote..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const editComment = async(req,res) => {
    try {
        const {id1,id2,commentInput} = req.body;
        await new postCrud().editComments(id1,id2,commentInput).then(d=> {
            res.status(200).json({activity: "edited comment..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const deleteComment = async(req,res)=> {
    try {
        const {id1,id2} = req.body;
        await new postCrud().deleteComments(id1,id2).then(d=> {
            res.status(200).json({activity: "deleted comment..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
} 
module.exports = {viewPosts, createPosts,updatePosts,deletePosts,addComment,voteComment,editComment,deleteComment};