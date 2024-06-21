import { BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
// import { Post } from "./Post";
// import { Cart } from "./Cart";

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true})
  email: string;

  @Column({ nullable: true })
  picture: string | null;

  @Column({ nullable: true })
  password: string | null;

  @Column( { nullable: true })
  tel: string | null;

  @Column({ nullable: true })
  pais: string | null;

  @OneToMany(() => Post, post => post.user, { cascade: true, nullable: true }) // Define la relación OneToMany
  posts: Post[] | null;

  // @OneToOne(() => Cart, cart => cart.user)
  // cart: Cart;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @BeforeUpdate()
  updateModifiedAt() {
    this.modifiedAt = new Date();
  }

}
