import { Server, Model } from 'miragejs';
import { products } from './product.data';

export default () => {
  const mockServer = new Server({

    models: {
      product: Model,
    },

    fixtures: {
      products,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.urlPrefix = 'api';

      this.get('/products', (schema, request) => {
        const products = (schema as any).products.where({ isRemoved: false }).models;
        return {
          payload: products
        }
      });

      this.get('/products/:id', (schema, request) => {
        return {
          payload: (schema as any).products.find(request.params.id)
        }
      });

      this.post('/products', (schema, request) => {

        let attrs = JSON.parse(request.requestBody)
        return {
          payload: (schema as any).products.create(attrs)
        }
      });

      this.put('products/:id', (schema, request) => {

        const attrs = JSON.parse(JSON.stringify({ isRemoved: true }));
        const product = (schema as any).products.find(request.params.id);
        return {
          payload: product.update(attrs)
        }
      })

    }

  })
}