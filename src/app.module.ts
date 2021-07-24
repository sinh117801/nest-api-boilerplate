import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [MessagesModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
