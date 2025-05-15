
import React from "react";
import { FaFireAlt } from "react-icons/fa";

const WithPopularLabel = (WrappedComponent) => {
  return function PopularCourseComponent(props) {
    return (
      <div>
        {props.course?.averageRating > 2 && <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md flex items-center gap-1 z-10">
          <FaFireAlt className="text-yellow-300" />
          Popular
        </div>}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default WithPopularLabel;
