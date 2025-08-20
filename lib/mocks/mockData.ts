// Mock data for local testing
export const mockUser = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
}

//Already expired token for testing
// export const mockJWT =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM0NzI5NjAwLCJleHAiOjE3MzQ4MTYwMDB9.mock-signature'

export const mockJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU1NTA1MjAwLCJleHAiOjE3ODcxMzg4MDB9.mock-signature'

export const mockLoginResponse = {
  login: {
    jwt: mockJWT,
  },
}

export const mockUserResponse = {
  user: mockUser,
}

// Mock credentials for testing
export const mockCredentials = {
  email: 'john.doe@example.com',
  password: 'Password123.',
}

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mock error responses
export const mockErrors = {
  invalidCredentials: {
    message: 'Invalid identifier or password',
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  },
  networkError: {
    message: 'Network error: Unable to connect to server',
  },
  serverError: {
    message: 'Internal server error',
  },
}
