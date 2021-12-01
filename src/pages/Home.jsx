import React from 'react'
import { useQuery } from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { useGlobalAuthContext } from '../context/authContext'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY); // fetches the query that is passed, where you'll get access to data, error & loading
  const { user } = useGlobalAuthContext()
  const posts = data?.getPosts

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        { user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        ) }
        { loading ? <h1>Loading posts...</h1> : (
          <Transition.Group>
            { posts && posts.map(post => (
            <Grid.Column key={ post.id } style={{ marginBottom: 20 }}>
              <PostCard { ...post } />
            </Grid.Column>
          )) }
          </Transition.Group>
        ) }
      </Grid.Row>
    </Grid>
  )
}
