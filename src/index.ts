import "reflect-metadata";
import "./domain/diContainers";
import { container } from "tsyringe";
import middy from "@middy/core";
import httpRouterHandler from "@middy/http-router";
import ssm from "@middy/ssm";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpSecurityHeadersMiddleware from "@middy/http-security-headers";
import httpErrorHandler from "@middy/http-error-handler";
import inputOutputLogger from "@middy/input-output-logger";
import { LoggerService, manageGlobalError, maskedKeys } from "utility-library";
import { RestApiController } from "./adapters/in/rest-api";
import {
  zAllOptionalRequestHeaders,
  OptionalRequestHeadersType,
} from "./domain/rest-api-model";
import { v4 as uuidv4 } from "uuid";

const loggerService = container.resolve(LoggerService);
const geoServicesController = container.resolve(RestApiController);
const routes = geoServicesController.getRoutes();

loggerService.info("Rest Api Lambda Initiated");
const logger = (message: any) => loggerService.error(message);

const validateHeadersAndSetCorrelationId = (): middy.MiddlewareObj<
  any,
  any
> => {
  return {
    before: async (handler) => {
      const headers: OptionalRequestHeadersType =
        zAllOptionalRequestHeaders.parse(handler.event.headers);
      let correlationId = headers["cv-correlation-id"];
      if (!correlationId) {
        correlationId = uuidv4();
        handler.event.headers["cv-correlation-id"] = correlationId;
      }
    },
  };
};

const handler = middy()
  .use(httpHeaderNormalizer())
  .use(validateHeadersAndSetCorrelationId())
  .use(httpJsonBodyParser())
  .use(httpSecurityHeadersMiddleware())
  .use(
    inputOutputLogger({
      logger: (request: any) => {
        loggerService.logRequestResponse(request);
      },
      awsContext: true,
      omitPaths: maskedKeys,
      mask: "***Value Masked***",
    }),
  )
  .use(
    ssm({
      fetchData: {
        REST_API_KEY_PATH: process.env["REST_API_KEY_PATH"] ?? "",
      },
      cacheExpiry: 15 * 60 * 1000,
      cacheKey: "ssm-defaults",
      cache: true,
      setToContext: true,
    }),
  )
  .use(manageGlobalError())
  .use(httpErrorHandler({ logger }))
  .handler(httpRouterHandler(routes));

export { handler };
