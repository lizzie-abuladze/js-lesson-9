"use strict";

let fetchDiv = document.getElementById("container");
let btnLoadMore = document.querySelector(".more");
let currentPage = 1;
let nameList = document.querySelector(".fNameList");

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
        li.textContent = `${element.first_name}`;
        fragment.appendChild(li);
      });
      nameList.appendChild(fragment);
    })

    .catch(function (error) {
      if (error == 404) {
        let pError = document.createElement("p");
        pError.innerText = "page not found";
        fetchDiv.appendChild(pError);
      } else if (error == 500) {
        let pError2 = document.createElement("p");
        pError2.innerText = "Server Error";
        fetchDiv.appendChild(pError2);
      } else {
        let pError3 = document.createElement("p");
        pError3.innerText = "check your internet connection";
        fetchDiv.appendChild(pError3)
      }
    });
}

getFname(1);

btnLoadMore.addEventListener("click", function () {
  currentPage++;
  getFname(currentPage);
});
