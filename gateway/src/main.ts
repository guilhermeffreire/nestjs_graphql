import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import chalk from "chalk";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(4000).then(() => {
    console.log(chalk.blue.bold("[ Federation ] Server running in port 4000"));
  });
}

bootstrap();
