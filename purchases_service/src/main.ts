import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(4002).then(() => {
    console.log(chalk.blue.bold('[ Purchases ] Server running in port 4002'));
  });
}
bootstrap();
