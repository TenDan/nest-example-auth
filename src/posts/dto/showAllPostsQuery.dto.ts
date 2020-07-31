import { IsString, IsIn } from 'class-validator';

const validSortByOptions = [
  'id',
  'title',
  'description',
  'createdAt',
  'updatedAt',
];
const validOrderByOptions = ['ASC', 'DESC', 'asc', 'desc', 1, -1];

export class ShowAllPostsQueryDto {
  @IsString()
  @IsIn(validSortByOptions, {
    message:
      'Invalid sortBy value. Valid values are: id, title, description, createdAt, updatedAt',
  })
  sortBy: string;

  @IsString()
  @IsIn(validOrderByOptions, {
    message: 'Invalid orderBy value. Valid values are: asc, desc, 1, -1',
  })
  orderBy: 'ASC' | 'DESC' | 1 | -1;
}
