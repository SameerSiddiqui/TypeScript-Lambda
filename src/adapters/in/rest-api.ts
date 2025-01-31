import { injectable, inject } from "tsyringe";
import middy from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import {
  LoggerService,
  HttpMethod,
  createResponseHeaders,
  convertToRequestHeadersType,
  RESTError,
  ErrorType,
} from "utility-library";
import { RestApiService } from "../../domain/rest-api-service";

@injectable()
class RestApiController {
  public constructor(
    @inject(RestApiService) private restApiService: RestApiService,
    @inject(LoggerService) private logger: LoggerService,
  ) {}

  // Updated handler to extract lat and long from queryStringParameters
  getData() {
    return middy().handler(
      async (event: APIGatewayProxyEvent, context: any) => {
        //extract queryParams if available

        if (!context.KEY_FROM_SSM) {
          this.logger.error("SSM Key/Value is Missing");
          throw new RESTError(ErrorType.SERVICE_EXCEPTION, [
            "Internal Server Error: Unable to Data",
          ]);
        }

        // Convert headers to RequestHeadersType, ensuring it's not null
        const headers = convertToRequestHeadersType(event.headers || {});

        try {
          const data = await this.restApiService.getData(
            context.KEY_FROM_SSM,
            headers,
          );

          return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: createResponseHeaders(event),
          };
        } catch (error) {
          this.logger.error("Error fetching address.", { error });
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: "Internal Server Error: Unable to fetch address.",
            }),
            headers: createResponseHeaders(event),
          };
        }
      },
    );
  }

  public getRoutes() {
    return [
      {
        method: "GET" as HttpMethod.Get,
        path: "/somePath/v1/fetch-data",
        handler: this.getData(),
      },
    ];
  }
}

export { RestApiController };
