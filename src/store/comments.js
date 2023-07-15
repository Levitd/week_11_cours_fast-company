import { createSlice } from "@reduxjs/toolkit";
import CommentsService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createComment: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        createCommentsFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        removeComment: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
        },
        removeCommentFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled, createComment, createCommentsFiled, removeComment, removeCommentFiled } = actions;

export const commentRemove = (id) => async (dispatch) => {
    try {
        const { content } = await CommentsService.removeComment(id);
        if (content === null) {
            dispatch(removeComment(id));
        }
    } catch (error) {
        dispatch(removeCommentFiled(error.message));
    };
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await CommentsService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const commentCreate = (newComment, userId, currentUserId) => async (dispatch) => {
    const comment = {
        ...newComment,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: currentUserId
    };
    try {
        const { content } = await CommentsService.createComment(comment);
        dispatch(createComment(content));
    } catch (error) {
        dispatch(createCommentsFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
