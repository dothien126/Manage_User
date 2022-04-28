import { IsString, MinLength, IsOptional, Matches } from 'class-validator';
import { Trim } from 'class-sanitizer';

export enum photoStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class PhotoDto {
  @IsString()
  @Trim()
  @MinLength(1, { message: 'Name album should be minimum of 1 characters' })
  public name?: string;

  @IsOptional()
  @Matches(
    `^${Object.values(photoStatus)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i'
  )
  role: photoStatus;
}
