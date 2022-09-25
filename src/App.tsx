import React from "react";
import { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {AlertProvider} from "./pages/login/provider/reducers/alert/AlertProvider";
import Pages from "./routing/Pages";
import Loading from "./components/loading/Loading";
import consts from "./service/consts";
import ServiceCredentialsPage from "./pages/service-credentials/ServiceCredentialsPage";
import PutCredentialsPage from "./pages/put-credentials/PutCredentialsPage";
const LoginPage = React.lazy(() => import("./pages/login/LoginPage"));
const MainPage = React.lazy(() => import("./pages/main/MainPage"));



const App:React.FC = () => {

    const isUserAuthenticated = () => consts.isUserAuthenticated();

    if (!isUserAuthenticated()) {
        return <AlertProvider>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Route path={Pages.ANY} exact component={() => <LoginPage/>}/>
                </Suspense>
            </Router>
        </AlertProvider>
    }

    return(
        <AlertProvider>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={Pages.LOGIN} exact component={() => <LoginPage /> }/>
                        <Route path={Pages.SIGN_UP} exact component={() => <LoginPage signUpPage={true}/>}/>
                        <Route path={Pages.MAIN} exact component={() => <MainPage/>}/>
                        <Route path={Pages.SERVICE_CREDENTIALS} exact component={() => <ServiceCredentialsPage/>}/>
                        <Route path={Pages.PUT_CREDENTIALS} exact component={() => <PutCredentialsPage/>}/>
                        <Route path={Pages.ANY} exact component={() => <MainPage/>}/>
                    </Switch>
                </Suspense>
            </Router>
        </AlertProvider>
    )
}

export default App;