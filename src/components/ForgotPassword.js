import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
  
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4" tabIndex="0">Password Reset</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} action="/">
            <Form.Group >
              <Form.Label for="email">Email</Form.Label>
              <Form.Control id="email" type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="btn btn-primary btn-lg active w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="link"  to="/">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link className="link"  to="/signup">Sign Up</Link>
      </div>
      
    </>
  )
}
