import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [PrismaModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
