import React, { Component } from "react";
import styled from "styled-components";
import KeyCode from "./keyCodes";
import "./listbox.css";
// import { listBox, listboxButton } from "./refinedCode";
// import aria from "./ARIA/listbox";

// Work on replacing any this.Utils.removeClass or this.Utils.addClass
// with Vanilla js remove and adds
// const ContainerDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
// `;

// const Select = styled.select`
//   appearance: none;
//   -webkit-appearance: none;
//   display: block;
//   margin: 30px 0;
//   padding: 10px 50px 10px 10px;
//   background-color: #fa5106;
//   color: #fff;
//   border-radius: 4px;
//   border: 2px solid #aaa;
//   width: 280px;
// `;

const Span = styled.span`
  display: none;
`;

// New problem to work on.... Need to create a revealing module pattern so that I can have multiple instances of
// aria dropdowns.... Go through and determine what code is entirely unnecessary.. and then move it into a separate file.
export default class AriaListBox extends Component {
  state = {
    selectedValue: "",
    selectedElement: null,
    selectedValues: {},
    listboxOpen: false
  };

  componentDidMount = () => {
    const { instance } = this.props;
    const buttonId = `dropdown_button_${instance}`;
    const listboxId = `listbox_list_${instance}`;
    // "dropdown_button"
    const button = document.getElementById(buttonId);
    // "listbox_list"
    const listbox = new this.listBox(document.getElementById(listboxId));
    const listboxButton = new this.listboxButton(button, listbox);
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("CDU: ", this.state);
  };

  // listboxFocus = () => {
  //   console.log("Listbox focused!");
  //   this.setState({
  //     showListbox: true
  //   });
  // };

  /************************
   *
   *
   *
   * Listbox Button specific
   *
   *
   *
   ***********************/

  listboxButton = (button, listbox) => {
    this.button = button;
    this.listbox = listbox;
    this.registerListboxButtonEvents();
  };

  registerListboxButtonEvents = () => {
    this.button.addEventListener("click", this.toggleListboxShow.bind(this));
    this.button.addEventListener("keyup", this.checkShow.bind(this));
    this.listboxNode.addEventListener("blur", this.hideListbox.bind(this));
    this.listboxNode.addEventListener("keydown", this.checkHide.bind(this));
    // ErroredOut -> this.listboxNode.setHandleFocusChange(this.onFocusChange.bind(this));
  };

  checkShow = evt => {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case KeyCode.UP:
      case KeyCode.DOWN:
        evt.preventDefault();
        this.showListbox();
        this.checkKeyPress(evt);
        break;
    }
  };

  checkHide = evt => {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case KeyCode.RETURN:
      case KeyCode.ESC:
        evt.preventDefault();
        this.hideListbox();
        this.button.focus();
        break;
    }
  };

  toggleListboxShow = () => {
    this.state.listboxOpen ? this.hideListbox() : this.showListbox();
    this.setState((prevState, state) => ({
      listboxOpen: !prevState.listboxOpen
    }));
  };

  showListbox = () => {
    this.listboxNode.removeAttribute("class", "hidden");
    this.button.setAttribute("aria-expanded", "true");
    this.listboxNode.focus();
  };

  hideListbox = () => {
    this.listboxNode.setAttribute("class", "hidden");
    this.button.removeAttribute("aria-expanded");
  };

  onFocusChange = focusedItem => {
    this.button.innerText = focusedItem.innerText;
  };

  /*******************
   *
   *
   *
   *  Listbox specific
   *
   *
   *
   ******************/

  listBox = listboxNode => {
    this.listboxNode = listboxNode;
    this.activeDescendant = this.listboxNode.getAttribute(
      "aria-activedescendant"
    );
    this.multiselectable = this.listboxNode.hasAttribute(
      "aria-multiselectable"
    );
    // this.moveUpDownEnabled = false;
    this.siblingList = null;
    this.upButton = null;
    this.downButton = null;
    this.keysSoFar = "";
    this.handleFocusChange = function() {};
    this.handleItemChange = function(event, items) {};
    this.registerListboxEvents();
  };

  registerListboxEvents = function() {
    this.listboxNode.addEventListener("focus", this.setupFocus.bind(this));
    this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
    this.listboxNode.addEventListener("click", this.checkClickItem.bind(this));
  };

  setupFocus = () => {
    if (this.activeDescendant) {
      return;
    }

    this.focusFirstItem();
  };

  focusFirstItem = () => {
    var firstItem;

    firstItem = this.listboxNode.querySelector('[role="option"]');

    if (firstItem) {
      this.focusItem(firstItem);
    }
  };

  focusLastItem = () => {
    var itemList = this.listboxNode.querySelectorAll('[role="option"]');

    if (itemList.length) {
      this.focusItem(itemList[itemList.length - 1]);
    }
  };

  checkKeyPress = evt => {
    var key = evt.which || evt.keyCode;
    var nextItem = document.getElementById(this.activeDescendant);
    if (!nextItem) {
      return;
    }

    switch (key) {
      case KeyCode.PAGE_UP: // 33
      // case KeyCode.PAGE_DOWN: // 34
      //   if (this.moveUpDownEnabled) {
      //     evt.preventDefault();
      //   }

      //   break;
      case KeyCode.UP: // 38
      case KeyCode.DOWN: // 40
        evt.preventDefault();
        // !!** These lines do matter
        if (key === KeyCode.UP) {
          nextItem = nextItem.previousElementSibling;
        } else {
          // This is the reason chocolate is always selected first upon initial down arrow to open listbox.
          nextItem = nextItem.nextElementSibling;
        }

        if (nextItem) {
          this.focusItem(nextItem);
        }

        break;
      case KeyCode.HOME: // 36
        evt.preventDefault();
        this.focusFirstItem();
        break;
      case KeyCode.END: // 35
        evt.preventDefault();
        this.focusLastItem();
        break;
      case KeyCode.SPACE: // 32
        evt.preventDefault();
        this.toggleSelectItem(nextItem);
        break;
      case KeyCode.RETURN:
        this.updateValues(this.activeDescendant, nextItem);
      case KeyCode.BACKSPACE: // 8
      case KeyCode.DELETE: // 46
      case KeyCode.RETURN: // 13
        // Need to return here.
        return;
    }
  };

  checkClickItem = evt => {
    if (evt.target.getAttribute("role") === "option") {
      this.focusItem(evt.target);
      this.toggleSelectItem(evt.target);
      this.hideListbox();
      this.setState({
        listboxOpen: false,
        selectedValue: this.activeDescendant
      });
    }
  };

  toggleSelectItem = element => {
    if (this.multiselectable) {
      element.setAttribute(
        "aria-selected",
        element.getAttribute("aria-selected") === "true" ? "false" : "true"
      );
    }
  };

  defocusItem = function(element) {
    if (!element) {
      return;
    }

    element.classList.remove("focused");
  };

  focusItem = element => {
    this.defocusItem(document.getElementById(this.activeDescendant));
    element.classList.add("focused");
    this.listboxNode.setAttribute("aria-activedescendant", element.id);
    this.activeDescendant = element.id;

    if (this.listboxNode.scrollHeight > this.listboxNode.clientHeight) {
      var scrollBottom =
        this.listboxNode.clientHeight + this.listboxNode.scrollTop;
      var elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        this.listboxNode.scrollTop =
          elementBottom - this.listboxNode.clientHeight;
      } else if (element.offsetTop < this.listboxNode.scrollTop) {
        this.listboxNode.scrollTop = element.offsetTop;
      }
    }

    if (!this.multiselectable && this.moveButton) {
      this.moveButton.setAttribute("aria-disabled", false);
    }

    // this.checkUpDownButtons();
    this.handleFocusChange(element);
  };

  // checkUpDownButtons = () => {
  //   var activeElement = document.getElementById(this.activeDescendant);

  //   if (!this.moveUpDownEnabled) {
  //     return false;
  //   }

  //   // WHAT THESE LINES OF CODE DO?
  //   // if (!activeElement) {
  //   //   this.upButton.setAttribute("aria-disabled", "true");
  //   //   this.downButton.setAttribute("aria-disabled", "true");
  //   //   return;
  //   // }

  //   // if (this.upButton) {
  //   //   if (activeElement.previousElementSibling) {
  //   //     this.upButton.setAttribute("aria-disabled", false);
  //   //   } else {
  //   //     this.upButton.setAttribute("aria-disabled", "true");
  //   //   }
  //   // }

  //   // if (this.downButton) {
  //   //   if (activeElement.nextElementSibling) {
  //   //     this.downButton.setAttribute("aria-disabled", false);
  //   //   } else {
  //   //     this.downButton.setAttribute("aria-disabled", "true");
  //   //   }
  //   // }
  // };

  addItems = items => {
    if (!items || !items.length) {
      return false;
    }

    items.forEach(
      function(item) {
        this.defocusItem(item);
        this.toggleSelectItem(item);
        this.listboxNode.append(item);
      }.bind(this)
    );

    if (!this.activeDescendant) {
      this.focusItem(items[0]);
    }

    this.handleItemChange("added", items);
  };

  deleteItems = () => {
    var itemsToDelete;

    if (this.multiselectable) {
      itemsToDelete = this.listboxNode.querySelectorAll(
        '[aria-selected="true"]'
      );
    } else if (this.activeDescendant) {
      itemsToDelete = [document.getElementById(this.activeDescendant)];
    }

    if (!itemsToDelete || !itemsToDelete.length) {
      return [];
    }

    itemsToDelete.forEach(
      function(item) {
        item.remove();

        if (item.id === this.activeDescendant) {
          this.clearActiveDescendant();
        }
      }.bind(this)
    );

    this.handleItemChange("removed", itemsToDelete);

    return itemsToDelete;
  };

  clearActiveDescendant = () => {
    this.activeDescendant = null;
    this.listboxNode.setAttribute("aria-activedescendant", null);

    if (this.moveButton) {
      this.moveButton.setAttribute("aria-disabled", "true");
    }

    this.checkUpDownButtons();
  };

  moveUpItems = () => {
    var previousItem;

    if (!this.activeDescendant) {
      return;
    }

    const currentItem = document.getElementById(this.activeDescendant);
    previousItem = currentItem.previousElementSibling;

    if (previousItem) {
      this.listboxNode.insertBefore(currentItem, previousItem);
      this.handleItemChange("moved_up", [currentItem]);
    }

    this.checkUpDownButtons();
  };

  moveDownItems = () => {
    var nextItem;

    if (!this.activeDescendant) {
      return;
    }

    const currentItem = document.getElementById(this.activeDescendant);
    nextItem = currentItem.nextElementSibling;

    if (nextItem) {
      this.listboxNode.insertBefore(nextItem, currentItem);
      this.handleItemChange("moved_down", [currentItem]);
    }

    this.checkUpDownButtons();
  };

  moveItems = () => {
    if (!this.siblingList) {
      return;
    }

    var itemsToMove = this.deleteItems();
    this.siblingList.addItems(itemsToMove);
  };

  // THIS ISN'T BEING CALLED FROM ANYWHERE!
  // enableMoveUpDown = (upButton, downButton) => {
  //   this.moveUpDownEnabled = true;
  //   this.upButton = upButton;
  //   this.downButton = downButton;
  //   upButton.addEventListener("click", this.moveUpItems.bind(this));
  //   downButton.addEventListener("click", this.moveDownItems.bind(this));
  // };

  setHandleItemChange = handlerFn => {
    this.handleItemChange = handlerFn;
  };

  setHandleFocusChange = focusChangeHandler => {
    this.handleFocusChange = focusChangeHandler;
  };

  // For updating selected values in state

  // VERTIFY THIS IS WORKING FOR MULTISELECT
  updateValues = (activeDescendantValue, currentElement) => {
    if (this.props.multiselectable) {
      if (this.state.selectedValues[activeDescendantValue]) {
        delete this.state.selectedValues[activeDescendantValue];
        currentElement.setAttribute("aria-selected", "false");
      } else {
        this.setState((prevState, state) => ({
          selectedValues: {
            ...prevState.selectedValues,
            [activeDescendantValue]: activeDescendantValue
          }
        }));
        currentElement.setAttribute("aria-selected", "true");
      }
      // Should just be able to use everything beneath here for a single select drop-down listbox
    } else {
      if (this.state.selectedElement !== null) {
        this.state.selectedElement.setAttribute("aria-selected", "false");
      }
      const button = document.querySelector(".dropdown-select-button");
      button.textContent = activeDescendantValue.replace(/^\w/, c =>
        c.toUpperCase()
      );
      // console.log("THE BUTTON: ", button);
      // button.removeChild();
      // const txt = document.createTextNode(
      //   activeDescendantValue.replace(/^\w/, c => c.toUpperCase())
      // );
      // button.appendChild(txt);
      // Not quite sure why I decided to add selected element to the state here.
      // Ahh it's for the multiSelect purposes I believe.
      currentElement.setAttribute("aria-selected", "true");
      this.setState({
        selectedValue: activeDescendantValue,
        selectedElement: currentElement
      });
    }
  };

  // This is where you can call updateSelectedOptions(id, value)
  // where value can be an array for multiselect dropdowns
  // and a single value if not multiselect
  // BEFORE I work on implementing that though.
  // I think it's best if I work on enabling whether or not the dropdown can be multiselect
  // by passed in props
  // and the style of the dropdown since there's where stuff right now.
  handleClick = e => {
    // Utilizing an onClick event listener on the ListBoxUl.
    // So long as the id of the OptionLi contains the desired value.. It'll work.
    console.log(e.target.id);
    // console.log(this.state);
  };

  render() {
    const { instance } = this.props;
    return (
      <DropDownContainerDiv id="dropdown-select">
        <Span id="exp_elem">Choose an element:</Span>
        <DropDownButton
          tabIndex="0"
          aria-haspopup="listbox"
          aria-labelledby={`exp_elem dropdown_button_${instance}`}
          id={`dropdown_button_${instance}`}
          className="dropdown-select-button"
        >
          Vanilla
        </DropDownButton>
        <Arrow class="triangle">&#9660;</Arrow>
        <ListBoxUl
          id={`listbox_list_${instance}`}
          role="listbox"
          aria-multiselectable={this.props.multiselectable}
          aria-labelledby={`dropdown_button_${instance}`}
          className="dropdown-selection hidden"
          onClick={this.handleClick}
          tabIndex="-1"
        >
          <OptionLi role="option" id="vanilla">
            Vanilla
          </OptionLi>
          <OptionLi role="option" id="chocolate">
            Chocolate
          </OptionLi>
          <OptionLi role="option" id="strawberry">
            Strawberry
          </OptionLi>
          <OptionLi role="option" id="banana">
            Banana
          </OptionLi>
        </ListBoxUl>
      </DropDownContainerDiv>
    );
  }
}

/* <Select>
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </Select> */

/* <Select multiple>
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </Select> */
// Some aria stuff I might mess around w/ in the future....

// aria-expanded="true" should be set on the button (DropDownButton) when listbox is expanded
// aria-activedescendant="ID_REF" should be set on the UL (ListBoxUl) when it is displayed, for the
// intended purpose of setting focus on the listbox.
// - It refers to the option in the listbox that is visually
// indicated as having keyboard focus.
// - When navigation keys, such as Down Arrow, are pressed, JavaScript changes the value.
// - Pass the OptionLi's id as the reference

// https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant
// If a component container has an ARIA role that supports the aria-activedescendant property,
// it is not necessary to manipulate the tabindex attribute and move DOM focus among focusable
// elements within the container. Instead, only the container element needs to be included in the tab
// sequence. When the container has DOM focus, the value of aria-activedescendant on the container tells
// assistive technologies which element is active within the widget. Assistive technologies will consider
// the element referred to as active to be the focused element even though DOM focus is on the element that
// has the aria-activedescendant property. And, when the value of aria-activedescendant is changed, assistive
// technologies will receive focus change events equivalent to those received when DOM focus actually moves.

// FOR ENABLING MULTIPLE SELECT
// if the listbox supports multiple selection:
// - The element with role listbox has aria-multiselectable set to true.
// - All selected options have aria-selected set to true.
// - All options that are not selected have aria-selected set to false.

const DropDownContainerDiv = styled.div`
  display: inline-block;
  position: relative;
  font-size: 16px;
  height: 32px;
  padding: 0;
`;

const DropDownButton = styled.div`
  background: #3498db;
  width: 8rem;
  color: #fff;
  margin: 0;
  letter-spacing: 0.025rem;
  box-sizing: border-box;
  padding: 10px 30px 10px 20px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
    transition: background 0.3s ease;
  }
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
  font-size: 50%;
  position: absolute;
  right: 10px;
  top: 0;
  height: 37px;
  margin-top: auto;
  margin-bottom: auto;
  color: #fff;
`;

const ListBoxUl = styled.ul`
  padding: 0;
  list-style: none;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  margin-top: 8px;
  top: 100%;
  min-width: 90%;
`;

const OptionLi = styled.li`
  background: #fff;
  padding: 8px 10px 8px 15px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.2s ease;
`;

// &:hover {
//   background: #f6f6f6;
//   transition: background 0.2s ease;
// }

// &:focus {
//   background: lime;
// }

// &:selected {
//   background: yellow;
// }

{
  /* <OptionLi role="option" id="vanilla">
  Vanilla
</OptionLi>
<OptionLi role="option" id="chocolate">
  Chocolate
</OptionLi>
<OptionLi role="option" id="strawberry">
  Strawberry
</OptionLi>
<OptionLi role="option" id="banana">
  Banana
</OptionLi> */
}
