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
      const timing = 3000;

      this.get('/products', (schema, request) => {
        return {
          payload: (schema as any).products.all().models
        }
      }, { timing });
    }

  })
}