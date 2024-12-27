import * as bcrypt from 'bcrypt';

export class HashService {
  saltOrRounds = 7;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  async validatePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
