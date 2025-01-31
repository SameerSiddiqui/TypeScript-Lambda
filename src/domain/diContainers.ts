import { container } from "tsyringe";
import { Constants } from "../util/constants";

container.register(Constants.SERVICE_NAME, { useValue: "rest-api-service" });
