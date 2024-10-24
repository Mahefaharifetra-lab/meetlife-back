import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UserController, RegisterController],
  providers: [UserService, RegisterService],
  imports: [AuthModule],
})
export class UserModule {}
