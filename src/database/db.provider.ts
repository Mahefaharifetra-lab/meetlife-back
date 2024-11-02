import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { EventEntity } from "src/modules/event/entities/event.entity";
import { EventReqEntity } from "src/modules/event-req/entities/event-req.entity";
export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: "localhost",
        port: 3306,
        username: "user",
        password: "password",
        database: "meetlife",
      });
      sequelize.addModels([UserEntity, EventEntity, EventReqEntity]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
