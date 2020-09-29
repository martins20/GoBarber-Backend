import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "../../../../users/infra/typeorm/entities/User";

@Entity("appointments")
class Appointments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column("time with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Appointments;
