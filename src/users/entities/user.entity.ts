import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  
  @Column({unique: true})
  email: string;
  
  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  picture: string;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifiedAt = new Date();
  }
}