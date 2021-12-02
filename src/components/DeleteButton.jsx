import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY, DELETE_COMMENT_MUTATION } from '../utils/graphql'

export default function DeleteButton({ postId, callback, commentId }) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        variables: { postId, commentId },
        update(proxy) { 
            setConfirmOpen(false)
            if (!commentId) { // // upon deleting we need to remove a post from the cache (update the cached data --> same as we did when we added a post) / for rendering purposes
                const cachedData = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY, 
                    data: {
                        getPosts: [...cachedData.getPosts].filter(post => post.id !== postId)
                    }
                })
            }
            if (callback) callback()
        }
    })

    return (
        <>
        <Popup 
            content={ commentId ? "Delete comment" : "Delete post"}
            inverted
            trigger={
                <Button as='div' color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash' style={{ margin: 0 }}/>
                </Button>
            }
        />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    )
}
