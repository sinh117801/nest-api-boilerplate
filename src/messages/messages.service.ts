import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  findAll() {
    return `This will list all messages.`;
  }

  findOne(id: string) {
    return `this will show messages with ID: ${id}`;
  }

  create(createMessageDto: CreateMessageDto) {
    return createMessageDto;
  }
}
