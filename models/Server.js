import express from 'express';
import cors from 'cors';
import { mongoDbConn } from '../database/config.js';

import userRoutes from '../routes/user.routes.js';
import authRoutes from '../routes/auth.routes.js';

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8001;

    /** Paths */
    this.userPath = '/api/users';
    this.authPath = '/api/auth';

    /**Database Connection */
    this.dbConnection();

    /**Middlewares */
    this.middlewares();

    /**App routes */
    this.routes();
  }

  async dbConnection() {
    await mongoDbConn();
  }

  middlewares() {
    /**CORS Config */
    // const whiteList = ['http://example1.com', 'http://example2.com'];
    // const corsOptions = {
    //   origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //     } else {
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   }
    // }
    // this.app.use(cors(corsOptions));
    this.app.use(cors());

    /**express.json([options])
     *  It parses incoming requests with JSON payload
     */
    this.app.use(express.json())

    /**Public directory */
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, userRoutes)
    this.app.use(this.authPath, authRoutes)
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}`);
    });
  }
}

export default Server;