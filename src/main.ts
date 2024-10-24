import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });
  await app
    .use(json({ limit: "10mb" }))
    .use(urlencoded({ limit: "10mb", extended: true }))
    .listen(3000);
}
bootstrap();
