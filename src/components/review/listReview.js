import React from "react";

function ListReviews({reviews}) {
    return (
        <div className={"reviews w-75 m-auto pt-5"}>
            <h3>Other's reviews</h3>
            <hr/>
            {reviews && reviews.map((review) => (
                <div key={review._id} className={"review-card my-3"}>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${(review.rating / 5) * 100}%`}}/>
                    </div>
                    <p>{review.comment}</p>
                    <p>By: <strong className={"font-italic"}>{review.name}</strong></p>
                    <hr/>
                </div>
            ))}
        </div>
    )
}

export default ListReviews;