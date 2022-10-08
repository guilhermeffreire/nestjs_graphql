import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';
import figlet from 'figlet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4003, () =>
    console.log(
      chalk.blueBright(
        figlet.textSync('CLASSROOM', {
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 60,
          whitespaceBreak: true,
        }),
      ),
    ),
  );
}
bootstrap();
