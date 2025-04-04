import React from "react";
import { useState, useEffect} from "react";

const Rating = ({initialRating, onRate}) => {
  const [rating, setRating] = useState(initialRating || 0);

  // this function for handle the rating
  const handleRating = (starValue) => {
    setRating(starValue);
    if(onRate) {
      onRate(starValue);// onrate used to send the rating to the parent component
    }
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => handleRating(starValue)}> {/*this will call the handleRating function */}
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
