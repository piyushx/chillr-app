import React from 'react'
import { Link } from 'react-router-dom';

function PostItem() {
    return (
        <div>
            {/* Here we will feed the details of each post and create postitem component */}
            Post - 1 (on click would open up openPost component)
            <Link className="nav-link" to="/open">view full post</Link>
        </div>
    )
}

export default PostItem
