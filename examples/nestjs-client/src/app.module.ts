import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DependaBot from 'dependabot';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DependaBot',
      useFactory: () => {
        return new DependaBot();
      }
    }
  ],
})
export class AppModule {}
