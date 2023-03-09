export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.PORT = process.env.PORT || 5000;
    this.envConfig.DB_URI = process.env.MONGODB_URI;
    this.envConfig.JWT_SECRET = process.env.JWT_SECRET;
    this.envConfig.TOKEN_EXPTIME = process.env.TOKEN_EXPTIME;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
