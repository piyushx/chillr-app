import React from 'react'

function CommentItem(props) {
    const {comment, userid, name} = props

    

    return (
        <div className="row">
            <div className="col-sm-11 my-4">
                <div className="card p-2">
                    <div className="card-body">
                    <div class="d-flex justify-content-between">
          <h3>{comment}</h3>
          <h5>By: {name}</h5>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
    
}

export default CommentItem
