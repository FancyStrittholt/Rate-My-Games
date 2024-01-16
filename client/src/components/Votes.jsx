import React from 'react';
import {useState} from 'react';

const voteCounter = () => {
    const [votes, setVotes] = useState(0);
    const handleUpvote = () => {
        setVotes(votes + 1);
    };
    const handleDownvote = () => {
        setVotes(votes === 0 ? -1 : votes - 1);
    };
    return (
      <></>
    );
};

export default voteCounter;
