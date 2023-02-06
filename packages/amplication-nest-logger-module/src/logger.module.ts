import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AmplicationLogger } from "./logger.service";

@Module({
  imports: [ConfigModule],
  providers: [AmplicationLogger],
  exports: [AmplicationLogger],
})
export class AmplicationLoggerModule {}
