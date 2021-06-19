const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const app = express();
const glob = require('glob');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const SwaggerDocss = require('./swagger')
const SwaggerDocs = swaggerJsDoc(SwaggerDocss);
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const defaultRoutes = require('../api/global/global.route');
const authRoutes = require('../api/auth/auth.route');
const reportRoutes = require('../api/reports/report.route');
const markerRoutes = require('../api/markers/marker.route');

// Parser
app.use(helmet());
app.use(compress({ level: 9 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));


// function initGlobRouter(){
//     const getGlobbedpaths = globPattern => glob.sync(globPattern);
//     const serverRoutes = getGlobbedpaths('../api/*/*.route.js');
//     serverRoutes.forEach(tempPath => {
//         const route = require(path.resolve(tempPath));
//         if(tempPath != '../api/global/global.route.js') 
//             app.use(route);
//     });
//     app.use(defaultRoutes);
// }

// initGlobRouter();
app.use(authRoutes)
app.use(reportRoutes)
app.use(markerRoutes)
app.use(defaultRoutes)

module.exports = app;