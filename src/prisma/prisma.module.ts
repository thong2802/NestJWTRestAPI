import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global () // This service is globally
@Module({
  providers: [PrismaService],
  exports:[PrismaService],
})
export class PrismaModule {}
