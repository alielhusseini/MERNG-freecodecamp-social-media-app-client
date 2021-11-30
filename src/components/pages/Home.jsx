import React from 'react'
import { useQuery, gql } from "@apollo/client";

const FETCH_POSTS_QUERY = gql` # here you write your query
  query test {
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
    }
  }
`

export default function Home() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY ); // fetches the query that is passed, where you'll get access to data, error & loading

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const posts = data?.getPosts

    return posts?.map(({body , id}) => (
        <div key={id}>
            <p>{ body }</p>
        </div>
    ));
}
