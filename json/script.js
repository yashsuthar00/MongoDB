document.getElementById('FormData').onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // const response = await fetch("/submit", {
    //     method: "post",
    //     headers: {
    //         "Content-Type": 'application/json'
    //     },
    //     body:JSON.strigify(data)
    // });

    // if (response.ok){
    //     alert("Form submittd successfully");
    // } else {
    //     alert("Form submission failed");
    // }

    document.getElementById("jsonData").textContent = JSON.stringify(data, null, 2);

}