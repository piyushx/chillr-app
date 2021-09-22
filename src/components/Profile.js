import React from 'react'
import PostItem from './PostItem'

function Profile() {
    return (
        <div>
            {/* Here we will show the photo, bio and number of posts he has */}
            This is profile
            {/* We will map the entire array of the author's posts and use postitem for each post*/}
            <PostItem/>
        </div>
    )
}

export default Profile
