import { User } from "src/users/entities/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts'})
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: 5})
  rating: number;

  @Column()
  userId: number;

  @ManyToOne( () => User, user => user.posts )
  user: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  modifieddAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifieddAt = new Date()
  }

}
