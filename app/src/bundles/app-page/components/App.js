import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import history from '../../../history';

import LoginForm from '../../auth/LoginForm';
import RegisterForm from '../../auth/RegisterForm';
import PrivateRoute from '../../common/components/PrivateRoute';

import { loadUser } from '../../actions/auth';

import AppPage from './AppPage';
import Post from '../../post-page/components/Post';
import ResultsPage from '../../results-page/components/ResultsPage';
import EditPage from '../../create-page/components/EditPage';
import CategoriesPage from '../../categories/components/categories';
import BlogsPage from '../../blogs/components/BlogsPage';
import KnowledgePage from '../../blogs/components/KnowledgePage';
import Navbar1 from '../../common/components/navbar';
import ScrollToTop from '../../common/components/ScrollToTop';
import ErrorPage from '../../common/components/ErrorPage';
import ToolsPage from '../../tools/components/tools';
import Breadcrumbs from '../../common/components/breadcrumbs';
import UserPage from '../../users/components/UserPage';

class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
      
    render() {
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter history={history}>
                        <ScrollToTop>
                            {/* <Route path="/" component={Navbar1}/> */}
                            <Navbar1 />
                            {/* This makes sure the navbar is always on display */}
                            <Route path="/" component={Breadcrumbs}/>
                            <Switch>
                                {/* routes defined by PrivateRoute will perform an authentication check that will redirect to login page if user is not authenticated */}
                                <Route path="/" exact component={AppPage}/>
                                <PrivateRoute path="/posts/create" exact component={EditPage}/>
                                <PrivateRoute path="/posts/:id/edit" exact component={EditPage}/>
                                <PrivateRoute path="/knowledge/create" exact component={EditPage}/>
                                <PrivateRoute path="/knowledge/:id/edit" exact component={EditPage}/>
                                <Route path="/knowledge/:slug" exact component={Post}/>
                                <Route path="/posts" exact component={BlogsPage}/>
                                <Route path="/posts/:slug" exact component={Post}/>
                                <Route path="/search" exact component={ResultsPage} key={window.location.pathname}/>
                                <Route path="/blogs" exact component={BlogsPage}/>
                                <Route path="/knowledge" exact component={KnowledgePage}/>
                                <Route path="/categories" exact component={CategoriesPage}/>
                                <Route path="/categories/:slug" exact component={ToolsPage}/> {/* This should go to the tools component, i.e. a list of tools */}
                                <PrivateRoute path="/users/:slug" exact component={UserPage}/>
                                <Route path="/register" exact component={RegisterForm}/>
                                <Route path="/login" exact component={LoginForm}/>
                                <Route path="/404" component={ErrorPage}/>
                                <Redirect to="/404"/>
                            </Switch>
                        </ScrollToTop>      {/*  Any navigation to any route will force a scroll-to-top  */}
                    </BrowserRouter> 
                </Provider>
            </div>
        );
    }
}

export default App;
