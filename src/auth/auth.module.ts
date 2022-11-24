import { forwardRef, Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    HashService,
    AuthService,
    LocalStrategy,
    ConfigService,
    JwtAuthGuard,
  ],
  exports: [HashService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
