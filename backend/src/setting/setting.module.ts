// Module NestJS pour la gestion des paramètres globaux (Setting)
// Clean code, ultra commenté, prêt à l’emploi

import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingResolver } from './setting.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SettingService, SettingResolver, PrismaService],
  exports: [SettingService],
})
export class SettingModule {}
