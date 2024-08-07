import { createHmac } from 'crypto';

const textToHash = (value: string): string => {
  const md5Key = createHmac('md5', value).digest('hex');
  const sha1Key = createHmac('sha1', md5Key).digest('hex');
  return sha1Key;
};

export default textToHash;
