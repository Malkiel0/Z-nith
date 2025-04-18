// user.module.ts
// Module User pour Nest.js, clean code et commenté

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UserService, UserResolver, PrismaService],
  controllers: [require('./user.controller').UserController],
})
export class UserModule {}
