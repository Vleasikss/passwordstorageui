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
const LoginPage = React.lazy(() => import("./pages/login/LoginPage"));
const MainPage = React.lazy(() => import("./pages/main/MainPage"));



const App:React.FC = () => {
    // todo logic
    const isUserAuthenticated = true;
    //process.env.REACT_APP_NAME}
    return(
        <AlertProvider>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={Pages.LOGIN} exact component={() => <LoginPage /> }/>
                        <Route path={Pages.SIGN_UP} exact component={() => <LoginPage signUpPage={true}/>}/>
                        {
                            isUserAuthenticated
                            ? <Route path={Pages.MAIN} exact component={() => <MainPage/>}/>
                            : <Route path={Pages.ANY} exact component={() => <LoginPage/>}/>
                        }
                    </Switch>
                </Suspense>
            </Router>
        </AlertProvider>
    )
}

export default App;