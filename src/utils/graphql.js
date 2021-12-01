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

export const FETCH_POST_QUERY = gql `
    query GetPost($postId: ID!) {
        getPost(postId: $postId) {
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

export const LIKE_POST_MUTATION = gql `
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likeCount
            likes {
                id
                username
            }
        }
    }
`

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
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