import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config = {
    type: 'mysql',
    host: process.env.MYSQL_APP_HOST,
    port: 3306,
    username: process.env.MYSQL_USER_NAME_APP,
    password: process.env.MYSQL_USER_PASSWORD_APP,
    database: 'goodmorning',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
} as TypeOrmModuleOptions;

export default config;
