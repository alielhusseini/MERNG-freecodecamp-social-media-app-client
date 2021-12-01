import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import { useGlobalAuthContext } from '../context/authContext';
import { LIKE_POST_MUTATION } from '../utils/graphql'
import { Button, Label, Icon } from 'semantic-ui-react'

export default function LikeButton({ post : { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false)
    const { user } = useGlobalAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) setLiked(true)
        else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    })

    function likePostClick() {
        user ? likePost() : navigate('/login')
    }

    const likeButton = user ? (
        liked ? (
            <Button color='teal'><Icon name='heart' /></Button>
        ) : (
            <Button color='teal' basic><Icon name='heart' /></Button>
        )
    ) : (
        <Button color='teal' basic><Icon name='heart' /></Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePostClick}>
            { likeButton }
            <Label basic color='teal' pointing='left'>{ likeCount }</Label>
        </Button>
    )
}


