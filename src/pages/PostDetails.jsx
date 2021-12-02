import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from '../utils/graphql'
import { useQuery, useMutation } from '@apollo/client'
import { Card, Button, Form, Grid, Image, Icon, Label } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import { useGlobalAuthContext } from '../context/authContext';
import moment from 'moment';
import MyPopup from '../utils/MyPopup';
import DeleteButton from '../components/DeleteButton';
import Comments from '../components/Comments';

export default function PostDetails() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const { user } = useGlobalAuthContext()
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const { data } = useQuery(FETCH_POST_QUERY, {
      variables: { postId }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update() {
        setComment('');
        commentInputRef.current.blur();
      },
      variables: { postId, body: comment }
    })

    function deletePostCallback() { navigate('/', { replace: true }) }

    let postMarkup

    if (!data?.getPost) {
      postMarkup = <p>Loading post...</p>
    }
    else { 
        const { id, body, username, createdAt, likeCount, likes, comments, commentCount } = data?.getPost 
        postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton post={{ id, likeCount, likes }} />
                  <MyPopup content={ user ? "Comment on post" : "Login or Register to comment on posts"}>
                    <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')} >
                      <Button basic color="blue"><Icon name="comments" /></Button>
                      <Label basic color="blue" pointing="left">{commentCount}</Label>
                    </Button>
                  </MyPopup>
                  {user && user.username === username && (<DeleteButton postId={id} callback={deletePostCallback}/> )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment.."
                          name="comment"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ''}
                          onClick={submitComment}
                        >Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              <Comments comments={comments} postId={id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        )
    }

  return postMarkup
}
