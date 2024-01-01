function scrll(sectID) {
    var section = document.getElementById(sectID);
    if (section) {section.scrollIntoView({behavior: 'smooth'});}}