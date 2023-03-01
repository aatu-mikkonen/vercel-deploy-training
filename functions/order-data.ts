import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, RequestGenericInterface } from 'fastify'
import fp from 'fastify-plugin'
import MockOrderData from '../mock/order-data.json'

interface IOrder {
	id: number;
	customer_id: number;
	price: number;
	name: string;
	phone: string;
	billing_address: IAddress;
	shipping_address: IAddress;
}

interface IAddress {
	city: string;
	zip: number;
	address: string;
}

interface IOrderCustomerRequest extends RequestGenericInterface {
	Params: {
		customerId: string;
	}
	Headers: IHeaders
}

interface IHeaders {
	'h-Custom': string;
}

const route: FastifyPluginAsync = async (instance: FastifyInstance, options: FastifyPluginOptions) => {
	instance.get(
		'/orders',
		{},
		async function(request, reply) {
			return reply
				.code(200)
				.send(MockOrderData as IOrder[]);
		}
	)

	instance.get<IOrderCustomerRequest>(
		'/orders/:customerId',
		{},
		async function(request, reply) {
			const { customerId } = request.params;
			const data = MockOrderData as IOrder[];

			console.log(request.params)

			return reply
				.code(200)
				.send(data.filter(order => order.customer_id === Number(customerId)));
		}
	)
}

export default fp(route);