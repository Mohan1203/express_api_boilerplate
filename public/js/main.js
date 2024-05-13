// drop down functinality
let dropdown = document.getElementsByClassName("dropdown-btn");
let dropDownIcon = document.getElementsByClassName('down-icon')
let i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        let dropDownIcon = this.querySelector('.down-icon');
        if (dropdownContent.style.display === "flex") {
            dropdownContent.style.display = "none";
            dropDownIcon.classList.add("bx-caret-down")
            dropDownIcon.classList.remove("bx-caret-up")
        } else {
            dropdownContent.style.display = "flex";
            dropdownContent.style.flexDirection = "column";
            dropDownIcon.classList.remove("bx-caret-down")
            dropDownIcon.classList.add("bx-caret-up")
        }
    });
}

// selected nav item link

