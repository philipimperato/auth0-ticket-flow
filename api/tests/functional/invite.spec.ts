import { test } from '@japa/runner'

test.group('Invite User', () => {
  test('should return validation errors for invalid data', async ({ client }) => {
    const invalidInviteData = {
      email: 'invalid-email',
      timezone: 'test-timezone',
      firstName: 'test-first-name',
      lastName: 'test-last-name',
      zipCode: '012345',
    }

    const response = await client.post('/api/invite').json(invalidInviteData)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'clientName',
          message: 'The clientName field must be defined',
        },
      ],
    })
  })

  test('should return validation errors for invalid email', async ({ client }) => {
    const invalidInviteData = {
      clientName: 'Test Client',
      email: 'invalid-email',
      timezone: 'test-timezone',
      firstName: 'test-first-name',
      lastName: 'test-last-name',
      zipCode: '01234',
    }

    const response = await client.post('/api/invite').json(invalidInviteData)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'The email field must be a valid email address',
        },
      ],
    })
  })
})
