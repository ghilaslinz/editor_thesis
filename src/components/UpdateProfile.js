import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card className="mt-5 ">
        <Card.Body>
          <h3 tabIndex="0" className="text-center mb-4">Update Profile</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} action="/">
            <Form.Group >
              <Form.Label  for="email">Email</Form.Label>
              <Form.Control
              id="email"
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label for="password">Password</Form.Label>
              <Form.Control
              id="password"
                type="password"
                ref={passwordRef}
               // placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group >
              <Form.Label for="password-confirm">Password Confirmation</Form.Label>
              <Form.Control
              id="password-confirm"
                type="password"
                ref={passwordConfirmRef}
               // placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="btn btn-primary btn-lg active w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link className="link"  to="/">Cancel</Link>
      </div>
    </>
  )
}
