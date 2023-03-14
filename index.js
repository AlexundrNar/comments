// форма добавления комментов
const modal = document.querySelector(".modal")
const showModal = document.querySelector(".comment__modal")

showModal.addEventListener('click', function() {
  modal.classList.toggle("modal__active")
})

// добавление комментов
const commentList = document.querySelector(".comments__list")
const commentAdd = document.querySelector("form")

const date = new Date();
const [today, yesterday, hour, minutes] = [
  date.getDate(),
  date.getDate() - 1,
  date.getHours(),
  date.getMinutes(),
];

commentAdd.addEventListener('submit', function(e) {
  e.preventDefault()

  let inputName = document.querySelector("#name").value
  const inputDate = document.querySelector("#date").value.replace("-", " ").replace("-", " ")
  const dateSliced = +inputDate.slice(8)
  let text = document.querySelector("#text").value
  
  const commentBlock = `
  <div class="comment__block">
    <h4>${inputName}</h4>
    <span>${dateSliced == "" || dateSliced === today ? "сегодня"
      : dateSliced === yesterday ? "вчера"
      : inputDate}, ${hour}:${minutes}</span>
    <img class="comment__delete" src="/img/del1.svg" alt="">
    <svg class="comment__like" width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.2 22C19.851 22 22 19.851 22 17.2C22 14.549 19.851 12.4 17.2 12.4C14.549 12.4 12.4 14.549 12.4 17.2C12.4 19.851 14.549 22 17.2 22Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.99 17.26H15.41" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.2 15.51V19.1" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 8.69C22 10.66 21.49 12.4 20.69 13.91C19.81 12.98 18.57 12.4 17.2 12.4C14.55 12.4 12.4 14.55 12.4 17.2C12.4 18.43 12.87 19.55 13.63 20.4C13.26 20.57 12.92 20.71 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.98002 12 5.33002C13.01 3.98002 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.6 22 8.69Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <p>${text}</p>
  </div>
`

  if (inputName.trim() < 1 || text.trim() < 1) {
    return alert("Вам нечего сказать или вам забыли дать имя?)")
  } else {
    commentList.insertAdjacentHTML("afterbegin", commentBlock)
    findTrashCans()
findLikeHearts()

  }
})

// удаление комментов
function findTrashCans() {
  const trashCans = document.querySelectorAll(".comment__delete")
  
  trashCans.forEach(item => {
    item.addEventListener("click", deleteHandler)
  })
}

findTrashCans()

function deleteHandler(e) {
  const currentTrashCan = e.currentTarget
  currentTrashCan.closest(".comment__block").remove()
}

// лайкосики комментиков с красивым сердечком
function findLikeHearts() {
  const likeHearts = document.querySelectorAll(".comment__like")
  likeHearts.forEach(item => {
    item.addEventListener("click", likeHandler)
  })
}

findLikeHearts()

function likeHandler(e) {
  const currentLikeHeart = e.currentTarget
  currentLikeHeart.classList.toggle("comment__like-active")
}

