import { environment } from '../environments/environment';
export let DOMAIN: any;

if (!environment['production']) {
  DOMAIN = 'http://localhost:3000';
} else {
  DOMAIN = 'http://bravado19.herokuapp.com';
}