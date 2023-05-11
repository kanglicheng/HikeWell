import React from "react";

export const ShareReview = () => {
  return (
    <div>
      <h3>Share your review</h3>

      <form>
        <div>
          <label>Trail ID</label>
          <input type="number" />
        </div>
        <label>Enjoyability</label>
        <input type="number" />
        <div>
          <label>Description</label>
          <textarea></textarea>
        </div>
      </form>
    </div>
  );
};
