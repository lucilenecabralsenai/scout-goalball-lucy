import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

function friendlyAuthError(error) {
  const code = error?.code || '';
  const messages = {
    'auth/popup-closed-by-user': 'Login cancelado. Tente novamente.',
    'auth/popup-blocked': 'Pop-up bloqueado. Permita pop-ups para este site.',
    'auth/network-request-failed': 'Falha de conexão. Verifique a internet e tente novamente.',
    'auth/invalid-email': 'E-mail inválido. Verifique o endereço informado.',
    'auth/missing-password': 'Informe a senha para continuar.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/user-disabled': 'Usuário desativado. Entre em contato com o suporte.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  };
  return new Error(messages[code] || 'Não foi possível autenticar no Firebase.');
}

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw friendlyAuthError(error);
  }
}

async function loginWithEmail(email, password) {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return { credentials, created: false };
  } catch (error) {
    if (error?.code === 'auth/user-not-found') {
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        return { credentials, created: true };
      } catch (createError) {
        throw friendlyAuthError(createError);
      }
    }
    throw friendlyAuthError(error);
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw friendlyAuthError(error);
  }
}

function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export { auth, loginWithGoogle, loginWithEmail, logout, observeAuthState };
