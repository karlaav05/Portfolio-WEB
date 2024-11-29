import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Comment from './Comment';

const CommentsSection = ({ episode }) => {
  let [comments, setComments] = useState([]);

  const saveComment = (episode) => {
    let name = document.getElementById(`name-${episode}`).value;
    let text = document.getElementById(`comment-${episode}`).value;
    comments.push({name:name, text:text});
    setComments(comments);
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div>
          <h3 className="section-title text-primary mb-3">Comments</h3>
          <div id={`comment-section-${episode}`}>
          {
            comments.map(comment => {
              <Comment props={{name: comment.name, comment: comment.text}}></Comment>
            })
          }
          </div>
          <input id={`name-${episode}`} type = "text" placeholder='Name'></input>
          <input id={`comment-${episode}`} type = "text" placeholder='Comment'></input>
          <button onClick={() => saveComment(episode)}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;