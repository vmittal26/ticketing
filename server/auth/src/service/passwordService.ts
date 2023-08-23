import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const toHash = async (password: string) => {
  const salt = randomBytes(8).toString('hex');

  const buff = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buff.toString('hex')}.${salt}`;
};

export const compare = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buff.toString('hex') === hashedPassword;
};
