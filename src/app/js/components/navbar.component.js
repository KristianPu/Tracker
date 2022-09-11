class Navbar extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="title-bar">
            <span class="title-bar-link" id="minimize"><img class="title-icons" src="../images/minimize.png" alt="Minimize"></span>
            <span class="title-bar-link" id="resize"><img class="title-icons" src="../images/full-screen.png" alt="Resize"></span>
            <span class="title-bar-link" id="close-app"><img class="title-icons" src="../images/exit.png" alt="Exit"></span>
        </div>
        <div class="container">
            <nav>
                <a href="project.html"><img class="left-nav-icons" src="../../app/icons/project.png" alt="project"></a>
                <a href="organization.html"><img class="left-nav-icons" src="../../app/icons/organization.png" alt="organization"></a>
                <a href="user.html"><img class="left-nav-icons" src="../../app/icons/user.png" alt="user"></a>
                <a href="log.html"><img class="left-nav-icons" src="../../app/icons/log.png" alt="log"></a>
            </nav>
        </div>
        `
    }
}

customElements.define('app-navbar', Navbar);