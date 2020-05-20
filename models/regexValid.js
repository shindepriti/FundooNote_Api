/**************************************************************
 * @purpose  : Define Regex Validation For Email 
 * @file     : regexValid.js
 * @overview : Define Function For Email Validation 
 * @author   : priti shinde
 * @since    : 20/5/2020
**************************************************************/

class valid {

    emailRegx(){
        return [/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']
    }
}
module.exports = new valid();