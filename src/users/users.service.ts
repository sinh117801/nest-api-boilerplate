import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async #checkNotExistedUser(id: number) {
    const existedUser = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existedUser?.id)
      throw new HttpException(`User doesn't exited`, HttpStatus.BAD_REQUEST);

    return existedUser;
  }

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existedUser?.id)
      throw new HttpException(
        'Email is already existed',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    return { resourceId: user.id };
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      include: { messages: true },
    });

    return { data: users };
  }

  async findOne(id: number) {
    const user = await this.#checkNotExistedUser(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.#checkNotExistedUser(id);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return { resourceId: updatedUser.id };
  }

  async remove(id: number) {
    const user = await this.#checkNotExistedUser(id);

    await this.prismaService.user.delete({ where: { id } });

    return { resourceId: user.id };
  }
}
