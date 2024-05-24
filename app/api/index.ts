import { eas_environment } from '../../environment/eas_environment';
import API_UserProfile from './API.UserProfile';
import API_Property from './API.Property';
import API_Mobile from './API.Mobile';

const BASE_URL = eas_environment.SEON_API_URL;

const UserProfile = new API_UserProfile(BASE_URL);
const Property = new API_Property(BASE_URL);
const Mobile = new API_Mobile(BASE_URL);

async function storeAuthorizationHeaders(authorization_token: string) {
    UserProfile.storeAuthorizationToken(authorization_token);
    Property.storeAuthorizationToken(authorization_token);
    Mobile.storeAuthorizationToken(authorization_token);
}

async function verifyAccount(authorization_token: string) {
    return UserProfile.fetch(authorization_token).then(async (profile) => {
        if (profile) {
            await storeAuthorizationHeaders(authorization_token);
            return profile;
        }
    });
}

export default {
    UserProfile,
    Property,
    Mobile,
    storeAuthorizationHeaders,
    verifyAccount,
};

/*
const AuthenticationContext = Authentication.useContext();

    function validateAuthorizationToken(token: string) {
        API.user.fetch(token).then(async (user_profile) => {
            await API.storeAuthorizationHeaders(token);
            //UserContext.action.updateProfileStorage(user_profile);
        });
    }

    function onAuthenticationTokenChanged(token: string | null) {
        API.user.fetch(token).then(async (user_profile) => {
            await API.storeAuthorizationHeaders(token);
            //UserContext.action.updateProfileStorage(user_profile);
        });
    }

    //AuthenticationContext.subscribe('AUTHENTICATION_TOKEN_CHANGED', onAuthenticationTokenChanged);
 */
