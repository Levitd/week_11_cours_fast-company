import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "./comments/commentsList";
import AddCommentForm from "./comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { commentCreate, commentRemove, getComments, getCommentsLoadingStatus, loadCommentsList } from "../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../store/users";

const Comments = () => {
    const { id: userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const currentUserId = useSelector(getCurrentUserId());

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const sortComments = orderBy(comments, "created_at", ["desc"]);

    const handleRemoveComment = (id) => {
        dispatch(commentRemove(id));
    };
    const handleSubmit = (data) => {
        dispatch(commentCreate(data, userId, currentUserId));
    };
    return (
        <>
            <div className="col-md-8">
                <div className="card mb-2">
                    <div className="card-body">
                        <AddCommentForm onSubmit={handleSubmit} />
                    </div>
                </div>
                {sortComments.length > 0 &&
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
                            {!isLoading ? <CommentsList comments={sortComments} onRemove={handleRemoveComment} /> : "Loading"}

                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Comments;
