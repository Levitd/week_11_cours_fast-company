import React from "react";
import { orderBy } from "lodash";
import CommentsList from "./comments/commentsList";
import AddCommentForm from "./comments/addCommentForm";
import { useComments } from "../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const sortComments = orderBy(comments, "created_at", ["desc"]);

    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };
    const handleSubmit = (data) => {
        createComment(data);
        // api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
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
                            <CommentsList comments={sortComments} onRemove={handleRemoveComment} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Comments;
