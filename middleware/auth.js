export default async function({ store, redirect }) {
  //Vérifie s'il existe une authentification valide
  await store.dispatch('auth/verifyUserConnexion')

  //Si le store ne voit pas d'authentification on redirige sur la connexion
  if (store.state.auth.isAuthenticated != true) {
    return redirect('/auth/login')
  }
}
