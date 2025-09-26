import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// ThrottlerGuard is no longer imported or used here

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // This line has been removed. The guard is now provided globally in AppModule.
  // app.useGlobalGuards(new ThrottlerGuard()); 

  app.enableCors({ origin: 'http://localhost:5173' }); // Allow frontend
  await app.listen(3001); // Backend port
}
bootstrap();
