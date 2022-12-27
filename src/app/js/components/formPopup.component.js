class formPopup extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="popup" id="popup">
            <form id="pop-form">
                <div class="form-field">
                    <label for="tname">Task name:</label><br>
                    <input type="text" id="name" name="tname" placeholder="Task Name"/><br>
                    <small></small>
                </div>
                <div class="form-field">
                    <label for="sdate">Start date:</label><br>
                    <input type="date" id="startDate" name="sdate"/><br>
                    <small></small>
                </div>
                <div class="form-field">
                    <label for="edate">End date:</label><br>
                    <input type="date" id="endDate" name="edate"><br>
                    <small></small>
                </div>
                <div class="form-field">
                    <label for="tspent">Time spent:</label><br>
                    <input type="text" id="timeSpent" name="tspent" placeholder="1h 30m"/><br>
                    <small></small>
                </div>
                <button type="button" class="btn" id="cancel-button">Cancel</button>
                <button type="submit" id="submit-button">Submit</button>
            </form>
        </div>
        `
    }
}

customElements.define('form-popup', formPopup)