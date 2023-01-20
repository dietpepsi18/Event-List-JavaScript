//============================ API =================================//
const API = (() => {
  const URL = "http://localhost:3000/events";

  //=>Fetch all the events from server
  const getListFromServer = () => {
    let data = fetch(URL).then((res) => res.json());
    return data;
  };

  //=>Post a new event to the server
  const postEventToServer = (item) => {
    let data = fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
    return data;
  };

  //=>Delete an event from the server
  const deleteEventFromServer = (id) => {
    return fetch(URL + "/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  //=>Update an event from from the server
  const editEventFromServer = (id, newEvent) => {
    let data = fetch(URL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).then((res) => res.json());
    return data;
  };

  return {
    getListFromServer,
    postEventToServer,
    deleteEventFromServer,
    editEventFromServer,
  };
})();

//================================= View ======================//
class EventView {
  constructor() {
    this.addNewEvent = document.querySelector(".header__add");
    this.eventList = document.querySelector(".event-list__body");
  }

  //=>show new event
  showAddedEvent(item) {
    let element = document.createElement("tr");
    element.classList.add("event-list__item");
    element.id = "a" + item.id;
    element.innerHTML = `
        <th class="event-list__event">${item.eventName}</th>
              <th class="event-list__start">${item.startDate}</th>
              <th class="event-list__end">${item.endDate}</th>
              <th class="event-list__actions">
                <div class="event-list__edit">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="EditIcon"
                    aria-label="fontSize small"
                  >
                    <path
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    ></path>
                  </svg>
                </div>
                <div class="event-list__delete">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="DeleteIcon"
                    aria-label="fontSize small"
                  >
                    <path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    ></path>
                  </svg>
                </div>
              </th>`;
    this.eventList.append(element);
  }

  //=>show all the events
  showAllEvents(list) {
    this.eventList.innerHTML = "";
    list.forEach((item) => {
      this.showAddedEvent(item);
    });
  }

  //=>show input window to add new event
  showInputWindow() {
    let element = document.createElement("tr");
    element.classList.add("event-list__item");
    element.id = "new-window";
    element.innerHTML = `
    <th class="event-list__event"><input /></th>
              <th class="event-list__start"><input type="date" /></th>
              <th class="event-list__end"><input type="date" /></th>
              <th class="event-list__actions">
                <div class="event-list__add">+</div>
                <div class="event-list__delete-input">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"
                    ></path>
                  </svg>
                </div>
              </th>`;
    this.eventList.append(element);
  }

  //=>delete an event
  deleteEvent(objId) {
    let htmlId = "a" + objId;
    let element = document.getElementById(htmlId);
    element.remove();
  }

  //=>show edit window
  editEvent(item) {
    let htmlId = "a" + item.id;
    let element = document.getElementById(htmlId);
    element.innerHTML = `
         <th class="event-list__event"><input type="text" value=${item.eventName} /></th>
              <th class="event-list__start"><input type="date" value=${item.startDate}/></th>
              <th class="event-list__end"><input type="date" value=${item.endDate}/></th>
              <th class="event-list__actions">
                <div class="event-list__save">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"
                    />
                  </svg>
                </div>
                <div class="event-list__cancel">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"
                    ></path>
                  </svg>
                </div>
              </th>
    `;
  }
}

//==================================== Model ======================//

class EventModel {
  #list;
  constructor() {
    this.#list = [];
  }

  //=>store all the events fetched from the server into #list
  storeAllEvents() {
    return API.getListFromServer().then((data) => {
      this.#list = data;
      return data;
    });
  }

  //=>add new event
  addEvent(item) {
    return API.postEventToServer(item).then((data) => {
      this.#list.push(data);
      console.log(this.#list);
      return data;
    });
  }

  //=>delete an event
  deleteEvent(id) {
    return API.deleteEventFromServer(id).then(() => {
      this.#list.forEach((cur, i) => {
        if (cur.id === id) {
          this.#list.splice(i, 1);
        }
      });
      return id;
    });
  }

  //edit an event
  editEvent(id) {
    return API.editEventFromServer(id).then((data) => {
      this.#list;
    });
  }
}
//=================================== Controller =============================//

class EventController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.initialize();
  }

  //=>first time render the page
  initialize() {
    this.model.storeAllEvents().then((list) => {
      this.view.showAllEvents(list);
    });
    this.addNewInputEvent();
    this.cancelNewEvent();
    this.addNewItemEvent();
    this.deleteEvent();
    this.editEvent();
  }

  //
  addNewInputEvent() {
    this.view.addNewEvent.addEventListener("click", (e) => {
      this.view.showInputWindow();
    });
  }

  //
  addNewItemEvent() {
    this.view.eventList.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("event-list__add")) {
          let eInput = e.target.parentNode.parentNode.childNodes[1].firstChild;
          let eStart = e.target.parentNode.parentNode.childNodes[3].firstChild;
          let eEnd = e.target.parentNode.parentNode.childNodes[5].firstChild;

          if (eInput.value && eStart.value && eEnd.value) {
            let newEvent = {
              eventName: eInput.value,
              startDate: eStart.value,
              endDate: eEnd.value,
            };

            this.model.addEvent(newEvent).then((data) => {
              let inputWindow = document.getElementById("new-window");
              inputWindow.remove();
              this.view.showAddedEvent(data);
            });
          } else {
            alert("All the fields are required");
          }
        }
      },
      false
    );
  }

  //
  cancelNewEvent() {
    this.view.eventList.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("event-list__delete-input")) {
          let inputWindow = document.getElementById("new-window");
          inputWindow.remove();
        }
      },
      false
    );
  }

  //delete an event
  deleteEvent() {
    this.view.eventList.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("event-list__delete")) {
          let item = e.target.parentNode.parentNode;
          let id = item.id.slice(1);
          this.model.deleteEvent(id).then(() => {
            this.view.deleteEvent(id);
          });
        }
      },
      false
    );
  }

  //edit an event
  editEvent() {
    this.view.eventList.addEventListener("click", (e) => {
      if (e.target.classList.contains("event-list__edit")) {
        let item = e.target.parentNode.parentNode;
        let id = item.id.slice(1);
        this.model.editEvent(id).then((data) => {
          this.view.editEvent(data);
        });
      }
    });
  }
}

const eventView = new EventView();
const eventModel = new EventModel();
const eventController = new EventController(eventView, eventModel);
