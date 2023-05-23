import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { orderBy } from "lodash";
import CommentsList from "./comments/commentsList";
import AddCommentForm from "./comments/addCommentForm";

const Comments = () => {
    const userId = useParams().id;
    const [comments, setComments] = useState([]);
    // console.log(userId, useParams().id);

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    const sortComments = orderBy(comments, "created_at", ["desc"]);

    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };
    const handleSubmit = (data) => {
        api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
    };
    return (
        <>
            <div className="col-md-8">
                <div className="card mb-2">
                    <div className="card-body">
                        <AddCommentForm onSubmit={handleSubmit} />
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList comments={sortComments} onRemove={handleRemoveComment} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;
