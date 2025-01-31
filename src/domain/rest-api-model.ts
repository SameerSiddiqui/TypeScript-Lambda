import { z } from "zod";

export const zAllOptionalRequestHeaders = z.object({
  authorization: z.string().optional(),
  "content-type": z.string().optional(),
  "x-correlation-id": z.string().optional(),
  "cv-correlation-id": z.string().optional(),
});

export type OptionalRequestHeadersType = z.infer<
  typeof zAllOptionalRequestHeaders
>;

const ProductDataSchema = z.object({
  price: z.number(),
  color: z.string(),
});

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: ProductDataSchema,
});

export type Product = z.infer<typeof ProductSchema>;
