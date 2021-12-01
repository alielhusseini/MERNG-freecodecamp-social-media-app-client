import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql `
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            commentCount
            likeCount
            likes {
                id
                username
                createdAt
            }
            comments {
                id
                body
                username
                createdAt
            }
        }
    }
`

export const FETCH_POSTS_QUERY = gql `
    query GetPosts {
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

export const LOGIN_USER_MUTATION = gql `
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          email 
          createdAt
          token  
        }
    }
`

export const REGISTER_USER_MUTATION = gql `
    mutation Register($username: String!, $password: String!, $confirmPassword: String!, $email: String!) {
        register(registerInput: {username: $username, password: $password, confirmPassword: $confirmPassword, email: $email}) {
          id
          username
          email 
          createdAt
          token  
        }
    }
`