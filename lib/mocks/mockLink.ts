import { ApolloLink, Observable } from '@apollo/client'
import {
  mockLoginResponse,
  mockUserResponse,
  simulateApiDelay,
  mockErrors,
} from '@/lib/mocks/mockData'

export const createMockLink = () => {
  return new ApolloLink((operation) => {
    return new Observable((observer) => {
      const { operationName, variables } = operation

      const handleRequest = async () => {
        try {
          // Simulate API delay
          await simulateApiDelay(800)

          // Mock login mutation
          if (operationName === 'Login') {
            const { identifier, password } = variables

            // Check if credentials match mock data
            if (
              identifier === 'john.doe@example.com' &&
              password === 'Password123.'
            ) {
              observer.next({
                data: mockLoginResponse,
              })
              observer.complete()
            } else {
              observer.error(new Error(mockErrors.invalidCredentials.message))
            }
            return
          }

          // Mock user query
          if (operationName === 'GetUser') {
            const { id } = variables

            if (id === '1') {
              observer.next({
                data: mockUserResponse,
              })
              observer.complete()
            } else {
              observer.error(new Error('User not found'))
            }
            return
          }

          // Default error for unknown operations
          observer.error(new Error('Operation not supported in mock mode'))
        } catch (error) {
          observer.error(error)
        }
      }

      handleRequest()

      // Return cleanup function
      return () => {
        // Cleanup if needed
      }
    })
  })
}
