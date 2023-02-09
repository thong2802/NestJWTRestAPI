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
}
