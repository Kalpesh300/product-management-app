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
        return {
          payload: (schema as any).products.all().models
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
      })
    }

  })
}