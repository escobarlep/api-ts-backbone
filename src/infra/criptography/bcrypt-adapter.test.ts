import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('should call bcrypt adapter with correct value', async () => {
    const sut = new BcryptAdapter()
    const hasher = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hasher).toHaveBeenCalledWith('any_value', sut.salt)
  })
})
