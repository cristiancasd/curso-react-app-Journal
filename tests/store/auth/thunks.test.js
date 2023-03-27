import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser, goodInputUser, wrongInputUser } from '../../fixtures/authFixtures';

// Cualquier cosa que retorne este path es un mock
jest.mock('../../../src/firebase/providers'); 

describe('Pruebas en AuthThunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials', async() => {
        //first () its the call of the function
        //second () the return value of the funcion
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
    });


    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); 
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

        //toHaveBeenCalledWith: Si uso un dispatch con dicha función dentro del thunk

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await singInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData) );

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(demoUser) ); //si coloco loginData, el dispatch en thunks tiene que incluir el login
        //Si al slice loginWithEmailPassword no le llega exactamente 'loginData', va marcar error

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Error', async() => {
        
        //const loginData = { ok: true, ...demoUser };
        const loginData = { ok: false, errorMessage: 'Un error en Login' };

        const formData = { email: null, password: null };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData) );

    });

    
    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        const registerData = { ok: true, ...demoUser };
        
        //const  { photoURL, ...formData }=demoUser;
        //const formData={...wrongInputUser}

        const formData={...goodInputUser}

        await registerUserWithEmailPassword.mockResolvedValue( registerData );

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(demoUser) );

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - ERROR', async() => {
        const registerData = { ok: false, errorMessage: 'Un error en Register' };

        const  formData= {...wrongInputUser}

        await registerUserWithEmailPassword.mockResolvedValue( registerData ); //respeusta del register to campare

        await startCreatingUserWithEmailPassword(formData)(dispatch); // ejecuto el dispatch

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(registerData) );

    });

        

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    });


    
});