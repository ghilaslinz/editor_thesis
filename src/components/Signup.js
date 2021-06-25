import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="mt-5 ">
        <Card.Body>
          <h3 tabIndex="0" className="text-center mb-4">Sign Up</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} action="/">
            <Form.Group >
              <Form.Label for="email">Email</Form.Label>
              <Form.Control id="email" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group >
              <Form.Label for="password">Password</Form.Label>
              <Form.Control id="password" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group >
              <Form.Label for="password-confirm">Password Confirmation</Form.Label>
              <Form.Control id="password-confirm" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="btn btn-primary btn-lg active w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Already have an account? <Link className="link"  to="/">Log In</Link>
      </div>
    </>
  )
}
