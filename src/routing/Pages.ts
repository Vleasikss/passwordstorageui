enum Pages {
    MAIN="/service",
    LOGIN="/login",
    SIGN_UP="/signup",
    SERVICE_CREDENTIALS="/service/:service",
    PUT_CREDENTIALS="/put",
    ANY="/**",
    NO_ACCESS="/**",
}

export default Pages;