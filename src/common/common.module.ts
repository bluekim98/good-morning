import { Module } from '@nestjs/common';
import { BaseRepository } from './provider/base.repository';

@Module({
    providers: [BaseRepository],
    exports: [BaseRepository],
})
export class CommonModule {}
