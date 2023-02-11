import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'dev.env';
  let filePath: string = resolve(`${dest}/${filename}`);
  console.log('ConfigPath: ' + filePath);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
