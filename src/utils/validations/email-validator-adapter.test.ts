import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  test('Should return false when invalid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com', false)
    expect(isValid).toBe(false)
  })
  test('Should throw when invalid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    expect(() => sut.isValid('valid_email@mail.com'))
      .toThrow(new Error('invalid email'))
  })
  test('Should return true when valid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com', false)
    expect(isValid).toBe(true)
  })
})
