import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log(chalk.blue.bold('[ Classroom ] Microservice is running'));
  });

  app.listen(4003).then(() => {
    console.log(chalk.blue.bold('[ Classroom ] Server running in port 4003'));
  });
}

bootstrap();
