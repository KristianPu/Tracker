class formPopup extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="popup" id="popup">
            <form id="pop-form">
                <label for="tname">Task name:</label><br>
                <input type="text" id="name" name="tname" placeholder="Task Name" required><br>
                <label for="sdate">Start date:</label><br>
                <input type="date" id="startDate" name="sdate" placeholder="MM/DD/YYYY" required><br>
                <label for="edate">End date:</label><br>
                <input type="date" id="endDate" name="edate" placeholder="MM/DD/YYYY"><br>
                <label for="tspent">Time spent:</label><br>
                <input type="text" id="timeSpent" name="tspent" placeholder="1h 30m"><br>
                <button type="button" class="btn" id="cancel-button">Cancel</button>
                <button type="button" id="submit-button">Submit</button>
            </form>
        </div>
        `
    }
}

customElements.define('form-popup', formPopup)