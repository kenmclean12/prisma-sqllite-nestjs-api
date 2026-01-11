/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserResponseDto, UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No user found w/ provided ID: ${id}`);
    }

    return user as UserResponseDto;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return (await this.prisma.user.findMany()) as UserResponseDto[];
  }

  async create(dto: UserCreateDto): Promise<UserResponseDto> {
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

    return created as UserResponseDto;
  }

  async update(id: number, dto: UserUpdateDto): Promise<UserResponseDto> {
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

    return updated as UserResponseDto;
  }

  async remove(id: number): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(
        `No user was found with the provided ID: ${id}`,
      );
    }

    await this.prisma.user.delete({ where: { id } });
    return existingUser as UserResponseDto;
  }
}
