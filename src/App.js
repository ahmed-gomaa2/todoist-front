import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home/Home";
import {useEffect} from "react";
import {connect} from "react-redux";
import Login from "./screens/Landing/Login/Login";
import Register from "./screens/Landing/Register/Register";
import Spinner from "./components/UI/Spinner/Spinner";
import {loadUser} from "./store/actions/auth.actions";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import Layout from "./components/HOC/Layout/Layout";
import Landing from './screens/Landing/Landing';
import Body from "./components/UI/Body/Body";
import Upcomming from "./components/Upcoming/Upcomming";
import Upcoming from "./components/Upcoming/Upcomming";

function App(props) {
    useEffect(() => {
        props.loadUser();
    }, []);

    return (
        <div className="App">
            {props.loadingUser ? (
                    //if It's still loading render the spinner
                    <Spinner/>
                ): <Routes>
                    <Route path={'/'} exact element={
                        //protecting the Route if the user is not logged in.
                        <ProtectedRoute isAuthenticated={props.isAuthenticated} route={'/landing'}>
                            <Home history={props.history}/>
                        </ProtectedRoute>
                    }>
                        //Rendering sub routes for the route '/'.
                        <Route path={'/dashboard/today'} exact element={<Body header={'Today'} history={props.history}/>} />
                        <Route path={'/dashboard/upcoming'} exact element={<Upcoming />} />
                        <Route path={'/dashboard/projects/:id'} exact element={<Body history={props.history} />}/>
                    </Route>

                    <Route path={'/landing'} exact element={
                        <ProtectedRoute isAuthenticated={!props.isAuthenticated} route={'/'}>
                            <Layout>
                                <Landing />
                            </Layout>
                        </ProtectedRoute>
                    }/>

                    <Route path={'/login'} exact element={
                        <Layout>
                            <Login history={props.history}/>
                        </Layout>
                    }/>

                    <Route path={'/register'} exact element={
                        <Layout>
                            <Register history={props.history}/>
                        </Layout>
                    }/>

                    <Route path="*" element={
                            <ProtectedRoute isAuthenticated={!props.isAuthenticated} route={'/landing'}>
                                <Layout>
                                    <Landing />
                                </Layout>
                            </ProtectedRoute>
                    }/>
                </Routes>
            }
        </div>
    );
}

//Fetching data from the redux store.
const mapStateToProps = state => {
    return {
        state: state,
        isAuthenticated: state.auth.isAuthenticated,
        loadingUser: state.auth.loadingUser
    }
}

export default connect(mapStateToProps, {loadUser}) (App);