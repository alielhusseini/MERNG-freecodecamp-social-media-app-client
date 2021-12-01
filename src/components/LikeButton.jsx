import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { from, useMutation } from "@apollo/client";
import { useGlobalAuthContext } from '../context/authContext';
import { LIKE_POST_MUTATION } from '../utils/graphql'
import { Button, Label, Icon } from 'semantic-ui-react'

export default function LikeButton({ post : { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false)
    const { user } = useGlobalAuthContext()

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) setLiked(true)
        else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
        update: (proxy, result) => {

        }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='teal'><Icon name='heart' /></Button>
        ) : (
            <Button color='teal' basic><Icon name='heart' /></Button>
        )
    ) : (
        <Button as={ Link } to='/login' color='teal' basic><Icon name='heart' /></Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            { likeButton }
            <Label basic color='teal' pointing='left'>{ likeCount }</Label>
        </Button>
    )
}


