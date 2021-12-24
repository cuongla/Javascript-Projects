const ul = document.querySelector('ul'),
    input = document.querySelector('input')
const removeBtn = document.querySelector('.btn-removeAll')

let tags = ['nodejs', 'reactjs']

displayTags();

// create a tag which is li 
// add li tags into ul
function displayTags() {
    // get all li tags
    ul.querySelectorAll('li').forEach((li) => li.remove())
    tags.slice().reverse().forEach(tag => {
        let liTag = `
            <li>${tag}
            <i class="uit uit-multiply" onclick="removeTag(this, '${tag}')"></i>
            </li>
            `
        ul.insertAdjacentHTML('afterbegin', liTag)
    })
    input.focus();
}

function removeTag(element, tag) {
    let index = tags.indexOf(tag);
    tags.splice(index, 1);
    element.parentElement.remove()
    input.focus()
}

function addTag(e) {
    if (e.key == 'Enter') {
        let tag = e.target.value.trim()
        // add tag if tag is not empty string and tag is not on list
        if (tag != '' && !tags.includes(tag)) {
            tags.push(tag)
            displayTags() // update ul
        }
        e.target.value = ''
    }
}
input.addEventListener('keyup', addTag);

// remove all lis' when button is clicked
removeBtn.addEventListener('click', () => {
    tags.length = 0
    ul.querySelectorAll('li').forEach((li) => li.remove())
    input.focus()
})