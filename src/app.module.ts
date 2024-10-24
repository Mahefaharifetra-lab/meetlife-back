import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "src/database/db.module";
import { UserModule } from "./modules/user/user.module";
import { EventModule } from "./modules/event/event.module";
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: "MEETLIFE",
        signOptions: { expiresIn: "2d" },
      }),
    }),
    UserModule,
    EventModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
