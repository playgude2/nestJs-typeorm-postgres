import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('PG_DB_HOST'),
      port: this.config.get<number>('PG_DB_PORT'),
      database: this.config.get<string>('PG_DB_NAME'),
      username: this.config.get<string>('PG_DB_USER'),
      password: this.config.get<string>('PG_DB_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migration',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
