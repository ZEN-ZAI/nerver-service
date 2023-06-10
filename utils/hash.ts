import * as CryptoJS from 'crypto-js';

export function hashPassword(rawPassword: string): string {
  return CryptoJS.SHA224(rawPassword, process.env.PASSWORD_SALT).toString();
}