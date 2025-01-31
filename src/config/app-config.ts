/**
 * loads & stores the environment data
 */
class AppConfig {
  public readonly RestApiUrl: string | undefined;
  public readonly RestApiTimeout: number;
  public readonly region: string;

  constructor() {
    this.RestApiUrl = process.env["REST_API_URL"];
    this.RestApiTimeout = Number(process.env["REST_API_TIMEOUT"]) || 3000;
    this.region = process.env["AWS_REGION_NAME"] || "us-east-1";
  }
}

export { AppConfig };
export const appConfig = new AppConfig();
