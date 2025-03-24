"use strict";

let fetchDiv = document.getElementById("container");
let btnLoadMore = document.querySelector(".more");
let currentPage = 1;
let nameList = document.querySelector("fNameList");

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
      if (error === 404) {
        let pError = document.createElement("p");
        pError.innerText = "Page Not Found";
        divApi.appendChild(pError);
      } else {
        let pError2 = document.createElement("p");
        pError2.innerText = "Server Error";
        divApi.appendChild(pError2);
      }
    });
}

getFname(1);

btnLoadMore.addEventListener("click", function () {
  currentPage++;
  getFname(currentPage);
});
