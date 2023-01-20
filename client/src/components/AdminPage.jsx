import { Admin, Resource } from 'react-admin';
import Test from './Test';
import simpleRestProvider from 'ra-data-simple-rest';


export const AdminPage = () => {

    const dataProvider = simpleRestProvider('http://localhost:3001/posts/all')

    return (
        <Admin basename='/admin' dataProvider={dataProvider}>
            <Resource name="Post" list={Test} />
        </Admin>
    );
}