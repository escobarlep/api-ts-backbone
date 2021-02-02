import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => await Promise.resolve('hashed_value')
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt adapter with correct value', async () => {
    const sut = makeSut()
    const hasher = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hasher).toHaveBeenCalledWith('any_value', sut.salt)
  })

  test('should call bcrypt adapter with correct value', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toEqual('hashed_value')
  })

  test('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
