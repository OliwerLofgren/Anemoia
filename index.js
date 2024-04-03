signUppage();
function RenderStartingpage() {
  document.querySelector("body").innerHTML = `
        <h1>Welcome</h1>
        <button onclick="goToLayout('layout1')">Layout 1</button>
        <button onclick="goToLayout('layout2')">Layout 2</button>
        <button onclick="goToLayout('layout3')">Layout 3</button>
    `;
}

function goToLayout(layoutName) {
  window.location.href = `?layout=${layoutName}`;
  displayLayoutName(); // Call the function to display the layout name
}

function displayLayoutName() {
  // Parse the layout name from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const layoutName = urlParams.get("layout");

  document.body.innerHTML = "";

  // Create a new h1 element
  const h1Element = document.createElement("h1");

  // Set the text content of the h1 element to the layout name
  h1Element.textContent = layoutName;

  // Append the h1 element to the body of the document
  document.body.appendChild(h1Element);
}
