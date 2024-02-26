export default async function({$auth, redirect, store}) {
  let user = $auth.user;
  if(user && user.roles === 'ADMIN') {
    // let the user in
  } else {
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "Вы должны иметь права доступа ADMIN"})
    redirect('/')
  }
}
