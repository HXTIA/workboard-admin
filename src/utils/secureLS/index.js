import SecureLS from 'secure-ls';
export const ls = new SecureLS({
  encodingType: 'aes', // 加密类型
  isCompression: false,
  encryptionSecret: 'encryption', // PBKDF2值
});
