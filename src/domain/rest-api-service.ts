import { injectable, inject } from "tsyringe";
import {
  LoggerService,
  HttpClient,
  HttpMethod,
  HttpRequest,
  ErrorDetailTypeDownStream,
  RequestHeadersType,
  convertHeadersToRequestCall,
  QueryString,
} from "utility-library";
import { appConfig } from "../config/app-config";

@injectable()
export class RestApiService {
  private readonly httpClient: HttpClient;

  constructor(@inject(LoggerService) private logger: LoggerService) {
    this.httpClient = new HttpClient({
      baseUrl: appConfig.RestApiUrl,
      timeout: appConfig.RestApiTimeout,
      disableLoggerInterceptor: false,
      loggerInstance: this.logger,
      headers: {
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        Accept: "*/*",
      },
    });
  }

  public async getData(key: string, headers: RequestHeadersType): Promise<any> {
    const queryString = new QueryString();
    queryString.addParameter("key", key);

    const getPlacesDetailsRequest: HttpRequest = {
      method: HttpMethod.Get,
      route: "/objects/4",
      headers: convertHeadersToRequestCall(headers),
      disableRequestValidation: true,
      disableResponseValidation: true,
      queryString: queryString,
      meta: {
        targetType: ErrorDetailTypeDownStream.INTERNAL_API_CALL,
        target: "Rest API",
      },
    };

    const result = await this.httpClient.send(getPlacesDetailsRequest);
    return result.getBodyAsJson();
  }
}
