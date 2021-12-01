import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql'
import MyPopup from '../utils/MyPopup';

export default function DeleteButton({ postId }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePostOrMutation] = useMutation(DELETE_POST_MUTATION, {
        variables: { postId },
        update() {
            setConfirmOpen(false)
        }
    })

    return (
        <>
        <Button as='div' color="red" floated="right" onClick={() => {}}>
            <Icon name='trash' style={{ margin: 0 }}/>
        </Button>
        <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePostOrMutation}
        />
        </>
    )
}
