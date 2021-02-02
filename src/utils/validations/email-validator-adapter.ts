import { EmailValidator } from '../../presentation/protocols/email-validator'

import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string, shouldThrow = true): boolean {
    const isValid = validator.isEmail(email)
    if (shouldThrow && !isValid) throw new Error('invalid email')

    return isValid
  }
}
