import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client'
import {ConfigService} from '@nestjs/config'
@Injectable()
export class PrismaService extends PrismaClient{
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    //url:"postgresql://postgres:Abc12345678@localhost:5434/testDB?schema=public"
                    url: configService.get('DATABASE_URL')
                }
            }
        })
    }

    cleanDataBase() {
        // In a 1 - N relation, delete N firstly, then delete "1"
        return this.$transaction([
            // 2 commands in ONE transaction
            this.note.deleteMany(),
            this.user.deleteMany()
        ])
    }
}
