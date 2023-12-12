const nameField = document.querySelector('.username')
const ageField = document.querySelector('.userage')
const searchBtn = document.querySelector('.btn')
const listofstudent = document.querySelector(".listofstudent")
const form = document.getElementById('userform')

let arr_users = [
  { name: 'Wah Vanessa Tata', age: 20 },
  { name: 'Fai Ferry', age: 30 },
  { name: 'Fonyuy Carl', age: 28 },
  { name: 'Akwi Abigail', age: 22 },
]

const getInitials = (str) => {
  let initial = str[0]
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ')
      initial += "." + str[i + 1]
  }
  return initial.toUpperCase()
}

const createTemplate = (user) => {
  //
  const btnId = user.name.split(" ").join("-")
  return `
    <tr>
        <td>${getInitials(user.name)}</td>
        <td class="nam">${user.name}</td>
        <td class="ag">${user.age}</td>
        <td><button class="delete-btn" id=${btnId}>X</button></td>
    </tr>`
}

const displayUsers = (users_arr) => {
  // to initialize the table's headers
  listofstudent.innerHTML = `
        <tr>
            <th>Initials</th>
            <th>Name</th>
            <th>Age</th>
            <th>X</th>
        </tr>
    `

  users_arr.forEach((user) => {
    listofstudent.innerHTML += createTemplate(user)
  })

  setupEVentListeners()
}

// SEARCHING

const filterStudents = (searchname, searchage) => {
  const results = arr_users.filter((user) => {
    const lowerSearchName = searchname.toLowerCase();
    const lowerUserName = user.name.toLowerCase(); // creating a lowercase version of user.name

    if ((lowerSearchName && lowerUserName.includes(lowerSearchName)) || (searchage && user.age === searchage)) {
      return true
    }
  })

  return results
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = nameField.value
  const age = parseInt(ageField.value)

  console.log(name, age)

  const results = filterStudents(name, age)

  displayUsers(results)
})

// DELETING USERS

const setupEVentListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete-btn")

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const userName = event.target.id

      const actualName = userName.split("-").join(" ")

      const update = arr_users.filter((user) => {
        if (user.name !== actualName) {
          return true
        }
      })

      console.log(userName, actualName)

      arr_users = update

      displayUsers(update)
    })
  })
}

displayUsers(arr_users)
