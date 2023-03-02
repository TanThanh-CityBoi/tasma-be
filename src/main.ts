import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as chalk from 'chalk';
import { AllExceptionsFilter } from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Accept-Language, Authorization,',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.enableShutdownHooks();
  app.useGlobalFilters(new AllExceptionsFilter());

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(chalk.blueBright(`SERVER STARTED ON PORT ${PORT}!`));
  });
}
bootstrap();
