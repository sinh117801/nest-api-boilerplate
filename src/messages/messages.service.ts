import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async #checkNotExistedMessage(id: number) {
    const existedMessage = await this.prismaService.message.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existedMessage?.id)
      throw new HttpException(`Message doesn't exited`, HttpStatus.BAD_REQUEST);

    return existedMessage;
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prismaService.message.create({
      data: createMessageDto,
    });

    return { resourceId: message.id };
  }

  findAll() {
    const messages = this.prismaService.message.findMany();

    return { data: messages };
  }

  findOne(id: number) {
    const message = this.prismaService.message.findUnique({ where: { id } });

    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.#checkNotExistedMessage(id);

    const updatedMessage = await this.prismaService.message.update({
      where: { id },
      data: updateMessageDto,
    });

    return { resourceId: updatedMessage.id };
  }

  async remove(id: number) {
    const message = await this.#checkNotExistedMessage(id);

    await this.prismaService.message.delete({ where: { id } });

    return { resourceId: message.id };
  }
}
