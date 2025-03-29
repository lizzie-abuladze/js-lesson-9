"use strict";

let fetchDiv = document.getElementById("container");
let btnLoadMore = document.querySelector(".more");
let currentPage = 1;
let nameList = document.querySelector(".fNameList");
let btnLoadPrev = document.querySelector(".previous");
let totalPages;

function getFname(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (resJs) {
      console.log(resJs);

      let fragment = document.createDocumentFragment();

      resJs.data.forEach((element) => {
        let li = document.createElement("li");

        let fName = document.createElement("h2");
        fName.textContent = `${element.first_name}`;

        let img = document.createElement("img");
        img.src = element.avatar;

        li.appendChild(img);
        li.appendChild(fName);
        fragment.appendChild(li);
      });
      nameList.innerHTML = " ";
      nameList.appendChild(fragment);

      totalPages = resJs.total_pages;

      changeBtnStatus();
    })

    .catch(function (error) {
      // if (error == 404) {
      //   let pError = document.createElement("p");
      //   pError.innerText = "page not found";
      //   fetchDiv.appendChild(pError);
      // } else if (error == 500) {
      //   let pError2 = document.createElement("p");
      //   pError2.innerText = "Server Error";
      //   fetchDiv.appendChild(pError2);
      // } else {
      //   let pError3 = document.createElement("p");
      //   pError3.innerText = "check your internet connection";
      //   fetchDiv.appendChild(pError3);
      // }

      let pError = document.createElement("p");
      if (error == 404) {
        pError.innerText = "Page not found";
      } else if (error == 500) {
        pError.innerText = "Server error";
      } else {
        pError.innerText = "Check your internet connection";
      }
      fetchDiv.appendChild(pError);
    });
}

getFname();

btnLoadPrev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage -= 1;
  getFname(currentPage);
});

btnLoadMore.addEventListener("click", function () {
  if (currentPage == totalPages) {
    return;
  }
  currentPage += 1;
  getFname(currentPage);
});

function changeBtnStatus() {
  if (currentPage === 1) {
    btnLoadPrev.disabled = true;
  } else {
    btnLoadPrev.disabled = false;
  }

  if (currentPage === totalPages) {
    btnLoadMore.disabled = true;
  } else {
    btnLoadMore.disabled = false;
  }
}
