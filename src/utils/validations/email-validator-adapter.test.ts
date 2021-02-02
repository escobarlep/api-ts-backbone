import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('Should return false when invalid email is provided', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com', false)
    expect(isValid).toBe(false)
  })
  test('Should throw when invalid email is provided', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    expect(() => sut.isValid('valid_email@mail.com'))
      .toThrow(new Error('invalid email'))
  })
  test('Should return true when valid email is provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com', false)
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmail = jest.spyOn(validator, 'isEmail')

    sut.isValid('valid_email@mail.com', false)
    expect(isEmail).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
