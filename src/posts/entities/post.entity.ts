import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts'})
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: 5})
  rating: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  modifieddAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifieddAt = new Date()
  }

}
