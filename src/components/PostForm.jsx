import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { useForm } from '../utils/useForm'
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql'

export default function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update: (proxy, result) => {
            const cachedData = proxy.readQuery({ // for re-rendering upon submitting a post, we try and access the CACHE in the apollo that's caching our current data(all the posts), there we'll try to add our new post to the cached data - add the new post to the cache --> all our data that is sitting in the cache is stored in the data variable
                query: FETCH_POSTS_QUERY // we're trying to the access the getPosts query -> will return the cached data from getPosts
            })
            // console.log(result.data.createPost) new submitted post
            // console.log(cachedData.getPosts) current cached data
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY, 
                data: {
                    getPosts: [result.data.createPost, ...cachedData.getPosts] // adding our new post to the posts
                } 
            })
            values.body = '';
        }
    });

    function createPostCallback() { createPost() }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                       // error={error ? true : false}
                    />
                    <Button type="submit" color="teal">Submit </Button>
                </Form.Field>
            </Form>
            {/* {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )} */}
        </>
    )
}
