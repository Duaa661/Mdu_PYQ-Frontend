document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    console.log(email)
    console.log(password)
    const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        console.log(data)
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
});
