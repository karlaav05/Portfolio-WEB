import React from 'react';

const Comment = ({props}) => {
  return (
    <div>
        <input type = "text" disabled>{props.name}</input>
        <input type = "text" disabled>{props.comment}</input>
    </div>
  );
};

export default Comment;