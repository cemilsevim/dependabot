import { Inject, Injectable } from '@nestjs/common';
import DependaBot from 'dependabot';
import { ResolvedPackages } from 'dependabot/src/types/PackageManager';

@Injectable()
export class AppService {
  constructor(@Inject('DependaBot') private readonly dependabot: DependaBot) {}

  findOutdatedPackages(repositoryUrl: string): Promise<ResolvedPackages> {
    return this.dependabot.packageChecker.findOutdatedPackages(repositoryUrl);
  }
}
