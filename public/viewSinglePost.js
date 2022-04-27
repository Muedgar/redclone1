function hideSinglePost() {
    document.getElementById("viewSinglePost").style.display = "display";
}
hideSinglePost();
document.getElementById("viewSinglePostClose").addEventListener('click',()=> {
    document.getElementById("viewSinglePost").style.display = "none";
});