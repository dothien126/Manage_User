import { IsString, MinLength, IsOptional, Matches } from 'class-validator';
import { Trim } from 'class-sanitizer';

export enum albumStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class AlbumDto {
  @IsString()
  @Trim()
  @MinLength(1, { message: 'Name album should be minimum of 1 characters' })
  public name?: string;

  @IsString()
  @Trim()
  @MinLength(1, {
    message: 'Description album should be minimum of 1 characters',
  })
  public description?: string;

  @IsOptional()
  @Matches(
    `^${Object.values(albumStatus)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i'
  )
  status: albumStatus;
}
