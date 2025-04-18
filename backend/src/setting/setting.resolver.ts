// Résolveur GraphQL pour la gestion des paramètres globaux (Setting)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Setting } from './setting.model';
import { SettingService } from './setting.service';
import { Injectable } from '@nestjs/common';

@Resolver(() => Setting)
@Injectable()
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  /**
   * Query pour récupérer les paramètres globaux
   */
  @Query(() => Setting, { name: 'settings', nullable: true })
  async getSettings() {
    return this.settingService.getSettings();
  }

  /**
   * Mutation pour mettre à jour les paramètres globaux
   */
  @Mutation(() => Setting)
  async updateSettings(
    @Args('shopName') shopName: string,
    @Args('email') email: string,
    @Args('currency') currency: string,
    @Args('theme') theme: string,
    @Args('maintenance') maintenance: boolean,
  ) {
    return this.settingService.updateSettings({
      shopName,
      email,
      currency,
      theme,
      maintenance,
    });
  }
}
