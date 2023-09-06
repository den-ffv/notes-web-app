import React from "react";
import "./Note.scss";
function Note() {
  return (
    <div className='note'>
      <div>
        <h3 className='note__title'>Note Title</h3>
        <p className='note__text'>
          So I made myself a notes app to help store and sort my notes, Wanted
          easy access to tags and search with a clean and colourful UI.
        </p>
      </div>
      <div>
        <p className='note__date'>Sep 12, 2023</p>
        <div className='note__btn-correction'></div>
      </div>
    </div>
  );
}

export default Note;
