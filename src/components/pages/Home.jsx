import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Grid } from 'semantic-ui-react';
import PostCard from '../PostCard';

const FETCH_POSTS_QUERY = gql` # here you write your query
  query getPosts {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      comments {
        id 
        username 
        createdAt
        body
      }
      commentCount
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY ); // fetches the query that is passed, where you'll get access to data, error & loading

  const posts = data?.getPosts

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
          { loading ? <h1>Loading posts...</h1> : (
            posts && posts.map(post => (
              <Grid.Column key={ post.id } style={{ marginBottom: 20 }}>
                <PostCard { ...post } />
              </Grid.Column>
            ))
          ) }
      </Grid.Row>
    </Grid>
  )
}
