"use strict";

window.onload = function () {
  HTMLCollection.prototype.map = Array.prototype.map; // Globals

  var dTerms = document.getElementsByTagName('dt');
  var lastDTerms = dTerms[dTerms.length - 1]; // Listeners for the Description Terms

  dTerms.map(function (dTerm) {
    dTerm.addEventListener('click', toggleAccordion);
  });
  lastDTerms.addEventListener('click', requestApi);
  /**
   * Toggle active class on the listener event
   * and displays or hide the DD content with its max height
   */

  function toggleAccordion() {
    var dDescription = this.nextElementSibling;

    if (this.classList.contains('active')) {
      this.classList.remove('active');
      dDescription.style.maxHeight = null;
      dDescription.style.opacity = 0;
    } else {
      this.classList.add('active');
      dDescription.style.maxHeight = dDescription.scrollHeight + "px";
      dDescription.style.opacity = 1;
    }
  }
  /**
   * Request for all the Characters of the GOT Show
   */


  function requestApi() {
    if (lastDTerms.classList.contains('active')) {
      fetch('https://api.got.show/api/show/characters').then(function (response) {
        return response.json();
      }).then(function (jsonGOTChars) {
        var randomValue = getRandomNum(jsonGOTChars.length);
        printCharacter(jsonGOTChars[randomValue]);
      })["catch"](function (err) {
        return console.log('Error', err);
      });
    }
  }
  /**
   * Draw in the DOM the random character from GOT
   * @param {*} jsonGOTChar JSON Object to be printed
   */


  function printCharacter(jsonGOTChar) {
    removeChildNodes(lastDTerms.nextElementSibling);
    var image = document.createElement('img');
    image.setAttribute('src', jsonGOTChar.image);
    image.setAttribute('alt', 'GOT Character');
    image.style.height = '360px';
    var ul = document.createElement('ul');
    var liName = document.createElement('li');
    liName.textContent = 'Name: ' + jsonGOTChar.name;
    var liActor = document.createElement('li');
    liActor.textContent = 'Actor: ' + jsonGOTChar.actor;
    var liHouse = document.createElement('li');
    liHouse.textContent = 'House: ' + jsonGOTChar.house;
    var liGender = document.createElement('li');
    liGender.textContent = 'Gender: ' + jsonGOTChar.gender; // APENDS

    ul.appendChild(liName);
    ul.appendChild(liActor);
    ul.appendChild(liHouse);
    ul.appendChild(liGender);
    lastDTerms.nextElementSibling.appendChild(image);
    lastDTerms.nextElementSibling.appendChild(ul);
  }
  /**
   * Removes all the Child Nodes of the parameter
   * @param {Node} parent 
   */


  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  /**
   * Generates random value between 0 and the max parameter
   * @param {number} max max value
   */


  function getRandomNum(max) {
    return Math.floor(Math.random() * max);
  }
};