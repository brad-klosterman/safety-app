/**
 * Authentication Context Provider
 **/

type AuthenticationState =
    | 'initializing'
    | 'unauthenticated_device'
    | 'unauthenticated_user'
    | 'authenticated_session';

type AuthenticationContextValue = {
    state: AuthenticationState;
    action: AuthenticationActionHandler;
};

/**
 * Authentication Action Handler
 **/

type AuthenticationActionHandler = {
    requestOTP(phone_number: string): Promise<AuthenticationActionResponse>;
    verifyOTP(code: string): Promise<AuthenticationActionResponse>;
};

type AuthenticationActionResponse = { success: boolean } | PhoneAuthenticatorError;
type PhoneAuthenticatorError = { error: string };

export type {
    AuthenticationState,
    AuthenticationContextValue,
    AuthenticationActionHandler,
    AuthenticationActionResponse,
    PhoneAuthenticatorError,
};
