import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;
  
  @Column()
  lastname: string;

  @Column()
  age: number

  @Column()
  nacionality: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifiedAt = new Date();
  }
}
