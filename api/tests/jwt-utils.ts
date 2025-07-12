export const mockJwks = {
  keys: [
    {
      kty: 'RSA',
      kid: 'test-key-id',
      use: 'sig',
      n: 'test-modulus',
      e: 'AQAB',
      x5c: ['test-cert'],
    },
  ],
}

export const testPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA4f5wg5l2hKsTeNem/V41fGnJm6gOdrj8ym3rFkEjWT2btN8X
test-key-content-here
-----END RSA PRIVATE KEY-----`
