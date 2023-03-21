// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

jest.setTimeout(30000)

require('dotenv').config({
    path: '.env'
});

