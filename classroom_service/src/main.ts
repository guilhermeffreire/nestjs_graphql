import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import chalk from 'chalk';
import figlet from 'figlet';

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

  await app.listen(4003, () =>
    console.log(
      chalk.blueBright(
        figlet.textSync('CLASSROOM \n \n 4003', {
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 100,
          whitespaceBreak: true,
        }),
      ),
    ),
  );
}

bootstrap();
