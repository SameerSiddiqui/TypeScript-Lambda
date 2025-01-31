type JSONData = Record<string, unknown> | undefined;
type ArgsDict = Record<string, unknown> | undefined;
type Headers = Record<string, string | undefined>;
type MultiValueHeaders = Record<string, string[] | undefined>;
type PathParameters = Record<string, string | undefined>;
type QueryStringParameters = Record<string, string | undefined>;
type MultiValueQueryStringParameters = Record<string, string[] | undefined>;
type Path = string;
type PathPattern = RegExp;
type Body = string | Buffer | undefined;
type OptionalString = string | undefined | null;
type ContentType =
  | "text/html"
  | "text/plain"
  | "application/xml"
  | "application/json"
  | "application/xhtml+xml";
type Context = Map<string, unknown>;
type HTTPMethod = string | string[];
type AsyncFunction<T = unknown> = (
  ...args: unknown[]
) => Promise<ReturnType<() => T>>;
type Callback<TResult = any> = (
  error?: Error | string | null,
  result?: TResult,
) => void;

export {
  ArgsDict,
  AsyncFunction,
  Body,
  ContentType,
  Context,
  HTTPMethod,
  Headers,
  JSONData,
  MultiValueHeaders,
  MultiValueQueryStringParameters,
  OptionalString,
  Path,
  PathParameters,
  PathPattern,
  QueryStringParameters,
  Callback,
};
