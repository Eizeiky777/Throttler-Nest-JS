import * as dotenv from 'dotenv';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath?: string) {
    if (filePath) {
      const envVariables = fs.readFileSync(filePath);
      this.envConfig = dotenv.parse(envVariables);
    } else {
      this.envConfig = dotenv.config().parsed;
    }
    console.log(
      '🚀 ~ file: config.service.ts ~ line 15 ~ ConfigService ~ constructor ~ envConfig',
      this.envConfig,
    );
  }

  get(key: string): string {
    return String(this.envConfig[key]).split(',')[0];
  }
}

const configService = new ConfigService();
export { configService };
