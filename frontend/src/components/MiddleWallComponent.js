import React, { useEffect, useState } from 'react';
import NewPostComponent from './NewPostComponent';
import PostContent from './PostContent';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';

export default function MiddleWallComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://3.145.19.247:5000/polyguesser/get_wall')
      .then(response => response.json())
      .then(data => {setPosts(data);
        console.log(data[0].wordOfTheDay);
      });
  }, []);

  return (
    <div className="col-12 col-lg-6">
      <div className="middle-column">
        <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
          <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
            <NewPostComponent placeholder='New Message'/>
            {posts.map((post, index) => (
              <PostContent 
                key={index} 
                user_name={'saumitra Tiwari'}
                guess_number={post.guess_number} 
                date={post.date} 
                last_guess={post.last_guess} 
                postContent={post.postContent} 
                wordOfTheDay={post.wordOfTheDay}
              />
            ))}
          </div>
          <style>{scrollbarStyles}</style>
        </div>
      </div>
    </div>
  );
}