import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { NavLink } from "react-router-dom";
import * as commentsActions from "../../features/comments/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import avatar1 from "../../assets/images/avatars/avatar-1.png";
import mapPin from "../../assets/icons/tabler-icon-map-pin.svg";
import { ModalUpdateComment } from "../ModalUpdateComment/ModalUpdateComment";
import { Comment } from "../../Types/Comment";
import { useLocalStorage } from "../../customHook/useLocalStorage";

export const MyComments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myComments, loading, error } = useAppSelector(
    (state) => state.comments
  );
  const { cafes } = useAppSelector((state) => state.cafes);
  const [isEditing, setIsEditing] = useState(false);
  const [myAvatar] = useLocalStorage("myAvatar", "");

  const handleDelete = (commentId: number) => {
    dispatch(commentsActions.deleteMyComment(commentId));
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const [prevComment, setPrevComment] = useState<Comment | null>();

  const handleOpen = (comment: Comment) => {
    setPrevComment(comment);
    setIsEditing(true);
  };

  useEffect(() => {
    dispatch(commentsActions.initMyComments());
  }, [dispatch]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {myComments.length ? (
        <>
          <h1>{`I left ${myComments.length} comments!`}</h1>
          {myComments.map((comment) => {
            const currentCafe = cafes.find(
              (cafe) => +cafe.id === +comment.cafeId
            );

            return (
              <div key={comment.id} className="my-comments">
                <div className="my-comments__cafe">
                  <NavLink to={`/${comment.cafeId}`} className="card__link">
                    <img
                      style={{ maxHeight: "100px" }}
                      className="card__image"
                      src={comment.urlOfImage}
                      alt={comment.cafeName}
                    />
                  </NavLink>

                  <ul className="card__list">
                    <li className="card__item">
                      <h3 className="card__name">
                        <strong>{comment.cafeName}</strong>
                      </h3>
                    </li>

                    <li className="card__item">
                      <a
                        href={currentCafe?.urlToGoogleMaps}
                        className="card__link"
                        target="blank"
                      >
                        <img src={mapPin} alt="mapPinIcon" />
                        <p className="card__paragraph card__paragraph--address">
                          {currentCafe?.address}
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="testimonials__comment comment my-comments__content"
                  key={comment.id}
                >
                  <img
                    src={myAvatar || avatar1}
                    alt="girl-face-avatar"
                    className="comment__image"
                  />
                  <ul className="comment__list">
                    <li className="comment__item">
                      <h4 className="comment__name">{`${comment.user.firstName} ${comment.user.lastName}`}</h4>
                    </li>
                    <li className="comment__item">
                      <p className="comment__data">{comment.time}</p>
                    </li>
                    <li className="comment__item">
                      <Rating value={comment.score} readOnly precision={0.5} />
                    </li>
                    <li className="comment__item">
                      <p className="comment__text">{comment.comment}</p>
                    </li>
                  </ul>
                </div>
                <div className="my-comments__buttons">
                  <button
                    style={{ marginBottom: "16px" }}
                    className="search-bar__search testimonials__button"
                    type="button"
                    onClick={() => {
                      handleOpen(comment);
                    }}
                  >
                    Редагувати відгук
                  </button>
                  <button
                    style={{ width: "100%" }}
                    className="testimonials__button top-bar__button"
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Видалити відгук
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h1>There are no comments yet</h1>
      )}
      {prevComment && (
        <ModalUpdateComment
          prevComment={prevComment}
          open={isEditing}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
