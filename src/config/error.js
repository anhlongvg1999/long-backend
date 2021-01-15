export const ERROR_MESSAGE = {
    LOGIN: {
        ERR_ACC: 'User not found!',
        ERR_DEACTIVE: 'Account need to active',
        ERR_PASS: 'Incorrect password!',
        ERR_STATUS: 'Account is not allowed to login!',
        ERR_REQUIRE_EMAIL: 'Invalid email address. Please fill up your email!',
        ERR_REQUIRE_PASSWORD: 'Invalid password. Please fill up your password!',
    },
    ADD_USER_DISTRIBUTOR: {
        ERR_EXIST: 'Account already exists!',       
    },
    ADD_QUESTION_TYPE: {
        ERR_TOPIC: 'Topic already exists!',
        ERR_PAGE: 'Page already exists',
        ERR_LEVEL: 'Level already exists'
    },
    ADD_TESTME_DISTRIBUTOR: {
        ERR_TESTME: 'Test already exists'
    },
    ACTIVE_DISTRIBUTOR: {
        ERR_REQUIRE: 'Please provide full information!',
        ERR_NOTFOUND: 'Not found!'
    },
    UPDATE_PASSWORD: {
        ERR_OLD_PASS: 'Old password is incorrect!'
    },
    REMOVE_ROLE: {
        ERR_ROLE_INVALID: 'Invalid Role!',
        ERR_EXIST_USER: 'There is an administrator who is in this right. Please update admin rights before deleting!',
        ERR_USING: 'This is using!'
    },
    CREATE_ORDER_RETAIL: {
        ERR_REQUIRE: 'Please provide full information!'
    },
    FORGOT_PASSWORD:{
        EMAIL_NOT_EXIST: 'Email does not exist!'
    }, 
    QUESTION:{
        ERR_NOTFOUND: 'NOT FOUND QUESTION ID', 
        ERROR_ANSWER: 'PLEASE ENTER ANSWER', 
        ERR_REQUIRE: 'PLEASE ENTER QUESTION'
    }, 
    USER: {
        ERR_NAME:'Please enter name!',
        ERR_EMAIL:'Please enter email!',
        INVALID_EMAIL:'Please enter a valid email address!',
        ERR_PASSWORD:'Please enter password!',
        ERR_PASS:'PLEASE ENTER PASSWORD!',
        ERR_EXIST:'User already exists!',
        ERR_NOT_EXIST:'NOT EXISTS!',
        ERR_CHECK_PASS:'WRONG OLD PASSWORD!'
    },
    ANSWER: {
        ERR_WRONG:'MISSING USER ID OR QUESTION ID',
        ERR_ANS:'PLEASE ENTER ANSWER',

    },
    SETTING: {
        NOT_FOUND: 'Not found setting!',
        REQUIRE_QUESTION_NUMBER: 'Please enter number of question!',
        REQUIRE_DAY_LEFT: 'Please enter days left'
    },
    BOOKMARK: {
        EXIST: 'BookMark has exist!',
        
    },
    TIME: {
        NUMBER: 'Time must be greater than 0!',
        TIME_NULL: 'Time is null',
    },
    ORGANIZATION:{
        ERR_SEARCH_NOT_FOUND:'NOT FOUND',
        ERR_REQUIRE_INPUT:'PLEASE ENTER INFORMATION'
    }
}