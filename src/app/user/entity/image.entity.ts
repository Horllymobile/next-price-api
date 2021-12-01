import { UserEntity } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileUpload } from './file';

@Entity({ name: 'image' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;
}
