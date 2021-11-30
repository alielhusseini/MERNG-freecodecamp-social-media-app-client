import { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER_MUTATION = gql`
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

export default function Register() {
    const [values, setValues] = useState({username: '', email: '', password: '', confirmPassword: ''})
    const [errors, setErrors] = useState({})

    const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
        update(proxy, result) { // this function will trigger if mutation is successful
            console.log(result)
        },
        onError({ graphQLErrors }) {
            console.log(graphQLErrors[0].extensions.exception)
            // setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values // { username: values.username, ... }
    })

    const onSubmit = e => {
        e.preventDefault()
        
        // we already have server side validation, no need for the client's side (bu onError isn't getting our sent data upon errors => client side error must be handled)
        addUser() // the mutation action will be triggered, if successful the "update" function will fire
        setValues({username: '', email: '', password: '', confirmPassword: ''})
    }

    const onChange = e => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : "" }>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    // error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    // error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    // error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    // error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>Register</Button>
            </Form>
            {/* { Object.keys(errors)?.length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors)?.map(value => (
                            <li key={ value }>{ value }</li>
                        ))}
                    </ul>
                </div>
            ) } */}
        </div>
    )
}
