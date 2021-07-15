import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payments')
class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  gateway_id: string;

  @Column('int')
  value: number;

  @Column()
  installments: number;

  @Column()
  payment_method: string;

  @Column()
  status: string;

  @Column()
  transactions_status: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Payment;
