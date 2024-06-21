import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeUpdate, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'posts' })
export class Post {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  content: string;

  @Column({ default: 5 })
  rating: number;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @BeforeUpdate()
  updateTimestamps() {
    this.updatedAt = new Date();
  }
  
  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' }) // Relación ManyToOne con User
  @JoinColumn({name: 'user_id'})
  userId: User;
}