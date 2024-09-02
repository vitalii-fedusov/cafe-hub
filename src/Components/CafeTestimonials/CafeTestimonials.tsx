import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { Rating } from "@mui/material";
import avatar1 from "../../assets/images/avatars/avatar-1.png";
import { useAppSelector } from "../../app/hooks";
import { ModalLoginWindow } from "../ModalLoginWindow/ModalLoginWindow";
import { ModalComment } from "../ModalComment/ModalComment";
import { useLocalStorage } from "../../customHook/useLocalStorage";

export const CafeTestimonials: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") || 1);
  const { loading, error } = useAppSelector((state) => state.comments);
  const [myAvatar] = useLocalStorage("myAvatar", "");

  const { selectedCafe } = useAppSelector((state) => state.selectedCafe);
  const [comments, setComments] = useState(selectedCafe?.comments || []);
  const testimonials = comments;

  const itemsPerPage = 5;
  const itemOffset = (page - 1) * itemsPerPage;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = testimonials.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set("page", newPage.toString());

      return newParams;
    });
  };

  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {testimonials.length ? (
        <div className="cafe-info__testimonials-section testimonials">
          {currentItems.map((testimonial) => (
            <div className="testimonials__comment comment" key={testimonial.id}>
              <img
                src={myAvatar || avatar1}
                alt="girl-face-avatar"
                className="comment__image"
              />
              <ul className="comment__list">
                <li className="comment__item">
                  <h4 className="comment__name">{`${user?.firstName} ${user?.lastName}`}</h4>
                </li>
                <li className="comment__item">
                  <p className="comment__data">{testimonial.time}</p>
                </li>
                <li className="comment__item">
                  <Rating
                    value={testimonial.score}
                    readOnly
                    precision={0.5}
                  />
                </li>
                <li className="comment__item">
                  <p className="comment__text">{testimonial.comment}</p>
                </li>
              </ul>
            </div>
          ))}
          <ReactPaginate
            className="testimonials__pagination"
            breakLabel="..."
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel=""
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </div>
      ) : (
        <>
          <h1>There are no comments on this cafe</h1>
        </>
      )}
      <button
        className="search-bar__search testimonials__button"
        type="button"
        onClick={handleOpen}
      >
        Додати відгук
      </button>
      {user ? (
        <ModalComment
          open={open}
          handleClose={handleClose}
          setComments={setComments}
        />
      ) : (
        <ModalLoginWindow open={open} handleClose={handleClose} />
      )}
    </>
  );
};
