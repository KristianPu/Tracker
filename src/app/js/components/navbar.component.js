class Navbar extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
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

customElements.define('app-navbar', Navbar)