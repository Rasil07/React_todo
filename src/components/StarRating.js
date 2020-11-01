import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRating(props) {
  const [hoverRating, setHoverRating] = useState(null);
  return (
    <div className="rating-wrapper">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() =>
                props.setInputState({
                  ...props.inputState,
                  importance: ratingValue,
                })
              }
            />
            <FontAwesomeIcon
              className="star"
              icon={faStar}
              color={
                ratingValue <= (hoverRating || props.inputState.importance)
                  ? "yellow"
                  : "grey"
              }
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(null)}
            />
          </label>
        );
      })}
      {props.messageAlert ? <p>Rating required. </p> : null}
    </div>
  );
}

export default StarRating;
