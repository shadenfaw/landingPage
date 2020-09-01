/**
 * collection of all sections in the page. We are selecting them by the pre-defined class name
 */
const pageSections = document.getElementsByClassName("page-section");

/**
 * he pre-defined <ul> element with the navbar__list id that will serve as the container of the navigation menu
 * that we will build
 */
const navigationMenu = document.querySelector("#navbar__list");

/**
 * building the navigation menu
 */
const renderNavigationMenu = () => {
  // looping over all sections to build navigation for them
  Array.from(pageSections).forEach(section => {
    /**
     * For each section, we know that there is a child h2 element and we will use its value as the text for the navigation menu item
     * First let's get the corresponding h2 element by id and we know that the id of the corresponding h2 element is (section id + '-nav')
     */
    const h2 = document.querySelector(`#${section.id}-nav`);

    /**
     * Next we need to build a <li> and a <a> elements. We will append <a> inside <li> and then <li> inside the navigation menu's <ul> which is represented by
     * navigationMenu global variable.
     *
     * We also need to add some class, id and href attribute to the <a> element that we create
     *
     * We will need to create a TextNode as well that will display the text content of the h2 from above as the navigation menu item
     *
     * Finally, We will add a click event lister to the <a> element and we will use the event to perform the smooth scrolling.
     */
    const li = document.createElement("li");
    const a = document.createElement("a");

    // Adding class
    a.classList.add("menu__link");

    // Adding href. Href is just added but it will not be used and instead onclick smooth scrolling will be used.
    a.href = "#";

    // Adding id. We will use this id to target this menu item later when we are activating or de-activating a section
    a.id = `nav-${section.id}`;

    /**
     * Creating a click event on the <a> element that will handle the scrolling
     */
    a.onclick = e => {
      // We need to interrupt the default behaviour of the click on a <a> element
      e.preventDefault();

      // Then we scroll to the relevant section smoothly
      document.getElementById(section.id).scrollIntoView({ behavior: "smooth" });
    };

    // Creating the text node
    const menuItemText = document.createTextNode(h2.innerText);

    // Now, appending all the elements to each other
    a.appendChild(menuItemText);
    li.appendChild(a);
    navigationMenu.appendChild(li);
  });
};

/**
 * As soon as the document is loaded in the browser, we need to fire off the renderNavigationMenu function
 * to build the navigation menu
 */
renderNavigationMenu();

/**
 * This function will be fired on each user scroll event. When the user scrolls, determine whether to add or remove
 * the 'current-section' class based on the user's scrolling
 */
const checkSectionStatus = () => {
  // We need to loop through all the sections first
  Array.from(pageSections).forEach(section => {
    /**
     * Get position of the section from the top of the viewport.
     * To get the position, we will use the getBoundingClientRect() method that will give us top, left, bottom, right, x and y position of the section.
     * However, we only need the top position of it.
     *
     * Even thought it's not needed, but will also round off the returned top position from a decimal to a whole integer value
     */

    const sectionTopPosition = Math.round(section.getBoundingClientRect().top);

    /**
     * Next, We will determine whether the section is in the browser's viewable area or not. We will do an easy assumption here.
     * If the top position of the section is between 200 and -200 units, we will assume that the section is in the viewport.
     */
    const isInViewPort = sectionTopPosition < 200 && sectionTopPosition >= -200;

    /**
     * Next, if the section is in the visible area of the browser, we will add the 'current-section' css class to it, other wise, we will make sure the 'current-section'
     * class is removed from it.
     */

    if (isInViewPort) {
      section.classList.add("current-section");

      /**
       * Also setting a background on the relevant navigation menu item.
       * Above when we built the navigation menu, we set a unique id on each menu item and we know the format of the id is ('nav'-section.id)
       */
      relevantMenuItem = document.querySelector(`#nav-${section.id}`);
      relevantMenuItem.style.background = "#333333";
      relevantMenuItem.style.color = "#ffffff";
    } else {
      /**
       * Otherwise, we must make sure to remove the 'current-class' or else the section will remain highlighted even if
       * it is not in the browser's viewport.
       */
      section.classList.remove("current-section");

      // Also removing background from the relevant navigation menu item
      relevantMenuItem = document.querySelector(`#nav-${section.id}`);

      // And then we set it's background to white and text color back to black
      relevantMenuItem.style.background = "#ffffff";
      relevantMenuItem.style.color = "#333333";
    }
  });
};

// Registering the scroll event on the whole document window to fire off the checkSectionStatus function
window.addEventListener("scroll", checkSectionStatus);
