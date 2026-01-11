/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No user found w/ provided ID: ${id}`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(dto: UserCreateDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `A user with the email address ${dto.email} already exists`,
      );
    }

    const created = await this.prisma.user.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Could not create user with the provided data: ${JSON.stringify(dto)}`,
      );
    }

    return created;
  }

  async update(id: number, dto: UserUpdateDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`No user found with the provided ID: ${id}`);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update user id: ${id} with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return updated;
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(
        `No user was found with the provided ID: ${id}`,
      );
    }

    await this.prisma.user.delete({ where: { id } });
    return existingUser;
  }
}
