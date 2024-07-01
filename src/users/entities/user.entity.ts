import { Role } from "src/common/enums/roles.enum";
import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  
  @Column({unique: true})
  email: string;
  
  @Column({nullable: true, select: false})
  password: string;

  @Column({type: 'enum', default: Role.USER, enum: Role})
  role: Role;

  @Column({nullable: true})
  picture: string;

  @OneToOne(() => Profile, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  profile: Profile
  
  @OneToMany( () => Post, post => post.userId )
  posts: Post[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifiedAt = new Date();
  }

}