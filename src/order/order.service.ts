import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex} from 'nestjs-knex';

@Injectable()

export class OrderService {
    constructor(@InjectKnex() private readonly knex: Knex){
        this.createCustomerTable()
        this.createVendorTable()
    }

    async createCustomerTable() {
        if(! await this.knex.schema.hasTable('User')) {
            await this.knex.schema.createTable('User', user=> {
                user.increments('customer_id').primary();
                user.string('firstName')
                user.string('lastName')
                user.string('Address')
                user.integer('mobile')
                user.string('email')
            })
        }
    }

    async createVendorTable() {
        if(! await this.knex.schema.hasTable('Vendor')){
            await this.knex.schema.createTable('Vendor', vendor=> {
                vendor.increments('vendor_id').primary();
                vendor.string('firstName')
                vendor.string('lastName')
                vendor.string('address')
                vendor.integer('mobile')
                vendor.string('email')
            })
        }
    }

    async createFoodAvaliableTable() {
        if(! this.knex.schema.hasTable('FoodAvaliable')) {
            await this.knex.schema.createTable('FoodAvaliable', food => {
                food.increments('food_id').primary()
                food.string('vendor_id').references('vendor_id').inTable('Vendor')
                food.string('type')
                food.integer('price')
                food.string('quantity')
            })
        }
    }

    async createCustomerOrder() {
        if(! this.knex.schema.hasTable('customer_Order')){
            await this.knex.schema.createTable('cutomer_Order', order=> {
                order.increments('order_id').primary()
                order.string('food_id').references('food_id').inTable('FoodAvaliable')
                order.string('vendor_id').references('vendor_id').inTable('Vendor')
                order.date('date')
                
            })
        }
    }

}
