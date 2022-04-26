document.getElementById("adminForm").addEventListener('submit',e=> {
    e.preventDefault();
    let password1 = document.getElementById("password0").value;
    let password2 = document.getElementById("password1").value;
    if(password1==password2) {
        // call a route to get current user.
    }
});