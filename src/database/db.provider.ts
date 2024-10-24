import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { EventEntity } from "src/modules/event/entities/event.entity";
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
      sequelize.addModels([UserEntity, EventEntity]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
