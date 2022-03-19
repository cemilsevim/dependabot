import { Controller, Get, Query } from '@nestjs/common';
import { ResolvedPackages } from 'dependabot/src/types/PackageManager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('findOutdatedPackages')
  async findOutdatedPackages(@Query() query: {
    repository: string;
  }): Promise<{
    repository: string;
    outdatedPackages: ResolvedPackages,
  }> {
    const repository: string = query.repository;
    const outdatedPackages = await this.appService.findOutdatedPackages(repository);
    const response = {
      repository,
      outdatedPackages
    };

    return response;
  }
}
