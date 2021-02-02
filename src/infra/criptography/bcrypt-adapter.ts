import bcrypt from 'bcrypt'
import { Encrypter } from '@data-protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  public salt = 12
  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return ''
  }
}
